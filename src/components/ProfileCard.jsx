import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

// Authentic Pokémon TCG style holographic foil stamped symbols (corner runes, 8-point stars, micro-sparkles)
const DEFAULT_HOLO_ICON = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none"><path d="M16 10h14v14" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M28 22v14h-14" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M64 58h14v14" stroke="white" stroke-width="2.5" stroke-linecap="round"/><path d="M76 70v14h-14" stroke="white" stroke-width="2.5" stroke-linecap="round"/><polygon points="24,68 26.5,61 33,63.5 26.5,66 24,73 21.5,66 15,63.5 21.5,61" fill="white"/><polygon points="72,20 74.5,13 81,15.5 74.5,18 72,25 69.5,18 63,15.5 69.5,13" fill="white"/><polygon points="48,48 50.5,42 56,44.5 50.5,47 48,53 45.5,47 40,44.5 45.5,42" fill="white" opacity="0.9"/><circle cx="48" cy="18" r="2" fill="white"/><circle cx="18" cy="48" r="2" fill="white"/><circle cx="78" cy="48" r="2" fill="white"/><circle cx="48" cy="78" r="2" fill="white"/></svg>`;

// Starlight holographic glitter noise
const DEFAULT_GRAIN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(%23g)"/></svg>`;

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 160
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl,
  portrait,
  iconUrl,
  grainUrl,
  innerGradient,
  behindGlowEnabled = false,
  behindGlowColor = 'rgba(212, 162, 46, 0.35)',
  behindGlowSize = '30%',
  className = '',
  enableTilt = true,
  enableMobileTilt = true,
  mobileTiltSensitivity = 6,
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

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.12;
    const INITIAL_TAU = 0.5;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 25, 75)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 25, 75)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 3.8))}deg`,
        '--rotate-y': `${round(centerY / 3.2)}deg`
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = ts => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || (typeof document !== 'undefined' && document.hasFocus())) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    event => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add('active');
      shell.classList.add('entering');
      if (wrap) wrap.classList.add('active');

      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        if (wrap) wrap.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    event => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || (typeof location !== 'undefined' && location.protocol !== 'https:')) return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  const cardStyle = useMemo(() => {
    const finalIcon = iconUrl || DEFAULT_HOLO_ICON;
    const finalGrain = grainUrl || DEFAULT_GRAIN;
    return {
      '--icon': `url('${finalIcon}')`,
      '--grain': `url('${finalGrain}')`,
      '--inner-gradient': innerGradient ?? 'none',
      '--behind-glow-color': behindGlowColor ?? 'rgba(212, 162, 46, 0.35)',
      '--behind-glow-size': behindGlowSize ?? '30%'
    };
  }, [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            {/* Holographic Foil Layer (Pokémon TCG Foil Sheen) */}
            <div className="pc-shine" />
            {/* Dynamic Specular Light Glare Flare */}
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
