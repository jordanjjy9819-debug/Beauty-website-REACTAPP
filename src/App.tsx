import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

// Carousel images (My Work)
import Biab from './assets/Biab.jpg';
import Eyebrows from './assets/Eyebrows.jpg';
import FloralNails from './assets/FloralNails.jpg';
import Gels from './assets/Gels.jpg';
import GoldenNails from './assets/GoldenNails.jpg';
import GothNails from './assets/GothNails.jpg';
import RedNails from './assets/RedNails.jpg';
import TropicalNails from './assets/TropicalNails.jpg';

// Hero image
import GlamPhoto from './assets/GlamPhoto.jpg';

import './App.css';

const BOOKING_URL = "https://www.fresha.com/a/nails-by-daria-fulwood-preston-uk-333-garstang-road-kk8f3qn6/booking?employeeId=4870159&cartId=473a9b0e-ac4b-422c-af7f-68dce5512930";

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (inputMessage.trim() === "") return;
    window.open(`https://wa.me/447845029440?text=${encodeURIComponent(inputMessage)}`, '_blank');
    setWhatsappModalOpen(false);
    setInputMessage("");
  };

  return (
    <div className="homepage">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <button className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </button>

          <ul className="nav-links desktop">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/my-story">About</Link></li>
          </ul>

          <Link to="/" className="logo">Lou'z Beauty</Link>

          <div className="nav-cta desktop">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-btn">Book Now</a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/my-story" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mobile-book-btn" onClick={() => setMobileMenuOpen(false)}>Book Now</a>
          </div>
        )}
      </nav>

      <Outlet />

      <button className="whatsapp-float" onClick={() => setWhatsappModalOpen(true)} title="Chat on WhatsApp">💬</button>

      {whatsappModalOpen && (
        <div className="whatsapp-modal-overlay" onClick={() => setWhatsappModalOpen(false)}>
          <div className="whatsapp-modal" onClick={e => e.stopPropagation()}>
            <div className="whatsapp-modal-header">
              <div className="whatsapp-header-info">
                <div className="whatsapp-avatar">💅</div>
                <div>
                  <h3>Lou'z Beauty</h3>
                  <p>Tap to chat on WhatsApp</p>
                </div>
              </div>
              <button className="close-modal" onClick={() => setWhatsappModalOpen(false)}>✕</button>
            </div>

            <div className="whatsapp-chat-body">
              <p className="chat-hint">Write your message below</p>
            </div>

            <div className="whatsapp-chat-footer">
              <input 
                type="text" 
                placeholder="Type your message here..." 
                className="whatsapp-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="whatsapp-send-btn" onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== HOME PAGE - CAROUSEL FIXED ==================== */
function HomeContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="hero">
        <div className="hero-background" ref={heroRef} style={{ backgroundImage: `linear-gradient(rgba(60,58,54,0.35), rgba(60,58,54,0.45)), url(${GlamPhoto})` }} />
        <div className="hero-content">
          <span className="hero-subtitle">WELCOME TO LOU'Z BEAUTY</span>
          <h1>Elevate Your Beauty</h1>
          <p>Premium BIAB nails, lash tint, and brow artistry tailored just for you.</p>
          <div className="hero-buttons">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-button primary">Book Now</a>
            <Link to="/services" className="cta-button secondary">View Services</Link>
          </div>
        </div>
      </header>

      <section className="featured">
        <div className="section-header">
          <h2>My Work</h2>
          <div className="divider"></div>
        </div>

        <div className="marquee">
          <div className="marquee-inner">
            {/* 8 original images */}
            <img src={Biab} alt="BIAB Nails" />
            <img src={Gels} alt="Gel Nails" />
            <img src={GoldenNails} alt="Golden Nails" />
            <img src={RedNails} alt="Red Nails" />
            <img src={FloralNails} alt="Floral Nails" />
            <img src={GothNails} alt="Goth Nails" />
            <img src={Eyebrows} alt="Brows & Lashes" />
            <img src={TropicalNails} alt="Tropical Nails" />

            {/* Duplicate set - this is what creates the seamless infinite loop */}
            <img src={Biab} alt="BIAB Nails" />
            <img src={Gels} alt="Gel Nails" />
            <img src={GoldenNails} alt="Golden Nails" />
            <img src={RedNails} alt="Red Nails" />
            <img src={FloralNails} alt="Floral Nails" />
            <img src={GothNails} alt="Goth Nails" />
            <img src={Eyebrows} alt="Brows & Lashes" />
            <img src={TropicalNails} alt="Tropical Nails" />
          </div>
        </div>
      </section>
    </>
  );
}

/* Services page (unchanged) */
function ServicesContent() {
  return (
    <div className="service-page-full">
      <div className="section-header">
        <h2>Our Services</h2>
        <div className="divider"></div>
        <p className="service-intro">Luxury treatments crafted with care for you</p>
      </div>

      <div className="services-container">
        <div className="service-category-card"><h3>Pedi</h3><ul className="service-list"><li>Lux pedi with polish</li><li>Lux pedi no polish</li><li>Pedi with polish</li><li>Pedi no polish</li><li>Add-on gel removal</li></ul></div>
        <div className="service-category-card"><h3>Lash &amp; Brow</h3><ul className="service-list"><li>Upper lip wax</li><li>Lip and chin wax</li><li>Full brow reshape</li><li>Brow wax</li><li>Brow tint</li><li>Brow tint and wax</li><li>Lash tint, brow and wax</li><li>Patch test</li><li>Lash tint</li></ul></div>
        <div className="service-category-card"><h3>BIAB Nails</h3><ul className="service-list"><li>BIAB extension</li><li>BIAB plain (no colour)</li><li>BIAB with gel polish</li><li>BIAB infil with gel polish</li><li>BIAB infil plain (no colour)</li><li>BIAB removal and fresh set</li><li>BIAB removal</li><li>BIAB single nail repair</li></ul></div>
        <div className="service-category-card"><h3>Gel Polish &amp; Toes</h3><ul className="service-list"><li>Gel polish removal &amp; reapply fingers</li><li>Gel polish removal &amp; reapply toes</li><li>Gel polish fingers only</li><li>Gel polish toes only</li><li>Mani with gel polish or normal polish</li><li>Gel nail repair (single nail)</li><li>Add-on soak off (must be booked with existing service)</li><li>Gel polish removal</li></ul></div>
        <div className="service-category-card"><h3>Nail Art</h3><ul className="service-list"><li>Detailed nail art</li><li>Medium nail art</li><li>Basic nail art</li><li>French / Ombré</li></ul></div>
        <div className="service-category-card"><h3>Manicure</h3><ul className="service-list"><li>Shape and paint with normal polish</li><li>Mani with gel polish or normal polish</li><li>Mani with no polish</li><li>Shape and cuticle care</li></ul></div>
      </div>

      <div className="service-cta-bottom">
        <p>Ready to feel fabulous?</p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-now-btn big">Book Your Appointment Now</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeContent />} />
          <Route path="services" element={<ServicesContent />} />
          <Route path="my-story" element={<div className="service-page"><h1>About</h1><p>Infromation to go here.</p><Link to="/" className="back-home">← Back to Home</Link></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;