import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Calendar,
  Heart,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Droplets,
  Shield
} from 'lucide-react';
import { completeGoogleProfileAPI } from '../utils/api';
import { UserProfile, ServiceProviderProfile } from '../types';

interface GoogleProfileData {
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

interface ProfileCompletionFormProps {
  isOpen: boolean;
  onClose: () => void;
  googleProfile: GoogleProfileData;
  onComplete: (result: { type: 'tourist'; profile: UserProfile } | { type: 'provider'; profile: ServiceProviderProfile }) => void;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

export const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({
  isOpen,
  onClose,
  googleProfile,
  onComplete
}) => {
  const [fullName, setFullName] = useState(googleProfile?.name || '');
  const [email, setEmail] = useState(googleProfile?.email || '');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [role, setRole] = useState<'tourist' | 'provider'>('tourist');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !googleProfile) return null;

  const handleDobChange = (value: string) => {
    setDob(value);
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      let calcAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calcAge--;
      }
      setAge(calcAge > 0 ? calcAge : 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await completeGoogleProfileAPI({
        googleId: googleProfile.googleId,
        name: fullName.trim(),
        email: email.trim(),
        dob: dob || undefined,
        age,
        bloodGroup,
        gender,
        role,
        avatarUrl: googleProfile.picture || undefined
      });

      if (result && result.success && result.profile) {
        onComplete({
          type: result.type || 'tourist',
          profile: result.profile
        });
      } else {
        setError(result?.error || 'Failed to create profile. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(5, 8, 16, 0.92)',
        backdropFilter: 'blur(20px)'
      }}
      className="animate-fade"
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#090e17',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(52, 211, 153, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)'
        }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(52, 211, 153, 0.3)'
            }}>
              <UserPlus style={{ width: '20px', height: '20px' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                Complete Your Profile
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Create your TripNova account with Google
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Google Profile Preview */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'rgba(56, 189, 248, 0.04)'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid rgba(52, 211, 153, 0.5)',
            flexShrink: 0,
            background: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {googleProfile.picture ? (
              <img
                src={googleProfile.picture}
                alt="Google Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <User style={{ width: '24px', height: '24px', color: '#38bdf8' }} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                {googleProfile.name}
              </span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}>
                Google Verified
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '2px 0 0' }}>
              {googleProfile.email}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Info Banner */}
          <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#93c5fd',
            fontSize: '0.76rem',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', flexShrink: 0, color: '#38bdf8' }} />
            <span>No account found with this email. Complete the form below to create your TripNova profile.</span>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <User style={{ width: '13px', height: '13px', color: '#38bdf8' }} />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="input-glass"
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Mail style={{ width: '13px', height: '13px', color: '#38bdf8' }} />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your.email@gmail.com"
              className="input-glass"
            />
          </div>

          {/* Date of Birth & Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Calendar style={{ width: '13px', height: '13px', color: '#a78bfa' }} />
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={e => handleDobChange(e.target.value)}
                className="input-glass"
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <User style={{ width: '13px', height: '13px', color: '#a78bfa' }} />
                Age
              </label>
              <input
                type="number"
                min={0}
                max={120}
                value={age}
                onChange={e => setAge(parseInt(e.target.value) || 0)}
                placeholder="Age"
                className="input-glass"
              />
            </div>
          </div>

          {/* Gender & Blood Group */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Shield style={{ width: '13px', height: '13px', color: '#fbbf24' }} />
                Gender
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="input-glass"
                style={{ background: '#090e17' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Droplets style={{ width: '13px', height: '13px', color: '#f87171' }} />
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className="input-glass"
                style={{ background: '#090e17' }}
              >
                {BLOOD_GROUPS.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Heart style={{ width: '13px', height: '13px', color: '#34d399' }} />
              I want to register as
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setRole('tourist')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: role === 'tourist' ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  background: role === 'tourist' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                  color: role === 'tourist' ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <User style={{ width: '16px', height: '16px' }} />
                Tourist
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: role === 'provider' ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
                  background: role === 'provider' ? 'rgba(251, 191, 36, 0.12)' : 'rgba(15, 23, 42, 0.5)',
                  color: role === 'provider' ? '#fbbf24' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <Shield style={{ width: '16px', height: '16px' }} />
                Service Provider
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '0.9rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
              background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
            }}
          >
            {isSubmitting ? (
              <>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                <span>Create Account & Sign In</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </>
            )}
          </button>

          <p style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'center', margin: '0' }}>
            By creating an account, you can access Emergency Cards, SOS Dispatch, and Itinerary Planning.
          </p>
        </form>
      </div>
    </div>
  );
};
