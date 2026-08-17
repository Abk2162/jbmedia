import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import SplashCursor from "@/components/SplashCursor.jsx";
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SplashCursor />
      <div className="flex flex-col min-h-screen bg-dark-base text-foreground antialiased selection:bg-gold-500 selection:text-dark-base">
        <Navbar />
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
    </Router>
  );
}
