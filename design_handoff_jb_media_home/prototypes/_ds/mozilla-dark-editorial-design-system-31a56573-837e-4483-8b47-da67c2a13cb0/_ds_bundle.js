/* @ds-bundle: {"format":4,"namespace":"MozillaDarkEditorialDesignSystem_31a565","components":[{"name":"JBButton","sourcePath":"components/jbmedia/JBButton.jsx"},{"name":"JBPersonCard","sourcePath":"components/jbmedia/JBPersonCard.jsx"},{"name":"JBPosterCard","sourcePath":"components/jbmedia/JBPosterCard.jsx"},{"name":"JBSectionTitle","sourcePath":"components/jbmedia/JBSectionTitle.jsx"},{"name":"JBStat","sourcePath":"components/jbmedia/JBStat.jsx"}],"sourceHashes":{"components/jbmedia/JBButton.jsx":"a5f8abc9dce4","components/jbmedia/JBPersonCard.jsx":"8a260623abfb","components/jbmedia/JBPosterCard.jsx":"22ae2c8f5a90","components/jbmedia/JBSectionTitle.jsx":"5ab7d200b297","components/jbmedia/JBStat.jsx":"ed52c0d1caef","ui_kits/jbmedia/app.jsx":"8f13c0c593ab","ui_kits/jbmedia/chrome.jsx":"698b10f4a4eb","ui_kits/jbmedia/pages.jsx":"c5f6dc7115ab"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MozillaDarkEditorialDesignSystem_31a565 = window.MozillaDarkEditorialDesignSystem_31a565 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/jbmedia/JBButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: '10px 20px',
    fontSize: '13px',
    letterSpacing: '0.16em'
  },
  md: {
    padding: '14px 32px',
    fontSize: '14px',
    letterSpacing: '0.18em'
  },
  lg: {
    padding: '18px 44px',
    fontSize: '16px',
    letterSpacing: '0.18em'
  }
};
function JBButton({
  children,
  variant = 'gold',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = sizes[size] || sizes.md;
  const skins = {
    gold: {
      background: 'var(--jb-gradient-gold)',
      color: 'var(--jb-black)',
      border: '1px solid transparent',
      boxShadow: hover ? '0 10px 30px rgba(212,162,46,0.28)' : 'none'
    },
    outline: {
      background: hover ? 'var(--jb-gold-wash)' : 'transparent',
      color: 'var(--jb-gold-300)',
      border: '1px solid ' + (hover ? 'var(--jb-gold-line-strong)' : 'var(--jb-gold-line)')
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--jb-gold-300)' : 'var(--jb-text-primary)',
      border: '1px solid transparent',
      padding: 0
    }
  };
  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxSizing: 'border-box',
    fontFamily: 'var(--jb-font-condensed)',
    fontWeight: 600,
    textTransform: 'uppercase',
    textDecoration: 'none',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    borderRadius: 'var(--jb-radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--jb-duration) var(--jb-ease)',
    ...s,
    ...(skins[variant] || skins.gold),
    ...(variant === 'ghost' ? {
      padding: 0
    } : null),
    ...(press && !disabled ? {
      transform: 'translateY(1px)'
    } : null),
    ...(disabled ? {
      opacity: 0.35
    } : null),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: composed
  }), children, variant === 'ghost' ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.1em',
      lineHeight: 1
    }
  }, "\u203A") : null);
}
Object.assign(__ds_scope, { JBButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/jbmedia/JBButton.jsx", error: String((e && e.message) || e) }); }

// components/jbmedia/JBPersonCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function JBPersonCard({
  photo,
  name,
  role,
  team,
  quote,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--jb-surface-card)',
      border: '1px solid ' + (hover ? 'var(--jb-gold-line-strong)' : 'var(--jb-gold-line)'),
      borderRadius: 'var(--jb-radius-sm)',
      overflow: 'hidden',
      transition: 'border-color var(--jb-duration) var(--jb-ease)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '1 / 1',
      background: 'var(--jb-ink-900)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      fontSize: '40px',
      letterSpacing: '0.04em',
      color: 'var(--jb-gold-700)'
    }
  }, (name || '?').split(' ').map(w => w[0]).slice(0, 2).join(''))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 20px',
      borderTop: '1px solid var(--jb-gold-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      textTransform: 'uppercase',
      fontSize: '19px',
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      color: 'var(--jb-cream)'
    }
  }, name), role ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)',
      marginTop: '7px'
    }
  }, role) : null, team ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '14px',
      color: 'var(--jb-text-muted)',
      marginTop: '6px'
    }
  }, team) : null, quote ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      lineHeight: 1.6,
      color: 'var(--jb-text-secondary)',
      margin: '14px 0 0'
    }
  }, quote) : null));
}
Object.assign(__ds_scope, { JBPersonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/jbmedia/JBPersonCard.jsx", error: String((e && e.message) || e) }); }

// components/jbmedia/JBPosterCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function JBPosterCard({
  src,
  alt = '',
  title,
  meta,
  tag,
  ratio = '4 / 5',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("figure", _extends({}, rest, {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--jb-surface-card)',
      border: '1px solid ' + (hover ? 'var(--jb-gold-line-strong)' : 'var(--jb-gold-line)'),
      borderRadius: 'var(--jb-radius-sm)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color var(--jb-duration) var(--jb-ease)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      overflow: 'hidden',
      background: 'var(--jb-ink-900)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform 600ms var(--jb-ease)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontSize: '13px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--jb-text-muted)'
    }
  }, alt || 'Photo not supplied'))), tag ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px',
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--jb-black)',
      background: 'var(--jb-gradient-gold)',
      padding: '5px 10px'
    }
  }, tag) : null, title || meta ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '48px 20px 18px',
      background: 'var(--jb-gradient-scrim)'
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      textTransform: 'uppercase',
      fontSize: '22px',
      lineHeight: 1.05,
      letterSpacing: '0.02em',
      color: 'var(--jb-cream)'
    }
  }, title) : null, meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontSize: '13px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)',
      marginTop: '8px'
    }
  }, meta) : null) : null);
}
Object.assign(__ds_scope, { JBPosterCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/jbmedia/JBPosterCard.jsx", error: String((e && e.message) || e) }); }

// components/jbmedia/JBSectionTitle.jsx
try { (() => {
function JBSectionTitle({
  eyebrow,
  children,
  align = 'left',
  size = 'section',
  rule = true,
  style
}) {
  const sizes = {
    hero: {
      fontSize: 'var(--jb-type-hero-size)',
      lineHeight: 'var(--jb-type-hero-line)',
      letterSpacing: 'var(--jb-type-hero-tracking)'
    },
    display: {
      fontSize: 'var(--jb-type-display-size)',
      lineHeight: 'var(--jb-type-display-line)',
      letterSpacing: 'var(--jb-type-display-tracking)'
    },
    section: {
      fontSize: 'var(--jb-type-section-size)',
      lineHeight: 'var(--jb-type-section-line)',
      letterSpacing: 'var(--jb-type-section-tracking)'
    },
    title: {
      fontSize: 'var(--jb-type-title-size)',
      lineHeight: 'var(--jb-type-title-line)',
      letterSpacing: 'var(--jb-type-title-tracking)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: 'var(--jb-type-eyebrow-size)',
      letterSpacing: 'var(--jb-type-eyebrow-tracking)',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)',
      marginBottom: '16px'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--jb-font-display)',
      fontWeight: 400,
      textTransform: 'uppercase',
      color: 'var(--jb-text-primary)',
      ...sizes[size]
    }
  }, children), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: '2px',
      width: '72px',
      marginTop: '24px',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
      background: 'var(--jb-gradient-gold)'
    }
  }) : null);
}
Object.assign(__ds_scope, { JBSectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/jbmedia/JBSectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/jbmedia/JBStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function JBStat({
  value,
  label,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      borderTop: '2px solid transparent',
      borderImage: 'var(--jb-gradient-gold) 1',
      paddingTop: '18px',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      fontSize: '52px',
      lineHeight: 1,
      letterSpacing: '0.01em',
      background: 'var(--jb-gradient-gold)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--jb-text-muted)',
      marginTop: '10px'
    }
  }, label));
}
Object.assign(__ds_scope, { JBStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/jbmedia/JBStat.jsx", error: String((e && e.message) || e) }); }

// ui_kits/jbmedia/app.jsx
try { (() => {
const {
  TopNav,
  Footer,
  HomePage,
  GalleryPage,
  TeamPage,
  AboutPage,
  JoinPage
} = window;
function App() {
  const [page, setPage] = React.useState('Home');
  const go = p => {
    setPage(p);
    window.scrollTo(0, 0);
  };
  const Page = page === 'Gallery' ? GalleryPage : page === 'Team' ? TeamPage : page === 'About Us' ? AboutPage : page === 'Join' ? JoinPage : HomePage;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--jb-surface-page)',
      color: 'var(--jb-text-primary)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    page: page,
    onNavigate: go
  }), /*#__PURE__*/React.createElement(Page, {
    onNavigate: go
  }), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: go
  }));
}
window.__mountApp = () => {
  const el = document.getElementById('root');
  if (el) ReactDOM.createRoot(el).render(/*#__PURE__*/React.createElement(App, null));
};
if (document.getElementById('root')) window.__mountApp();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/jbmedia/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/jbmedia/chrome.jsx
try { (() => {
const {
  JBButton
} = window.MozillaDarkEditorialDesignSystem_31a565;
const LOGO = '../../assets/jb-media-logo.png';
const NAV = ['Home', 'Gallery', 'Team', 'About Us'];
function TopNav({
  page,
  onNavigate
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(10,9,8,0.94)',
      borderBottom: '1px solid var(--jb-gold-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--jb-max-width)',
      margin: '0 auto',
      padding: '14px var(--jb-page-margin)',
      display: 'flex',
      alignItems: 'center',
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('Home');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "JB Media",
    style: {
      height: '52px',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      textTransform: 'uppercase',
      fontSize: '22px',
      letterSpacing: '0.04em',
      color: 'var(--jb-cream)',
      whiteSpace: 'nowrap'
    }
  }, "JB Media")), /*#__PURE__*/React.createElement("nav", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    }
  }, NAV.map(item => {
    const active = page === item;
    return /*#__PURE__*/React.createElement("a", {
      key: item,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate(item);
      },
      onMouseEnter: () => setHover(item),
      onMouseLeave: () => setHover(null),
      style: {
        fontFamily: 'var(--jb-font-condensed)',
        fontWeight: 600,
        fontSize: '15px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: active || hover === item ? 'var(--jb-gold-300)' : 'var(--jb-text-primary)',
        whiteSpace: 'nowrap',
        paddingBottom: '4px',
        borderBottom: '2px solid ' + (active ? 'var(--jb-gold-500)' : 'transparent'),
        transition: 'color var(--jb-duration-fast) var(--jb-ease)'
      }
    }, item);
  }), /*#__PURE__*/React.createElement(JBButton, {
    variant: "outline",
    size: "sm",
    onClick: () => onNavigate('Join')
  }, "Join us"))));
}
const SOCIALS = [['Instagram', 'https://www.instagram.com/media_jbiet'], ['YouTube', 'https://www.youtube.com/@media_jbiet'], ['Facebook', 'https://www.facebook.com/mediajbofficial/'], ['LinkedIn', 'https://www.linkedin.com/company/jb-institute-of-engineering-technology-alumni-network/'], ['X', 'https://x.com/media_jbiet']];
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--jb-gold-line)',
      marginTop: '96px',
      background: 'var(--jb-ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--jb-max-width)',
      margin: '0 auto',
      padding: '64px var(--jb-page-margin) 40px',
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1.2fr',
      gap: '64px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "JB Media",
    style: {
      height: '84px',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)',
      marginTop: '20px'
    }
  }, "Connect \xB7 Communicate \xB7 Collaborate"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      lineHeight: 1.7,
      color: 'var(--jb-text-muted)',
      maxWidth: '320px',
      marginTop: '16px'
    }
  }, "The Branding Hub of JBIET.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--jb-text-muted)',
      marginBottom: '20px'
    }
  }, "Quick links"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, ['Home', 'Gallery', 'Team', 'About Us'].map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(l);
    },
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      color: 'var(--jb-text-secondary)',
      textDecoration: 'none'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--jb-text-muted)',
      marginBottom: '20px'
    }
  }, "Contact us"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      lineHeight: 2,
      color: 'var(--jb-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "+91 95503 51643"), /*#__PURE__*/React.createElement("div", null, "+91 95022 97525"), /*#__PURE__*/React.createElement("div", null, "mediajbiet@gmail.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--jb-text-muted)',
      marginTop: '8px'
    }
  }, "JBIET, Moinabad, Hyderabad")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px'
    }
  }, SOCIALS.map(([name, url]) => /*#__PURE__*/React.createElement("a", {
    key: name,
    href: url,
    target: "_blank",
    rel: "noreferrer",
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: 'var(--jb-gold-300)',
      border: '1px solid var(--jb-gold-line)',
      padding: '6px 12px'
    }
  }, name))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--jb-gold-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--jb-max-width)',
      margin: '0 auto',
      padding: '20px var(--jb-page-margin)',
      fontFamily: 'var(--jb-font-body)',
      fontSize: '13px',
      color: 'var(--jb-text-muted)'
    }
  }, "\xA9 2025 JB Media Club, JBIET. All rights reserved.")));
}
const Shell = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: 'var(--jb-max-width)',
    margin: '0 auto',
    padding: '0 var(--jb-page-margin)',
    ...style
  }
}, children);
Object.assign(window, {
  TopNav,
  Footer,
  Shell,
  LOGO
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/jbmedia/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/jbmedia/pages.jsx
try { (() => {
const {
  JBButton,
  JBSectionTitle,
  JBPosterCard,
  JBPersonCard,
  JBStat
} = window.MozillaDarkEditorialDesignSystem_31a565;
const {
  Shell,
  LOGO
} = window;
const POSTER_FEST = '../../assets/posters/abhav-2k26-inaugural.png';
const POSTER_RECRUIT = '../../assets/posters/recruitments-open.png';
const TEAMS = [['Videography', 'Every event, from first frame to final cut.'], ['Photography', 'Stills that hold the energy of the day.'], ['Design', 'Posters, identities and everything printed.'], ['Podcast', 'Long-form conversations with the campus.'], ['Radio', 'Live voice across JBIET.'], ['Promotions', 'Getting the work in front of people.']];
function HomePage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      borderBottom: '1px solid var(--jb-gold-line)'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.25fr 0.9fr',
      gap: '64px',
      alignItems: 'center',
      padding: '110px 0 96px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)'
    }
  }, "Connect \xB7 Communicate \xB7 Collaborate"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 0',
      fontFamily: 'var(--jb-font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(52px, 7.2vw, 104px)',
      lineHeight: 0.92,
      letterSpacing: '0.02em',
      color: 'var(--jb-cream)'
    }
  }, "The Branding", /*#__PURE__*/React.createElement("br", null), "Hub of ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--jb-gradient-gold)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, "JBIET")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '19px',
      lineHeight: 1.65,
      color: 'var(--jb-text-secondary)',
      maxWidth: '520px',
      marginTop: '28px'
    }
  }, "We are more than just a media club. Our main goal is to create Brand JBIET by showcasing its vibrant culture, achievements, and student talent through the power of media."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      marginTop: '40px'
    }
  }, /*#__PURE__*/React.createElement(JBButton, {
    variant: "gold",
    size: "lg",
    onClick: () => onNavigate('Join')
  }, "Join the club"), /*#__PURE__*/React.createElement(JBButton, {
    variant: "outline",
    size: "lg",
    onClick: () => onNavigate('Gallery')
  }, "See our work"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "JB Media medallion",
    style: {
      width: '100%',
      maxWidth: '400px',
      display: 'block',
      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))'
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: '1px solid var(--jb-gold-line)'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '40px',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement(JBStat, {
    value: "6",
    label: "Teams"
  }), /*#__PURE__*/React.createElement(JBStat, {
    value: "120+",
    label: "Members"
  }), /*#__PURE__*/React.createElement(JBStat, {
    value: "40+",
    label: "Events covered"
  }), /*#__PURE__*/React.createElement(JBStat, {
    value: "2026",
    label: "Abhav edition"
  })))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "What we do",
    size: "section"
  }, "Six teams, one frame"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '19px',
      lineHeight: 1.65,
      color: 'var(--jb-text-secondary)',
      maxWidth: '640px',
      marginTop: '28px'
    }
  }, "From dynamic videography and photography, to innovative design, podcasts, radio, and promotions, our teams work together to highlight the spirit of JBIET in its truest form."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '2px',
      marginTop: '48px',
      background: 'var(--jb-gold-line)'
    }
  }, TEAMS.map(([name, body], i) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      background: 'var(--jb-surface-page)',
      padding: '32px 28px 36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.2em',
      color: 'var(--jb-gold-700)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-display)',
      textTransform: 'uppercase',
      fontSize: '28px',
      lineHeight: 1.1,
      letterSpacing: '0.02em',
      color: 'var(--jb-cream)',
      marginTop: '14px'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      lineHeight: 1.7,
      color: 'var(--jb-text-muted)',
      margin: '12px 0 0'
    }
  }, body))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--jb-gold-line)',
      background: 'var(--jb-ink-900)'
    }
  }, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "Latest",
    size: "section"
  }, "On the wall"), /*#__PURE__*/React.createElement(JBButton, {
    variant: "ghost",
    onClick: () => onNavigate('Gallery')
  }, "See more")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '20px',
      marginTop: '48px'
    }
  }, /*#__PURE__*/React.createElement(JBPosterCard, {
    src: POSTER_FEST,
    tag: "Fest",
    title: "Abhav 2K26",
    meta: "11.03.2026 \xB7 Inaugural",
    ratio: "4 / 5",
    onClick: () => onNavigate('Gallery')
  }), /*#__PURE__*/React.createElement(JBPosterCard, {
    src: POSTER_RECRUIT,
    tag: "Recruit",
    title: "Recruitments open",
    meta: "The frame is ready",
    ratio: "4 / 5",
    onClick: () => onNavigate('Join')
  }), /*#__PURE__*/React.createElement(JBPosterCard, {
    alt: "Event photo \u2014 not supplied",
    title: "Convocation 2025",
    meta: "Photography team",
    ratio: "4 / 5"
  }), /*#__PURE__*/React.createElement(JBPosterCard, {
    alt: "Event photo \u2014 not supplied",
    title: "Tech Fest coverage",
    meta: "Videography team",
    ratio: "4 / 5"
  }))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '96px 0 0'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "From the institution",
    size: "section"
  }, "Messages"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '24px',
      marginTop: '48px'
    }
  }, /*#__PURE__*/React.createElement(JBPersonCard, {
    name: "Secretary",
    role: "Secretary's message",
    quote: "Message text from mediajbiet.in/secretary \u2014 not supplied."
  }), /*#__PURE__*/React.createElement(JBPersonCard, {
    name: "Director",
    role: "Director's message",
    quote: "Message text from mediajbiet.in/director \u2014 not supplied."
  }), /*#__PURE__*/React.createElement(JBPersonCard, {
    name: "Principal",
    role: "Principal's message",
    quote: "Message text from mediajbiet.in/principal \u2014 not supplied."
  }))))));
}
function GalleryPage() {
  const [filter, setFilter] = React.useState('All');
  const items = [{
    tag: 'Fest',
    title: 'Abhav 2K26',
    meta: 'Inaugural ceremony',
    src: POSTER_FEST,
    cat: 'Design'
  }, {
    tag: 'Recruit',
    title: 'Recruitments open',
    meta: 'From Lens to Limelight',
    src: POSTER_RECRUIT,
    cat: 'Design'
  }, {
    title: 'Convocation 2025',
    meta: 'Photography',
    cat: 'Photography'
  }, {
    title: 'Freshers 2025',
    meta: 'Photography',
    cat: 'Photography'
  }, {
    title: 'Campus film',
    meta: 'Videography',
    cat: 'Videography'
  }, {
    title: 'JB Radio, episode 12',
    meta: 'Radio',
    cat: 'Radio'
  }, {
    title: 'Podcast: alumni hour',
    meta: 'Podcast',
    cat: 'Podcast'
  }, {
    title: 'Sports day reel',
    meta: 'Videography',
    cat: 'Videography'
  }];
  const cats = ['All', 'Design', 'Photography', 'Videography', 'Radio', 'Podcast'];
  const shown = filter === 'All' ? items : items.filter(i => i.cat === filter);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '80px 0 0'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "Gallery",
    size: "display"
  }, "Every frame we kept"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '40px'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilter(c),
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      padding: '9px 18px',
      background: filter === c ? 'var(--jb-gradient-gold)' : 'transparent',
      color: filter === c ? 'var(--jb-black)' : 'var(--jb-text-secondary)',
      border: '1px solid ' + (filter === c ? 'transparent' : 'var(--jb-gold-line)'),
      borderRadius: 'var(--jb-radius-sm)',
      transition: 'all var(--jb-duration-fast) var(--jb-ease)'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '20px',
      marginTop: '40px'
    }
  }, shown.map(i => /*#__PURE__*/React.createElement(JBPosterCard, {
    key: i.title,
    src: i.src,
    alt: i.title + ' — photo not supplied',
    tag: i.tag,
    title: i.title,
    meta: i.meta,
    ratio: "4 / 5"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '14px',
      color: 'var(--jb-text-muted)',
      marginTop: '32px'
    }
  }, "Tiles without artwork are placeholders \u2014 supply real photographs to fill them."))));
}
function TeamPage() {
  const groups = [['Core committee', [['Secretary', 'Core'], ['Joint Secretary', 'Core'], ['Treasurer', 'Core'], ['Coordinator', 'Core']]], ['Videography', [['Lead', 'Videography'], ['Editor', 'Videography'], ['Camera', 'Videography'], ['Camera', 'Videography']]], ['Photography', [['Lead', 'Photography'], ['Photographer', 'Photography'], ['Photographer', 'Photography'], ['Photographer', 'Photography']]], ['Design', [['Lead', 'Design'], ['Designer', 'Design'], ['Designer', 'Design'], ['Designer', 'Design']]]];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '80px 0 0'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "Team",
    size: "display"
  }, "The people behind it"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '19px',
      lineHeight: 1.65,
      color: 'var(--jb-text-secondary)',
      maxWidth: '640px',
      marginTop: '28px'
    }
  }, "Names, roles and headshots were not supplied. Every tile below is a slot waiting for a real member."), groups.map(([group, members]) => /*#__PURE__*/React.createElement("div", {
    key: group,
    style: {
      marginTop: '64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)'
    }
  }, group), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: '1px',
      background: 'var(--jb-gold-line)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '20px'
    }
  }, members.map(([role, team], i) => /*#__PURE__*/React.createElement(JBPersonCard, {
    key: group + i,
    name: 'Name ' + (i + 1),
    role: role,
    team: team
  }))))))));
}
function AboutPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '80px 0 0'
    }
  }, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "About us",
    size: "display"
  }, "More than a media club"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 0.9fr',
      gap: '64px',
      marginTop: '48px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '19px',
      lineHeight: 1.75,
      color: 'var(--jb-text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "At JB Media, we are more than just a media club \u2014 we are the Branding Hub of JBIET. Our main goal is to create Brand JBIET by showcasing its vibrant culture, achievements, and student talent through the power of media."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Built on creativity, passion, and collaboration, JB Media is a space where stories come alive, ideas find their stage, and every moment on campus gets captured, celebrated, and shared."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "From dynamic videography and photography, to innovative design, podcasts, radio, and promotions, our teams work together to highlight the spirit of JBIET in its truest form. Every frame, every word, and every broadcast reflects the energy, talent, and dedication of our members.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--jb-gold-line)',
      padding: '32px',
      background: 'var(--jb-surface-card)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "JB Media",
    style: {
      width: '100%',
      maxWidth: '200px',
      display: 'block',
      margin: '0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-500)',
      textAlign: 'center',
      marginTop: '24px'
    }
  }, "Connect \xB7 Communicate \xB7 Collaborate"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '1px',
      background: 'var(--jb-gold-line)',
      margin: '28px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '15px',
      lineHeight: 2,
      color: 'var(--jb-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "mediajbiet@gmail.com"), /*#__PURE__*/React.createElement("div", null, "+91 95503 51643"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--jb-text-muted)'
    }
  }, "JBIET, Moinabad, Hyderabad")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/React.createElement(JBButton, {
    variant: "gold",
    onClick: () => onNavigate('Join'),
    style: {
      width: '100%'
    }
  }, "Join the club")))))));
}
function JoinPage({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Shell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 0.85fr',
      gap: '64px',
      padding: '80px 0 0',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(JBSectionTitle, {
    eyebrow: "Recruitments open",
    size: "display"
  }, "The frame is ready. Are you?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '19px',
      lineHeight: 1.65,
      color: 'var(--jb-text-secondary)',
      maxWidth: '520px',
      marginTop: '28px'
    }
  }, "Where creativity meets opportunity. Pick a team, bring your work, and help us build Brand JBIET."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '32px'
    }
  }, ['Videography', 'Photography', 'Design', 'Podcast', 'Radio', 'Promotions'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'var(--jb-font-condensed)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--jb-gold-300)',
      border: '1px solid var(--jb-gold-line)',
      padding: '8px 14px',
      borderRadius: 'var(--jb-radius-full)'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      marginTop: '40px'
    }
  }, /*#__PURE__*/React.createElement(JBButton, {
    variant: "gold",
    size: "lg",
    href: "mailto:mediajbiet@gmail.com"
  }, "Email us"), /*#__PURE__*/React.createElement(JBButton, {
    variant: "outline",
    size: "lg",
    onClick: () => onNavigate('About Us')
  }, "About the club")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--jb-font-body)',
      fontSize: '14px',
      color: 'var(--jb-text-muted)',
      marginTop: '24px'
    }
  }, "The poster's QR code points at your existing form \u2014 swap in the live link when you have it.")), /*#__PURE__*/React.createElement("img", {
    src: POSTER_RECRUIT,
    alt: "Recruitments open now",
    style: {
      width: '100%',
      display: 'block',
      border: '1px solid var(--jb-gold-line)'
    }
  }))));
}
Object.assign(window, {
  HomePage,
  GalleryPage,
  TeamPage,
  AboutPage,
  JoinPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/jbmedia/pages.jsx", error: String((e && e.message) || e) }); }

__ds_ns.JBButton = __ds_scope.JBButton;

__ds_ns.JBPersonCard = __ds_scope.JBPersonCard;

__ds_ns.JBPosterCard = __ds_scope.JBPosterCard;

__ds_ns.JBSectionTitle = __ds_scope.JBSectionTitle;

__ds_ns.JBStat = __ds_scope.JBStat;

})();
