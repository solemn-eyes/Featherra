import React from 'react'
import { ArrowDown, Shield, Sun, Sparkles } from 'lucide-react'

export default function Hero({ onExploreClick }) {
  return (
    <section id="home-section" style={heroContainerStyle}>
      {/* Background Graphic & Light Glows */}
      <div style={backgroundGraphicStyle}></div>
      <div style={warmGlowStyle}></div>

      <div className="container" style={contentContainerStyle}>
        <div style={textWrapperStyle} className="anim-fade-in-up">
          {/* Tagline */}
          <div style={taglineStyle}>
            <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>ESTABLISHED IN SUSTAINABILITY</span>
          </div>

          {/* Primary Warm Headline */}
          <h1 style={headlineStyle}>
            Welcome to Featherra – Your Journey to <span style={{ color: 'var(--accent-gold)' }}>Fresh & Ethical</span> Farming Begins Here
          </h1>

          {/* Secondary Subtext */}
          <p style={subheadlineStyle}>
            Discover the difference with Featherra. Committed to healthy, free-roaming poultry, organic pastures, and bringing nature's finest, most nutritious harvest to your kitchen.
          </p>

          {/* Core Call to Action */}
          <div style={actionRowStyle}>
            <button onClick={onExploreClick} className="btn btn-primary btn-orange">
              Explore Our Farm <ArrowDown size={16} />
            </button>
            <a href="#contact-section" className="btn btn-secondary">
              Contact Hatchery
            </a>
          </div>

          {/* Inline Trust Badges */}
          <div style={badgeContainerStyle}>
            <div style={badgeStyle}>
              <Sun size={16} style={{ color: 'var(--accent-gold)' }} />
              <span>100% Pasture Raised</span>
            </div>
            <div style={badgeStyle}>
              <Shield size={16} style={{ color: 'var(--accent-gold)' }} />
              <span>Certified Organic Feed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Divider */}
      <div style={dividerStyle}></div>
    </section>
  )
}

/* Styled inline rules for advanced presentation */
const heroContainerStyle = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '120px',
  paddingBottom: '80px',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, hsl(140, 18%, 6%) 0%, var(--bg-primary) 100%)',
}

const backgroundGraphicStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // High-end warm-overlay on poultry farm background representation
  backgroundImage: 'linear-gradient(to bottom, rgba(14, 20, 16, 0.8) 0%, rgba(14, 20, 16, 0.95) 100%), url("/assets/farm_sunset.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 1,
}

const warmGlowStyle = {
  position: 'absolute',
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(217, 125, 65, 0.08) 0%, transparent 70%)',
  top: '20%',
  left: '60%',
  zIndex: 2,
  animation: 'pulseGlow 8s ease-in-out infinite',
}

const contentContainerStyle = {
  position: 'relative',
  zIndex: 3,
  width: '100%',
}

const textWrapperStyle = {
  maxWidth: '780px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8rem',
}

const taglineStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'var(--text-muted)',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
}

const headlineStyle = {
  fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  lineHeight: 1.12,
  letterSpacing: '-0.02em',
}

const subheadlineStyle = {
  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
  lineHeight: 1.65,
  color: 'var(--text-secondary)',
  fontWeight: 400,
}

const actionRowStyle = {
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
  marginTop: '0.5rem',
}

const badgeContainerStyle = {
  display: 'flex',
  gap: '2rem',
  flexWrap: 'wrap',
  marginTop: '1.5rem',
  borderTop: '1px solid rgba(235, 208, 102, 0.08)',
  paddingTop: '2rem',
}

const badgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.92rem',
  color: 'var(--text-secondary)',
  fontWeight: 500,
}

const dividerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '150px',
  background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
  zIndex: 4,
}
