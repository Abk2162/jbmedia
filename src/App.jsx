import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import StaggeredMenu from "@/components/StaggeredMenu.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import SplashCursor from "@/components/SplashCursor.jsx";
import SmoothScroll from "@/components/SmoothScroll.jsx";
import { HomePage } from "@/pages/HomePage.jsx";
import { GalleryPage } from "@/pages/GalleryPage.jsx";
import { TeamPage } from "@/pages/TeamPage.jsx";
import { AboutPage } from "@/pages/AboutPage.jsx";
import { JoinPage } from "@/pages/JoinPage.jsx";

// Helper to reset window scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const MENU_ITEMS = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Gallery", ariaLabel: "Explore gallery archive", link: "/gallery" },
  { label: "Team", ariaLabel: "Meet the team", link: "/team" },
  { label: "About Us", ariaLabel: "Learn about JB Media", link: "/about" },
  { label: "Join Us", ariaLabel: "Join JB Media", link: "/join" },
];

const SOCIAL_ITEMS = [
  { label: "Instagram", link: "https://www.instagram.com/media_jbiet/" },
  { label: "YouTube", link: "https://youtube.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
  { label: "X", link: "https://x.com" },
];

export default function App() {
  return (
    <Router>
      <SmoothScroll duration={1.2} wheelMultiplier={0.95} touchMultiplier={1.4}>
        <ScrollToTop />
        <SplashCursor />
        <div className="flex flex-col min-h-screen bg-dark-base text-foreground antialiased selection:bg-gold-500 selection:text-dark-base">
        <StaggeredMenu
          position="right"
          items={MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials={true}
          displayItemNumbering={true}
          logoUrl="/jb-media-logo.png"
          colors={["#1F1A16", "#3A2A16", "#70330D", "#D4A22E"]}
          accentColor="#F5C542"
          menuButtonColor="#F7F1E4"
          openMenuButtonColor="#F5C542"
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </SmoothScroll>
    </Router>
  );
}
