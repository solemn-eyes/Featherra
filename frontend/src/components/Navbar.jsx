import React, { useState, useEffect } from 'react'
import { Search, Menu, X, Feather } from 'lucide-react'

export default function Navbar({ onSearchClick, onBookClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Simple active link tracker on scroll
      const sections = ['home', 'about', 'services', 'products', 'news', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(`${section}-section`)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(`${sectionId}-section`)
    if (element) {
      const yOffset = -80 // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <header style={isScrolled ? scrolledHeaderStyle : headerStyle}>
      <div className="container" style={navbarContainer}>
        {/* Elegant Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} style={logoStyle}>
          <div style={logoIconBg}>
            <Feather size={20} style={{ color: 'var(--accent-gold)' }} />
          </div>
          <span style={logoTextStyle}>Featherra</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={desktopNavLinks}>
          {[
            { id: 'home', label: 'HOME' },
            { id: 'about', label: 'ABOUT US' },
            { id: 'services', label: 'SERVICES' },
            { id: 'products', label: 'PRODUCTS' },
            { id: 'news', label: 'NEWS' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              style={activeSection === item.id ? activeNavLinkStyle : navLinkStyle}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side Actions */}
        <div style={actionsContainer}>
          {/* Subtle Search Icon */}
          <button onClick={onSearchClick} style={searchButtonStyle} aria-label="Search site">
            <Search size={20} />
          </button>

          {/* Core Navigation CTA */}
          <button onClick={onBookClick} className="btn btn-primary nav-cta" style={ctaStyle}>
            Visit the Farm
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            style={mobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isMobileMenuOpen && (
        <div style={mobileDrawerStyle} className="anim-fade-in">
          <nav style={mobileDrawerNav}>
            {[
              { id: 'home', label: 'HOME' },
              { id: 'about', label: 'ABOUT US' },
              { id: 'services', label: 'SERVICES' },
              { id: 'products', label: 'PRODUCTS' },
              { id: 'news', label: 'NEWS' },
              { id: 'contact', label: 'CONTACT' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                style={activeSection === item.id ? activeMobileLinkStyle : mobileLinkStyle}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                onBookClick()
              }}
              className="btn btn-primary"
              style={{ marginTop: '2rem', width: '100%' }}
            >
              Visit the Farm
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

/* Inline CSS and design details */
const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 99,
  background: 'transparent',
  borderBottom: '1px solid transparent',
  transition: 'var(--transition-smooth)',
}

const scrolledHeaderStyle = {
  ...headerStyle,
  height: '80px',
  background: 'rgba(14, 20, 16, 0.85)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(235, 208, 102, 0.08)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
}

const navbarContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  transition: 'var(--transition-smooth)',
}

const logoIconBg = {
  width: '36px',
  height: '36px',
  borderRadius: '50px',
  background: 'rgba(235, 208, 102, 0.08)',
  border: '1px solid rgba(235, 208, 102, 0.18)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const logoTextStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.45rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  letterSpacing: '0.01em',
}

const desktopNavLinks = {
  display: 'flex',
  alignItems: 'center',
  gap: '2.2rem',
}

// Media Query emulation for hiding links in JavaScript is handled in CSS if available,
// but since we are writing standard responsive HTML components:
// We add media rules in index.css, and handle hiding nicely.

const navLinkStyle = {
  textDecoration: 'none',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  transition: 'var(--transition-smooth)',
  position: 'relative',
}

const activeNavLinkStyle = {
  ...navLinkStyle,
  color: 'var(--accent-gold)',
}

const actionsContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
}

const searchButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  transition: 'var(--transition-smooth)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const ctaStyle = {
  padding: '0.65rem 1.4rem',
  fontSize: '0.85rem',
}

const mobileMenuToggle = {
  display: 'none', // Managed in CSS for responsive display, let's make it flexible
  background: 'none',
  border: 'none',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  padding: '4px',
}

const mobileDrawerStyle = {
  position: 'fixed',
  top: '80px',
  left: 0,
  right: 0,
  bottom: 0,
  background: 'var(--bg-secondary)',
  borderTop: '1px solid rgba(235, 208, 102, 0.08)',
  zIndex: 98,
  padding: '2.5rem 2rem',
  overflowY: 'auto',
}

const mobileDrawerNav = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}

const mobileLinkStyle = {
  textDecoration: 'none',
  color: 'var(--text-secondary)',
  fontSize: '1.2rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255,255,255,0.02)',
  transition: 'var(--transition-smooth)',
}

const activeMobileLinkStyle = {
  ...mobileLinkStyle,
  color: 'var(--accent-gold)',
  borderBottom: '1px solid var(--accent-gold)',
}
