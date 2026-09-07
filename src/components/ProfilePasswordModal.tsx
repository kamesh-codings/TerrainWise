import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, User, KeyRound, AlertCircle, X } from 'lucide-react';
import { UserProfile, ServiceProviderProfile } from '../types';
import { authenticateAccount } from '../utils/storage';
import { loginWithBackendAPI } from '../utils/api';

export type ProfileTargetAction = 'view_profile' | 'edit_tourist' | 'edit_provider';

interface ProfilePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetAction: ProfileTargetAction;
  userProfile: UserProfile;
  providerProfile?: ServiceProviderProfile | null;
  onSuccess: (targetAction: ProfileTargetAction) => void;
  onOpenForgotPassword?: () => void;
}

export const ProfilePasswordModal: React.FC<ProfilePasswordModalProps> = ({
  isOpen,
  onClose,
  targetAction,
  userProfile,
  providerProfile,
  onSuccess,
  onOpenForgotPassword
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMsg(null);
      setShowPassword(false);
      setIsVerifying(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isProviderTarget = targetAction === 'edit_provider' || (!userProfile.isRegistered && !!providerProfile);
  const activeName = isProviderTarget 
    ? (providerProfile?.businessName || providerProfile?.providerName || 'Service Provider Partner')
    : (userProfile.name || 'Tourist Profile');
  const activeUsername = isProviderTarget
    ? (providerProfile?.username || providerProfile?.email || 'Partner Account')
    : (userProfile.username ? `@${userProfile.username}` : userProfile.email || 'Registered User');

  const getActionTitle = () => {
    switch (targetAction) {
      case 'edit_tourist':
        return 'Verify Password to Edit Profile';
      case 'edit_provider':
        return 'Verify Password to Edit Partner Details';
      case 'view_profile':
      default:
        return 'Enter Password to View Profile';
    }
  };

  const getActionSubtitle = () => {
    switch (targetAction) {
      case 'edit_tourist':
        return 'Please confirm your login password before modifying your personal safety data.';
      case 'edit_provider':
        return 'Please enter your account password to update your accredited business details.';
      case 'view_profile':
      default:
        return 'Your profile contains confidential identity and emergency records. Enter password to view.';
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    const cleanPass = password.trim();

    try {
      // 1. Check directly against local active profile stored password
      const savedPass = isProviderTarget ? providerProfile?.password : userProfile.password;
      
      let isValid = false;

      if (savedPass && (savedPass === cleanPass || savedPass === password)) {
        isValid = true;
      }

      // 2. Check offline registry credentials
      if (!isValid) {
        const identifier = isProviderTarget
          ? (providerProfile?.username || providerProfile?.email || providerProfile?.providerName || '')
          : (userProfile.username || userProfile.email || userProfile.name || '');

        if (identifier) {
          const authResult = authenticateAccount(identifier, cleanPass);
          if (authResult) {
            isValid = true;
          }
        }
      }

      // 3. Fallback check against backend MySQL API
      if (!isValid) {
        const identifier = isProviderTarget
          ? (providerProfile?.username || providerProfile?.email || '')
          : (userProfile.username || userProfile.email || '');

        if (identifier) {
          const backendRes = await loginWithBackendAPI(identifier, cleanPass);
          if (backendRes && backendRes.success) {
            isValid = true;
          }
        }
      }

      // 4. Special fallback if profile has no password set (e.g. initial guest or direct import)
      if (!isValid && !savedPass && (!userProfile.password && !providerProfile?.password)) {
        isValid = true;
      }

      if (isValid) {
        onSuccess(targetAction);
        onClose();
      } else {
        setErrorMsg('Incorrect password. Please verify and try again.');
      }
    } catch {
      setErrorMsg('Error verifying credentials. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      className="animate-fade"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.99) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.15)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          title="Cancel"
        >
          <X style={{ width: '16px', height: '16px' }} />
        </button>

        {/* Security Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.25) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              margin: '0 auto 14px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              boxShadow: '0 8px 20px rgba(56, 189, 248, 0.2)'
            }}
          >
            <Lock style={{ width: '26px', height: '26px' }} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            {getActionTitle()}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45, maxWidth: '340px', margin: '0 auto' }}>
            {getActionSubtitle()}
          </p>
        </div>

        {/* User Identity Preview Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 14px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: isProviderTarget
                ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)'
                : 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isProviderTarget ? '#000000' : '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              flexShrink: 0
            }}
          >
            {isProviderTarget ? <ShieldCheck style={{ width: '20px', height: '20px' }} /> : <User style={{ width: '20px', height: '20px' }} />}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeName}
              </span>
              <span className={`badge ${isProviderTarget ? 'badge-amber' : 'badge-blue'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                {isProviderTarget ? 'Partner' : 'Tourist'}
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeUsername}
            </span>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Account Login Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Enter password to unlock"
                className="input-field"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  fontSize: '0.9rem',
                  borderRadius: '12px',
                  background: 'rgba(10, 15, 29, 0.85)',
                  border: errorMsg ? '1px solid #f87171' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff style={{ width: '18px', height: '18px' }} /> : <Eye style={{ width: '18px', height: '18px' }} />}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              className="animate-fade"
            >
              <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1, padding: '12px', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="btn-primary"
              style={{
                flex: 1.5,
                padding: '12px',
                fontSize: '0.85rem',
                fontWeight: 800,
                justifyContent: 'center',
                background: isProviderTarget
                  ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
                color: isProviderTarget ? '#000000' : '#ffffff'
              }}
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <KeyRound style={{ width: '16px', height: '16px' }} />
                  <span>Unlock & Open</span>
                </>
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          {onOpenForgotPassword && (
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenForgotPassword();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#38bdf8',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '4px 8px'
                }}
              >
                Forgot your password? Reset with OTP
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
