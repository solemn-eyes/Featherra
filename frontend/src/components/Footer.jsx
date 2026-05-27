import React from 'react'
import { Feather, Instagram, Facebook, Youtube, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const handleScrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(`${sectionId}-section`)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <footer style={footerStyle}>
      <div className="container" style={footerContainer}>
        {/* Top Segment */}
        <div style={topGrid}>
          {/* Logo & Vibe */}
          <div style={brandCol}>
            <div style={logoStyle}>
              <div style={logoIconBg}>
                <Feather size={16} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <span style={logoTextStyle}>Featherra</span>
            </div>
            <p style={brandDesc}>
              Committed to ecological poultry farming, ethical bird welfare, and providing our local community with fresh, nutritious harvest daily.
            </p>
            <div style={socialRow}>
              {[
                { icon: <Instagram size={16} />, label: 'Instagram' },
                { icon: <Facebook size={16} />, label: 'Facebook' },
                { icon: <Youtube size={16} />, label: 'YouTube' }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={`#${soc.label}`}
                  style={socialIconStyle}
                  aria-label={soc.label}
                  onClick={(e) => e.preventDefault()}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={linkCol}>
            <h4 style={headerStyle}>Navigation</h4>
            <div style={linkList}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'products', label: 'Organic Products' },
                { id: 'news', label: 'Farm News' },
                { id: 'contact', label: 'Contact Us' }
              ].map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  style={linkStyle}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <div style={linkCol}>
            <h4 style={headerStyle}>Visiting Hours</h4>
            <div style={hoursList}>
              <div style={hourItem}>
                <span style={dayStyle}>Monday - Friday</span>
                <span style={timeStyle}>By Appointment Only</span>
              </div>
              <div style={hourItem}>
                <span style={dayStyle}>Saturday</span>
                <span style={timeStyle}>9:00 AM - 4:00 PM</span>
              </div>
              <div style={hourItem}>
                <span style={dayStyle}>Sunday</span>
                <span style={{ ...timeStyle, color: 'var(--accent-orange)' }}>Closed</span>
              </div>
            </div>
          </div>

          {/* Certifications Badge */}
          <div style={certCol}>
            <h4 style={headerStyle}>Certifications</h4>
            <div style={badgeContainer}>
              <span className="badge-organic">100% Pasture Raised</span>
              <span className="badge-organic" style={{ borderColor: 'rgba(235,208,102,0.25)', color: 'var(--accent-gold)', background: 'rgba(235,208,102,0.02)' }}>
                Sustainably Grown
              </span>
              <span className="badge-organic" style={{ borderColor: 'rgba(217, 125, 65, 0.25)', color: 'var(--accent-orange)', background: 'rgba(217,125,65,0.02)' }}>
                Certified GMO Free
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Segment */}
        <div style={bottomRow}>
          <p style={copyStyle}>
            &copy; {new Date().getFullYear()} Featherra Farm. All rights reserved. Made with <Heart size={10} style={{ color: 'var(--accent-orange)', display: 'inline', fill: 'var(--accent-orange)' }} /> for sustainable ecosystems.
          </p>

          <div style={legalLinks}>
            <a href="#privacy" style={legalLink} onClick={e => e.preventDefault()}>Privacy Policy</a>
            <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
            <a href="#terms" style={legalLink} onClick={e => e.preventDefault()}>Terms of Service</a>
            <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
            <a href="#top" onClick={handleScrollTop} style={scrollTopStyle}>
              Back to Top <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* Styled inline rules */
const footerStyle = {
  background: 'hsl(140, 18%, 6%)',
  borderTop: '1px solid rgba(235, 208, 102, 0.08)',
  padding: '80px 0 40px 0',
  position: 'relative',
}

const footerContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
}

const topGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '3rem',
}

const brandCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  gridColumn: 'span 2', // Allows description to breathe, standard in responsive frameworks
}

// Emulate media adjustments or flex grid behavior nicely
const brandDesc = {
  fontSize: '0.94rem',
  lineHeight: 1.6,
  color: 'var(--text-secondary)',
  maxWidth: '380px',
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
}

const logoIconBg = {
  width: '28px',
  height: '28px',
  borderRadius: '50px',
  background: 'rgba(235, 208, 102, 0.06)',
  border: '1px solid rgba(235, 208, 102, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const logoTextStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
}

const socialRow = {
  display: 'flex',
  gap: '0.8rem',
  marginTop: '0.5rem',
}

const socialIconStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50px',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'var(--transition-smooth)',
  textDecoration: 'none',
}

const linkCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}

const certCol = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}

const headerStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-primary)',
  borderBottom: '2px solid rgba(235, 208, 102, 0.08)',
  paddingBottom: '0.5rem',
  width: 'fit-content',
}

const linkList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}

const linkStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  transition: 'var(--transition-smooth)',
  width: 'fit-content',
}

const hoursList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const hourItem = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}

const dayStyle = {
  fontSize: '0.82rem',
  color: 'var(--text-muted)',
  fontWeight: 600,
}

const timeStyle = {
  fontSize: '0.94rem',
  color: 'var(--text-primary)',
}

const badgeContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  alignItems: 'flex-start',
}

const bottomRow = {
  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
  paddingTop: '2.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1.5rem',
}

const copyStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
}

const legalLinks = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'wrap',
}

const legalLink = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  textDecoration: 'none',
  transition: 'var(--transition-smooth)',
}

const scrollTopStyle = {
  fontSize: '0.85rem',
  color: 'var(--accent-gold)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontWeight: 600,
  transition: 'var(--transition-smooth)',
}
