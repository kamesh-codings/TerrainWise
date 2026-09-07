const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/users/:id - Get user profile
router.get('/:id', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/sync - Upsert user profile (compatible with frontend UserProfile)
router.post('/sync', async (req, res) => {
  try {
    const {
      id = `usr_${Date.now()}`,
      name,
      email = `${id}@tripnova.local`,
      travel_style = 'solo',
      avatar_url = null,
      home_currency = 'INR'
    } = req.body;

    const full_name = name || req.body.full_name || 'Tourist';

    const existing = await db.query('SELECT id FROM users WHERE id = ?', [id]);

    if (existing && existing.length > 0) {
      await db.query(`
        UPDATE users 
        SET full_name = ?, home_currency = ?, travel_style = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [full_name, home_currency, travel_style, avatar_url, id]);
    } else {
      await db.query(`
        INSERT INTO users (id, email, full_name, avatar_url, home_currency, travel_style)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [id, email, full_name, avatar_url, home_currency, travel_style]);
    }

    res.json({
      success: true,
      message: 'User profile synced successfully',
      data: { id, full_name, email, travel_style, home_currency }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/users/:id - Delete user profile
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'User profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =============================================================================
// POST /api/users/complete-profile — Google OAuth Profile Completion
// =============================================================================
// Called after Google Sign-In when user is new (isNewUser: true).
// Creates the full user record from the completed profile form.
router.post('/complete-profile', async (req, res) => {
  try {
    const {
      google_id = null,
      googleId = google_id,
      name = 'Tourist User',
      full_name = name,
      email = '',
      dob = null,
      age = 0,
      blood_group = 'O+',
      bloodGroup = blood_group,
      gender = 'Male',
      role = 'tourist',
      avatar_url = null,
      avatarUrl = avatar_url
    } = req.body;

    const cleanEmail = email ? email.trim().toLowerCase() : null;
    const finalGoogleId = googleId || google_id || null;

    if (role === 'provider') {
      const providerId = `PRV_google_${Date.now()}`;
      if (cleanEmail) {
        const existingProv = await db.query('SELECT * FROM service_providers WHERE LOWER(TRIM(email)) = ?', [cleanEmail]);
        if (existingProv && existingProv.length > 0) {
          const profile = formatProviderProfile(existingProv[0]);
          return res.json({
            success: true,
            type: 'provider',
            profile,
            message: 'Provider account already exists. Logged in successfully.'
          });
        }
      }

      await db.query(`
        INSERT INTO service_providers (
          id, google_id, username, password, email, phone, provider_name, business_name, category,
          operating_city, operating_state, native_currency, is_verified, registered_at
        ) VALUES (?, ?, ?, '', ?, '', ?, ?, 'transport', 'Chennai', 'Tamil Nadu', 'INR', 1, ?)
      `, [
        providerId, finalGoogleId, cleanEmail, cleanEmail, full_name, full_name,
        new Date().toISOString().split('T')[0]
      ]);

      const newProvRows = await db.query('SELECT * FROM service_providers WHERE id = ?', [providerId]);
      const profile = formatProviderProfile(newProvRows[0]);

      return res.status(201).json({
        success: true,
        type: 'provider',
        profile,
        message: 'Service Provider account created successfully via Google Sign-In!'
      });
    }

    // Role is Tourist
    const id = `usr_google_${Date.now()}`;

    // Check if email already exists (race condition guard)
    if (cleanEmail) {
      const existing = await db.query('SELECT id FROM users WHERE LOWER(TRIM(email)) = ?', [cleanEmail]);
      if (existing && existing.length > 0) {
        // User already exists — update google_id if missing and return their profile
        if (finalGoogleId) {
          try {
            await db.query('UPDATE users SET google_id = ? WHERE id = ?', [finalGoogleId, existing[0].id]);
          } catch (e) {}
        }
        const userRows = await db.query('SELECT * FROM users WHERE id = ?', [existing[0].id]);
        if (userRows && userRows.length > 0) {
          const profile = formatCompleteProfile(userRows[0]);
          return res.json({
            success: true,
            type: 'tourist',
            profile,
            message: 'Account already exists. Logged in successfully.'
          });
        }
      }
    }

    const languagesJson = JSON.stringify(['English']);
    const trustedContactsJson = JSON.stringify([]);
    const topPicksJson = JSON.stringify([]);

    await db.query(`
      INSERT INTO users (
        id, username, password, email, google_id, full_name, dob, age, gender, blood_group,
        allergies, medical_conditions, disability, address, govt_id_type, govt_id_number, govt_id_state,
        languages_known, preferred_language, native_currency, current_location, location_coordinates,
        trusted_contacts, interested_top_picks, is_registered, avatar_url, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'tourist')
    `, [
      id, cleanEmail, '', cleanEmail, finalGoogleId, full_name, dob, age, gender, bloodGroup,
      '', '', '', '', 'Aadhaar Card', '', 'Tamil Nadu (TN), India',
      languagesJson, 'English', 'INR', '', null,
      trustedContactsJson, topPicksJson, avatarUrl
    ]);

    // Fetch the newly created user and return formatted profile
    const newUserRows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const profile = formatCompleteProfile(newUserRows[0]);

    return res.status(201).json({
      success: true,
      type: 'tourist',
      profile,
      message: 'Profile created successfully via Google Sign-In!'
    });

  } catch (err) {
    console.error('Profile completion error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

function formatProviderProfile(provider) {
  if (!provider) return null;
  let transportDetails = null;
  let tourGuideDetails = null;
  let homestayDetails = null;
  let emergencyMedicalDetails = null;
  let rentalAgencyDetails = null;

  try { if (typeof provider.transport_details === 'string') transportDetails = JSON.parse(provider.transport_details); } catch(e){}
  try { if (typeof provider.tour_guide_details === 'string') tourGuideDetails = JSON.parse(provider.tour_guide_details); } catch(e){}
  try { if (typeof provider.homestay_details === 'string') homestayDetails = JSON.parse(provider.homestay_details); } catch(e){}
  try { if (typeof provider.emergency_medical_details === 'string') emergencyMedicalDetails = JSON.parse(provider.emergency_medical_details); } catch(e){}
  try { if (typeof provider.rental_agency_details === 'string') rentalAgencyDetails = JSON.parse(provider.rental_agency_details); } catch(e){}

  return {
    id: provider.id,
    username: provider.username || '',
    password: provider.password || '',
    email: provider.email || '',
    phone: provider.phone || '',
    providerName: provider.provider_name || provider.providerName || provider.business_name || 'Verified Partner',
    businessName: provider.business_name || provider.businessName || provider.provider_name || 'Verified Partner',
    category: provider.category || 'transport',
    operatingCity: provider.operating_city || provider.operatingCity || '',
    operatingState: provider.operating_state || provider.operatingState || '',
    nativeCurrency: provider.native_currency || provider.nativeCurrency || 'INR',
    isVerified: Boolean(provider.is_verified),
    transportDetails: transportDetails || provider.transportDetails,
    tourGuideDetails: tourGuideDetails || provider.tourGuideDetails,
    homestayDetails: homestayDetails || provider.homestayDetails,
    emergencyMedicalDetails: emergencyMedicalDetails || provider.emergencyMedicalDetails,
    rentalAgencyDetails: rentalAgencyDetails || provider.rentalAgencyDetails,
    registeredAt: provider.registered_at || provider.registeredAt || new Date().toISOString().split('T')[0]
  };
}

// Helper: Format a user row into a frontend-compatible UserProfile
function formatCompleteProfile(user) {
  if (!user) return null;
  let languagesKnown = ['English'];
  let trustedContacts = [];
  let interestedTopPicks = [];
  let locationCoordinates = null;

  try { if (typeof user.languages_known === 'string') languagesKnown = JSON.parse(user.languages_known); } catch (e) {}
  try { if (typeof user.trusted_contacts === 'string') trustedContacts = JSON.parse(user.trusted_contacts); } catch (e) {}
  try { if (typeof user.interested_top_picks === 'string') interestedTopPicks = JSON.parse(user.interested_top_picks); } catch (e) {}
  try { if (typeof user.location_coordinates === 'string') locationCoordinates = JSON.parse(user.location_coordinates); } catch (e) {}

  return {
    id: user.id,
    name: user.full_name || user.name || 'Tourist User',
    fullName: user.full_name || user.name || 'Tourist User',
    username: user.username || '',
    password: user.password || '',
    email: user.email || '',
    googleId: user.google_id || '',
    avatarUrl: user.avatar_url || '',
    dob: user.dob || '',
    age: Number(user.age) || 0,
    gender: user.gender || 'Male',
    bloodGroup: user.blood_group || 'O+',
    allergies: user.allergies || '',
    medicalConditions: user.medical_conditions || '',
    disability: user.disability || '',
    address: user.address || '',
    govtIdType: user.govt_id_type || 'Aadhaar Card',
    govtIdNumber: user.govt_id_number || '',
    govtIdState: user.govt_id_state || 'Tamil Nadu, India',
    languagesKnown: languagesKnown.length > 0 ? languagesKnown : ['English'],
    preferredLanguage: user.preferred_language || 'English',
    nativeCurrency: user.native_currency || 'INR',
    currentLocation: user.current_location || '',
    locationCoordinates,
    trustedContacts,
    interestedTopPicks,
    isRegistered: true
  };
}

module.exports = router;
