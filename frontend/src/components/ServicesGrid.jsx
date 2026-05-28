import React from 'react'
import * as Icons from 'lucide-react'
import { getAssetImage } from '../images'

// Dynamic icon resolver helper
const IconResolver = ({ name, size = 32, ...props }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle
  return <IconComponent size={size} {...props} />
}

export default function ServicesGrid({ services = [], onSelectService, loading }) {
  return (
    <section id="services-section" style={sectionStyle}>
      <div className="container">
        {/* Section Header */}
        <div style={headerWrapper}>
          <span style={sectionTagStyle}>WHAT WE DO</span>
          <h2 style={sectionTitleStyle}>Featherra Premium Farm Offerings</h2>
          <div style={barStyle}></div>
          <p style={sectionSubtitleStyle}>
            Discover our dedication to ecological poultry farming. We maintain strict sustainable standards, ensuring healthy animals and superior quality.
          </p>
        </div>

        {loading ? (
          <div style={skeletonGridStyle}>
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="glass-card" style={skeletonCardStyle}>
                <div style={skeletonIconStyle}></div>
                <div style={skeletonTitleStyle}></div>
                <div style={skeletonDescStyle}></div>
              </div>
            ))}
          </div>
        ) : (
          <div style={gridStyle}>
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-card"
                style={cardStyle}
                onClick={() => onSelectService(service)}
              >
                <div style={imageWrapStyle}>
                  <img
                    src={getAssetImage(service.image_name)}
                    alt={service.title}
                    style={cardImageStyle}
                    loading="lazy"
                  />
                  <div style={imageOverlayStyle} />
                  <div style={iconBadgeStyle}>
                    <IconResolver name={service.icon} size={22} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                </div>

                <div style={cardBodyStyle}>
                <h3 style={cardTitleStyle}>{service.title}</h3>
                <p style={cardDescStyle}>{service.description}</p>

                {/* Call To Action link */}
                <div style={cardCtaStyle}>
                  <span>{service.cta_text || 'Learn More'}</span>
                  <Icons.ArrowRight size={16} style={arrowStyle} />
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* Styled inline rules */
const sectionStyle = {
  padding: '100px 0',
  position: 'relative',
  background: 'var(--bg-primary)',
}

const headerWrapper = {
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto 4.5rem auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
}

const sectionTagStyle = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: 'var(--accent-orange)',
  textTransform: 'uppercase',
}

const sectionTitleStyle = {
  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  lineHeight: 1.15,
}

const barStyle = {
  height: '3px',
  width: '60px',
  background: 'var(--accent-gold)',
  borderRadius: '10px',
  margin: '0.3rem 0',
}

const sectionSubtitleStyle = {
  fontSize: '1.02rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
}

const cardStyle = {
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  overflow: 'hidden',
}

const imageWrapStyle = {
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
}

const cardImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.5s ease',
}

const imageOverlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(14, 20, 16, 0.85) 0%, rgba(14, 20, 16, 0.1) 55%)',
  pointerEvents: 'none',
}

const iconBadgeStyle = {
  position: 'absolute',
  bottom: '1rem',
  left: '1.25rem',
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  background: 'rgba(14, 20, 16, 0.75)',
  border: '1px solid rgba(235, 208, 102, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
}

const cardBodyStyle = {
  padding: '1.75rem 2rem 2.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexGrow: 1,
}

const cardTitleStyle = {
  fontSize: '1.45rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '1rem',
}

const cardDescStyle = {
  fontSize: '0.94rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
  marginBottom: '2rem',
}

const cardCtaStyle = {
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: 'var(--accent-gold)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  transition: 'var(--transition-smooth)',
}

const arrowStyle = {
  transition: 'transform 0.3s ease',
}

/* Skeleton Loading styles */
const skeletonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
}

const skeletonCardStyle = {
  padding: '3rem 2rem',
  minHeight: '320px',
  opacity: 0.6,
}

const skeletonIconStyle = {
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.03)',
  marginBottom: '2rem',
}

const skeletonTitleStyle = {
  height: '24px',
  width: '120px',
  background: 'rgba(255,255,255,0.03)',
  borderRadius: '4px',
  marginBottom: '1rem',
}

const skeletonDescStyle = {
  height: '80px',
  width: '100%',
  background: 'rgba(255,255,255,0.02)',
  borderRadius: '4px',
}
