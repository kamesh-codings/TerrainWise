import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  PhoneCall, 
  Share2, 
  QrCode, 
  AlertTriangle, 
  Languages, 
  Check, 
  Info,
  Play,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  X,
  Scan
} from 'lucide-react';
import { UserProfile, EmergencyPhrase } from '../types';
import { EMERGENCY_PHRASES } from '../data/mockData';
import { speakPhrase, stopSpeech } from '../utils/speech';

interface EmergencyCardProps {
  userProfile: UserProfile;
  onOpenRegister: () => void;
  onTriggerSOS: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  userProfile,
  onOpenRegister,
  onTriggerSOS
}) => {
  const [selectedTargetLang, setSelectedTargetLang] = useState<'Tamil' | 'Hindi' | 'English' | 'French' | 'Spanish'>('Tamil');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Privacy Masking State (Masked by default, revealed upon QR verification)
  const [isRevealed, setIsRevealed] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'verified'>('idle');

  // Generate User-Specific Unique Emergency Token & QR Matrix
  const userUniqueToken = useMemo(() => {
    const raw = `${userProfile.name}-${userProfile.govtIdNumber || '0000'}-${userProfile.bloodGroup || 'UNK'}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const tokenNum = Math.abs(hash % 900000) + 100000;
    const prefix = (userProfile.name || 'TW').slice(0, 3).toUpperCase();
    return `TW-PASS-${prefix}-${tokenNum}`;
  }, [userProfile.name, userProfile.govtIdNumber, userProfile.bloodGroup]);

  // Deterministic 15x15 visual QR matrix generated specifically from individual user data
  const qrMatrix = useMemo(() => {
    const seed = userUniqueToken + (userProfile.govtIdNumber || 'ID') + (userProfile.bloodGroup || 'BG');
    const matrix: boolean[][] = [];
    const size = 15;
    
    for (let r = 0; r < size; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < size; c++) {
        // Corner Finder Patterns (7x7 corners)
        const isTopLeft = r < 5 && c < 5;
        const isTopRight = r < 5 && c >= size - 5;
        const isBottomLeft = r >= size - 5 && c < 5;

        if (isTopLeft || isTopRight || isBottomLeft) {
          const lr = isTopLeft ? r : isTopRight ? r : r - (size - 5);
          const lc = isTopLeft ? c : isTopRight ? c - (size - 5) : c;
          if (lr === 0 || lr === 4 || lc === 0 || lc === 4) {
            row.push(true);
          } else if (lr === 2 && lc === 2) {
            row.push(true);
          } else {
            row.push(false);
          }
        } else if (r === 7 || c === 7) {
          // Timing pattern
          row.push((r + c) % 2 === 0);
        } else {
          // Dynamic deterministic seed-based cell
          let val = 0;
          for (let k = 0; k < seed.length; k++) {
            val += seed.charCodeAt(k) * (r * 17 + c * 31 + k * 13);
          }
          row.push(val % 3 !== 0);
        }
      }
      matrix.push(row);
    }
    return matrix;
  }, [userUniqueToken, userProfile.govtIdNumber, userProfile.bloodGroup]);

  const handlePlayAudio = (phrase: EmergencyPhrase) => {
    stopSpeech();
    let textToSpeak = phrase.english;
    if (selectedTargetLang === 'Tamil') textToSpeak = phrase.tamil;
    else if (selectedTargetLang === 'Hindi') textToSpeak = phrase.hindi;
    else if (selectedTargetLang === 'French') textToSpeak = phrase.french;
    else if (selectedTargetLang === 'Spanish') textToSpeak = phrase.spanish;

    setCurrentlyPlayingId(phrase.id);
    speakPhrase(textToSpeak, selectedTargetLang, () => {
      setCurrentlyPlayingId(null);
    });
  };

  const handleStopAudio = () => {
    stopSpeech();
    setCurrentlyPlayingId(null);
  };

  const copyEmergencyInfo = () => {
    const text = `EMERGENCY TOURIST PASS - TERRAIN WISE [Token: ${userUniqueToken}]
Status: ${isRevealed ? 'UNMASKED' : 'MASKED'}
Name: ${userProfile.name}
Blood Group: ${isRevealed ? userProfile.bloodGroup : 'MASKED (Scan QR to reveal)'}
Age: ${isRevealed ? userProfile.age : '••'} | Gender: ${isRevealed ? userProfile.gender : '•'}
Allergies: ${isRevealed ? (userProfile.allergies || 'None') : 'MASKED'}
Medical: ${isRevealed ? (userProfile.medicalConditions || 'None') : 'MASKED'}
Emergency Contacts:
${userProfile.trustedContacts.map((c, i) => `${i + 1}. ${c.name} (${c.relationship}): ${isRevealed ? c.phone : '••••••••' + (c.phone ? c.phone.slice(-4) : '')}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScan = () => {
    setScanStep('scanning');
    setIsScanning(true);
    setTimeout(() => {
      setScanStep('verified');
      setIsScanning(false);
      setTimeout(() => {
        setIsRevealed(true);
        setIsQRModalOpen(false);
        setScanStep('idle');
      }, 1200);
    }, 1800);
  };

  // Helper masking functions
  const maskGovtId = (idStr?: string) => {
    if (!idStr) return 'TN-••••••••';
    if (idStr.length <= 4) return '••••' + idStr;
    return '•••• •••• ' + idStr.slice(-4);
  };

  const maskPhone = (phoneStr?: string) => {
    if (!phoneStr) return '••••••••••••';
    const clean = phoneStr.trim();
    if (clean.length <= 4) return '••••' + clean;
    return clean.slice(0, 3) + ' ••••• •' + clean.slice(-4);
  };

  const maskEmail = (emailStr?: string) => {
    if (!emailStr) return '';
    const parts = emailStr.split('@');
    if (parts.length < 2) return '••••••••@••••.com';
    const namePart = parts[0];
    const maskedName = namePart.length > 2 ? namePart.slice(0, 2) + '••••' : '••••';
    return `${maskedName}@${parts[1]}`;
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner Notice */}
      <div className="glass-panel" style={{ 
        padding: '16px 20px', 
        background: isRevealed 
          ? 'linear-gradient(90deg, rgba(6, 78, 59, 0.45) 0%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(90deg, rgba(136, 19, 55, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)',
        borderColor: isRevealed ? 'rgba(52, 211, 153, 0.4)' : 'rgba(244, 63, 94, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        transition: 'all 0.3s ease'
      }}>
        <div className="flex items-center gap-3">
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: isRevealed ? 'rgba(52, 211, 153, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: isRevealed ? '1px solid rgba(52, 211, 153, 0.5)' : '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {isRevealed ? (
              <ShieldCheck style={{ width: '24px', height: '24px', color: '#34d399' }} />
            ) : (
              <HeartPulse style={{ width: '22px', height: '22px', color: '#f87171' }} />
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Digital Tourist Emergency Card & QR Communicator
              {isRevealed ? (
                <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Unlock style={{ width: '11px', height: '11px' }} />
                  QR Verified & Unmasked
                </span>
              ) : (
                <span className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock style={{ width: '11px', height: '11px' }} />
                  Masked Privacy Mode
                </span>
              )}
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              {isRevealed
                ? 'Pass details unlocked via QR token verification. Paramedics & authorities can access unmasked vitals.'
                : 'Sensitive medical & contact details are masked. Scan the individual user QR code to reveal unmasked details.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick QR Scanner & Reveal Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="btn-secondary"
            style={{
              padding: '7px 15px',
              fontSize: '0.78rem',
              fontWeight: 800,
              background: isRevealed ? 'rgba(52, 211, 153, 0.15)' : 'linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
              borderColor: isRevealed ? '#34d399' : '#38bdf8',
              color: isRevealed ? '#34d399' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Scan style={{ width: '15px', height: '15px' }} />
            <span>{isRevealed ? '📷 View QR Code' : '📷 Scan QR Code to Reveal'}</span>
          </button>

          {/* Mask / Unmask Toggle Button */}
          {isRevealed && (
            <button
              onClick={() => setIsRevealed(false)}
              className="btn-secondary"
              style={{ padding: '7px 14px', fontSize: '0.78rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)', display: 'flex', alignItems: 'center', gap: '5px' }}
              title="Lock and re-mask personal medical details"
            >
              <Lock style={{ width: '13px', height: '13px' }} />
              <span>Lock & Mask</span>
            </button>
          )}

          <button
            onClick={onTriggerSOS}
            className="btn-sos"
            style={{ padding: '7px 16px', fontSize: '0.78rem', fontWeight: 800 }}
          >
            <ShieldAlert style={{ width: '15px', height: '15px' }} />
            <span>🚨 Broadcast SOS</span>
          </button>
          
          <button
            onClick={copyEmergencyInfo}
            className="btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.78rem' }}
          >
            {copied ? <Check style={{ width: '14px', height: '14px', color: '#34d399' }} /> : <Share2 style={{ width: '14px', height: '14px' }} />}
            <span>{copied ? 'Copied!' : 'Share Pass'}</span>
          </button>
          
          <button
            onClick={onOpenRegister}
            className="btn-secondary"
            style={{ padding: '7px 14px', fontSize: '0.78rem', color: '#38bdf8' }}
          >
            Edit Medical Data
          </button>
        </div>
      </div>

      {/* Main Digital ID Badge & Audio Broadcaster */}
      <div className="grid grid-12 gap-5">
        {/* Left 7 cols: The Emergency ID Card */}
        <div className="col-span-7 lg-col-span-12">
          <div className="glass-panel" style={{
            position: 'relative',
            overflow: 'hidden',
            background: isRevealed
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 78, 59, 0.25) 100%)'
              : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 28, 0.35) 100%)',
            border: isRevealed ? '2px solid rgba(52, 211, 153, 0.5)' : '2px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: isRevealed ? '0 15px 35px rgba(52, 211, 153, 0.15)' : '0 15px 35px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease'
          }}>
            {/* Header of Pass */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isRevealed ? '#10b981' : '#ef4444' }} />
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, color: isRevealed ? '#34d399' : '#f87171', fontFamily: 'monospace' }}>
                    {isRevealed ? 'OFFICIAL TOURIST SAFETY PASS • UNMASKED' : 'OFFICIAL TOURIST SAFETY PASS • MASKED'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{userProfile.name || 'Tourist Guest'}</span>
                  {isRevealed ? (
                    <CheckCircle2 style={{ width: '20px', height: '20px', color: '#34d399' }} />
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                      🔒 Masked
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  ID: <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: 700 }}>
                    {userProfile.govtIdType} ({isRevealed ? (userProfile.govtIdNumber || 'TN-VERIFIED') : maskGovtId(userProfile.govtIdNumber)})
                  </span>
                  <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '0.7rem' }}>[{userUniqueToken}]</span>
                </p>
              </div>

              {/* User-Specific Interactive QR Code Box */}
              <div 
                onClick={() => setIsQRModalOpen(true)}
                style={{ 
                  padding: '6px', 
                  background: '#ffffff', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title="Click to Enlarge / Scan QR Code"
              >
                {/* Dynamically Rendered SVG Matrix for this specific user */}
                <div style={{ width: '64px', height: '64px', background: '#090e17', borderRadius: '8px', padding: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 15 15" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
                    {qrMatrix.map((row, rIdx) => 
                      row.map((cell, cIdx) => (
                        cell ? (
                          <rect 
                            key={`${rIdx}-${cIdx}`} 
                            x={cIdx} 
                            y={rIdx} 
                            width={1} 
                            height={1} 
                            fill={isRevealed ? '#34d399' : '#38bdf8'} 
                          />
                        ) : null
                      ))
                    )}
                  </svg>
                </div>
                <span style={{ fontSize: '7px', color: '#090e17', fontFamily: 'monospace', fontWeight: 900, marginTop: '2px' }}>
                  {isRevealed ? 'VERIFIED ✓' : 'SCAN SOS'}
                </span>
              </div>
            </div>

            {/* Key Vitals Grid */}
            <div className="grid grid-4 gap-2" style={{ marginBottom: '16px' }}>
              {/* Blood Group */}
              <div style={{ 
                padding: '12px', 
                background: isRevealed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)', 
                border: isRevealed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.3)', 
                borderRadius: '14px', 
                textAlign: 'center',
                position: 'relative'
              }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: isRevealed ? '#a7f3d0' : '#fca5a5', display: 'block' }}>
                  Blood Group
                </span>
                <span style={{ fontSize: isRevealed ? '1.4rem' : '1.2rem', fontWeight: 900, color: isRevealed ? '#ffffff' : '#f87171', fontFamily: 'monospace' }}>
                  {isRevealed ? userProfile.bloodGroup : '🔒 ••'}
                </span>
              </div>

              {/* Age / Gender */}
              <div style={{ padding: '12px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#94a3b8', display: 'block' }}>Age / Gender</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isRevealed ? '#ffffff' : '#94a3b8', fontFamily: 'monospace' }}>
                  {isRevealed ? `${userProfile.age} yrs • ${userProfile.gender.charAt(0)}` : '•• yrs • •'}
                </span>
              </div>

              {/* Origin State */}
              <div style={{ padding: '12px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#94a3b8', display: 'block' }}>Origin State</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isRevealed ? '#e2e8f0' : '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                  {isRevealed ? (userProfile.govtIdState || 'Tamil Nadu') : '••••••••'}
                </span>
              </div>

              {/* Languages */}
              <div style={{ padding: '12px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#94a3b8', display: 'block' }}>Languages</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                  {userProfile.languagesKnown.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>

            {/* Medical Alerts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <AlertTriangle style={{ width: '18px', height: '18px', color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fef08a' }}>Allergies & Reactions: </span>
                  {isRevealed ? (
                    <span style={{ fontSize: '0.78rem', color: '#fef9c3', fontWeight: 600 }}>{userProfile.allergies || 'None reported'}</span>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 700, fontFamily: 'monospace' }}>
                      🔒 •••••••••••••••• (Scan QR to reveal)
                    </span>
                  )}
                </div>
              </div>

              {userProfile.medicalConditions && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Info style={{ width: '18px', height: '18px', color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#bae6fd' }}>Medical Conditions: </span>
                    {isRevealed ? (
                      <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: 600 }}>{userProfile.medicalConditions}</span>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, fontFamily: 'monospace' }}>
                        🔒 •••••••••••••••• (Scan QR to reveal)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 5 Trusted Contacts */}
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#cbd5e1' }}>
                  Emergency Contacts Reachable:
                </span>
                <span style={{ fontSize: '0.72rem', color: isRevealed ? '#34d399' : '#38bdf8', fontWeight: 700, fontFamily: 'monospace' }}>
                  {userProfile.trustedContacts.length} Registered {isRevealed ? '(Unmasked)' : '(Numbers Masked)'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {userProfile.trustedContacts.map((contact, idx) => (
                  <div 
                    key={contact.id || idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(10, 15, 29, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1e293b', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '10px' }}>
                        {idx + 1}
                      </span>
                      <div>
                        <strong style={{ color: '#ffffff' }}>{contact.name}</strong>
                        <span style={{ color: '#94a3b8', fontSize: '0.72rem', marginLeft: '6px' }}>({contact.relationship})</span>
                        {contact.email && (
                          <span style={{ color: isRevealed ? '#38bdf8' : '#64748b', fontSize: '0.68rem', display: 'block', fontFamily: isRevealed ? 'inherit' : 'monospace' }}>
                            ✉️ {isRevealed ? contact.email : maskEmail(contact.email)}
                          </span>
                        )}
                      </div>
                    </div>
                    {contact.phone && (
                      isRevealed ? (
                        <a 
                          href={`tel:${contact.phone}`}
                          style={{ color: '#34d399', fontWeight: 800, fontFamily: 'monospace', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <PhoneCall style={{ width: '13px', height: '13px' }} />
                          {contact.phone}
                        </a>
                      ) : (
                        <span style={{ color: '#64748b', fontWeight: 700, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Lock style={{ width: '11px', height: '11px', color: '#f87171' }} />
                          {maskPhone(contact.phone)}
                        </span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Emergency Audio Broadcast Station */}
        <div className="col-span-5 lg-col-span-12">
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
              <div className="flex items-center gap-2">
                <Volume2 style={{ width: '20px', height: '20px', color: '#38bdf8' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>Emergency Voice Broadcaster</h3>
              </div>
              {currentlyPlayingId && (
                <button
                  onClick={handleStopAudio}
                  className="btn-secondary"
                  style={{ padding: '4px 8px', fontSize: '0.72rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                >
                  <VolumeX style={{ width: '14px', height: '14px' }} /> Stop
                </button>
              )}
            </div>

            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '14px' }}>
              Tap any emergency phrase below to immediately speak it aloud in the destination language.
            </p>

            {/* Destination Language Selector */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Languages style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
                Target Broadcast Language:
              </label>
              <div className="grid grid-3 gap-1">
                {(['Tamil', 'Hindi', 'English', 'French', 'Spanish'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedTargetLang(lang)}
                    className="btn-secondary"
                    style={{
                      padding: '6px 8px',
                      fontSize: '0.75rem',
                      background: selectedTargetLang === lang ? 'rgba(56, 189, 248, 0.2)' : 'rgba(10, 15, 29, 0.7)',
                      borderColor: selectedTargetLang === lang ? '#38bdf8' : 'rgba(255,255,255,0.08)',
                      color: selectedTargetLang === lang ? '#38bdf8' : '#94a3b8'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Phrases List with Voice Trigger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
              {EMERGENCY_PHRASES.map(phrase => {
                const isPlaying = currentlyPlayingId === phrase.id;
                let localizedText = phrase.english;
                if (selectedTargetLang === 'Tamil') localizedText = phrase.tamil;
                else if (selectedTargetLang === 'Hindi') localizedText = phrase.hindi;
                else if (selectedTargetLang === 'French') localizedText = phrase.french;
                else if (selectedTargetLang === 'Spanish') localizedText = phrase.spanish;

                return (
                  <div
                    key={phrase.id}
                    onClick={() => handlePlayAudio(phrase)}
                    style={{
                      padding: '12px',
                      borderRadius: '14px',
                      border: isPlaying ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.06)',
                      background: isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(10, 15, 29, 0.75)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>{phrase.english}</p>
                      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8' }}>{localizedText}</p>
                    </div>
                    <button
                      type="button"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        border: 'none',
                        background: isPlaying ? '#ef4444' : 'rgba(56, 189, 248, 0.2)',
                        color: isPlaying ? '#ffffff' : '#38bdf8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}
                    >
                      {isPlaying ? <Volume2 style={{ width: '16px', height: '16px' }} /> : <Play style={{ width: '16px', height: '16px', fill: 'currentColor' }} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* USER-SPECIFIC QR CODE SCANNER & VERIFICATION MODAL */}
      {isQRModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 16, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIsQRModalOpen(false)}
        >
          <div 
            className="glass-panel animate-scale"
            style={{
              width: '100%',
              maxWidth: '460px',
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(20, 30, 55, 0.95) 100%)',
              border: '1.5px solid rgba(56, 189, 248, 0.5)',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <div className="flex items-center gap-2">
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  <QrCode style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                    Tourist Emergency QR Token
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Unique Token: <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{userUniqueToken}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsQRModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* High-Definition QR Code Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Laser Scanning Animation Bar when scanning */}
              {isScanning && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent 0%, #ef4444 50%, transparent 100%)',
                  boxShadow: '0 0 15px #ef4444',
                  animation: 'bounce 1.2s infinite'
                }} />
              )}

              <div style={{ width: '180px', height: '180px', background: '#090e17', borderRadius: '12px', padding: '12px' }}>
                <svg viewBox="0 0 15 15" style={{ width: '100%', height: '100%', shapeRendering: 'crispEdges' }}>
                  {qrMatrix.map((row, rIdx) => 
                    row.map((cell, cIdx) => (
                      cell ? (
                        <rect 
                          key={`modal-qr-${rIdx}-${cIdx}`} 
                          x={cIdx} 
                          y={rIdx} 
                          width={1} 
                          height={1} 
                          fill="#38bdf8" 
                        />
                      ) : null
                    ))
                  )}
                </svg>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#090e17', display: 'block' }}>
                  {userProfile.name || 'Verified Tourist'}
                </span>
                <span style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'monospace' }}>
                  Official Encrypted Pass: {userUniqueToken}
                </span>
              </div>
            </div>

            {/* Scanner Status & Action Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scanStep === 'idle' && (
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', fontSize: '0.76rem', color: '#cbd5e1' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#38bdf8', marginBottom: '2px' }}>
                    <Camera style={{ width: '14px', height: '14px' }} />
                    How to Unmask Pass:
                  </p>
                  <span>Paramedics or responders scan this QR code with any camera, or tap below to verify & unmask vitals immediately.</span>
                </div>
              )}

              {scanStep === 'scanning' && (
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <RefreshCw style={{ width: '18px', height: '18px', color: '#f87171', animation: 'spin 1s linear infinite' }} />
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>Decoding QR Token...</span>
                    <p style={{ fontSize: '0.7rem', color: '#fca5a5' }}>Validating cryptographic tourist signature with Terrain Wise Engine</p>
                  </div>
                </div>
              )}

              {scanStep === 'verified' && (
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 style={{ width: '20px', height: '20px', color: '#34d399' }} />
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#34d399' }}>Token Verified Successfully!</span>
                    <p style={{ fontSize: '0.7rem', color: '#a7f3d0' }}>Unmasking Blood Group ({userProfile.bloodGroup}), Allergies & Emergency Contacts...</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {scanStep === 'idle' && (
                  <button
                    type="button"
                    onClick={handleSimulateScan}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Scan style={{ width: '16px', height: '16px' }} />
                    <span>Scan & Unmask Details</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsQRModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.82rem' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

