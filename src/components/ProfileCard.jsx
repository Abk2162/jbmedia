import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

// Elegant luxury micro-etched guilloché & star foil pattern (subtle, mild, precision metallic luster)
const DEFAULT_HOLO_ICON = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M30 0 L60 30 L30 60 L0 30 Z" stroke="white" stroke-width="0.5" stroke-opacity="0.3"/><polygon points="30,27 31,29 33,30 31,31 30,33 29,31 27,30 29,29" fill="white" fill-opacity="0.45"/><circle cx="0" cy="0" r="1.2" fill="white" fill-opacity="0.25"/><circle cx="60" cy="0" r="1.2" fill="white" fill-opacity="0.25"/><circle cx="0" cy="60" r="1.2" fill="white" fill-opacity="0.25"/><circle cx="60" cy="60" r="1.2" fill="white" fill-opacity="0.25"/></svg>`;

// Starlight holographic glitter noise
const DEFAULT_GRAIN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(%23g)"/></svg>`;

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl,
  portrait,
  iconUrl,
  grainUrl,
  innerGradient,
  className = '',
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 4,
  miniAvatarUrl,
  name,
  title,
  role,
  handle,
  status,
  contactText = 'Profile',
  showUserInfo = false,
  onContactClick,
  person
}) => {
  const finalName = name || person?.name || 'Leader Name';
  const finalTitle = title || role || person?.role || 'Leadership';
  const finalAvatar = avatarUrl || portrait || person?.portrait || '';

  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const rafRef = useRef(null);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const updateCardVars = useCallback((x, y) => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;

    const width = shell.clientWidth || 1;
    const height = shell.clientHeight || 1;

    const percentX = clamp((100 / width) * x);
    const percentY = clamp((100 / height) * y);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    // Refined, subtle, classy tilt angles (±5.5° max)
    const properties = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 30, 70)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 30, 70)}%`,
      '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      '--pointer-from-top': `${percentY / 100}`,
      '--pointer-from-left': `${percentX / 100}`,
      '--rotate-x': `${round(-(centerX / 8.5))}deg`,
      '--rotate-y': `${round(centerY / 7.5)}deg`
    };

    for (const [k, v] of Object.entries(properties)) {
      wrap.style.setProperty(k, v);
    }
  }, []);

  const handlePointerEnter = useCallback(
    event => {
      if (!enableTilt) return;
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      shell.classList.add('active');
      wrap.classList.add('active');

      const { x, y } = getOffsets(event, shell);
      updateCardVars(x, y);
    },
    [enableTilt, updateCardVars]
  );

  const handlePointerMove = useCallback(
    event => {
      if (!enableTilt) return;
      const shell = shellRef.current;
      if (!shell) return;
      const { x, y } = getOffsets(event, shell);
      updateCardVars(x, y);
    },
    [enableTilt, updateCardVars]
  );

  const handlePointerLeave = useCallback(() => {
    if (!enableTilt) return;
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;

    // Instantly remove active class for immediate, seamless return without lingering delay
    shell.classList.remove('active');
    wrap.classList.remove('active');

    // Smoothly reset CSS variables to neutral center
    wrap.style.setProperty('--rotate-x', '0deg');
    wrap.style.setProperty('--rotate-y', '0deg');
    wrap.style.setProperty('--pointer-x', '50%');
    wrap.style.setProperty('--pointer-y', '50%');
    wrap.style.setProperty('--pointer-from-center', '0');
    wrap.style.setProperty('--background-x', '50%');
    wrap.style.setProperty('--background-y', '50%');
  }, [enableTilt]);

  const handleDeviceOrientation = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(centerY + (beta - 20) * mobileTiltSensitivity, 0, shell.clientHeight);

      updateCardVars(x, y);
    },
    [mobileTiltSensitivity, updateCardVars]
  );

  useEffect(() => {
    if (!enableTilt) return;
    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener('pointerenter', handlePointerEnter);
    shell.addEventListener('pointermove', handlePointerMove);
    shell.addEventListener('pointerleave', handlePointerLeave);

    const handleClick = () => {
      if (!enableMobileTilt || (typeof location !== 'undefined' && location.protocol !== 'https:')) return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
    shell.addEventListener('click', handleClick);

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter);
      shell.removeEventListener('pointermove', handlePointerMove);
      shell.removeEventListener('pointerleave', handlePointerLeave);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    enableTilt,
    enableMobileTilt,
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(() => {
    const finalIcon = iconUrl || DEFAULT_HOLO_ICON;
    const finalGrain = grainUrl || DEFAULT_GRAIN;
    return {
      '--icon': `url('${finalIcon}')`,
      '--grain': `url('${finalGrain}')`,
      '--inner-gradient': innerGradient ?? 'none'
    };
  }, [iconUrl, grainUrl, innerGradient]);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            {/* Mild Luxury Holographic Foil Sheen */}
            <div className="pc-shine" />
            {/* Smooth Specular Light Glare */}
            <div className="pc-glare" />

            {/* Foreground Avatar Layer with 3D Parallax */}
            <div className="pc-content pc-avatar-content">
              {finalAvatar ? (
                <img
                  className="avatar"
                  src={finalAvatar}
                  alt={`${finalName} portrait`}
                  loading="lazy"
                  onError={e => {
                    const t = e.target;
                    t.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-gold-200 font-bold text-2xl absolute bottom-12 left-1/2 -translate-x-1/2">
                  {finalName.charAt(0)}
                </div>
              )}

              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || finalAvatar}
                        alt={`${finalName} mini avatar`}
                        loading="lazy"
                        onError={e => {
                          const t = e.target;
                          t.style.opacity = '0.5';
                          t.src = finalAvatar;
                        }}
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">{handle ? `@${handle}` : finalTitle}</div>
                      <div className="pc-status">{status || 'Leadership'}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                    aria-label={`Contact ${finalName}`}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            {/* Typography Header */}
            <div className="pc-content">
              <div className="pc-details">
                <h3>{finalName}</h3>
                <p>{finalTitle}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
