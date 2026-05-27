import React, { useEffect } from 'react'
import { X, Check, ShieldCheck, HeartHandshake, Compass } from 'lucide-react'

export default function ServiceModal({ service, onClose, onBookFarm, onExploreProducts }) {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [service])

  if (!service) return null

  // Determine actions based on service title
  const isExperience = service.title.toLowerCase().includes('workshops') || service.title.toLowerCase().includes('tours') || service.title.toLowerCase().includes('experienc')
  const isChicks = service.title.toLowerCase().includes('chicks') || service.title.toLowerCase().includes('hatchery')
  
  const handleAction = () => {
    onClose()
    if (isExperience) {
      onBookFarm('sustainable_poultry')
    } else if (isChicks) {
      // Scroll to contact form
      const element = document.getElementById('contact-section')
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Scroll to products catalog
      onExploreProducts()
    }
  }

  // Get action button label
  const getActionLabel = () => {
    if (isExperience) return 'Book a Farm Visit'
    if (isChicks) return 'Inquire for Starter Chicks'
    return 'Browse Catalog Products'
  }

  return (
    <div style={modalOverlayStyle} className="anim-fade-in">
      <div style={modalContentStyle} className="anim-fade-in-up">
        <button onClick={onClose} style={closeButtonStyle} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={flexLayout}>
          {/* Visual Left side with glowing indicators */}
          <div style={visualContainerStyle}>
            <div style={glowingSphereStyle}></div>
            <div style={badgeContainerStyle}>
              <span className="badge-organic">Certified Sustainable</span>
            </div>
            
            <div style={bulletListContainer}>
              <h4 style={bulletTitleStyle}>Featherra Assurances</h4>
              <div style={bulletItemStyle}>
                <ShieldCheck size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>100% Free Range foraging</span>
              </div>
              <div style={bulletItemStyle}>
                <HeartHandshake size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Zero chemical residues</span>
              </div>
              <div style={bulletItemStyle}>
                <Compass size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>Locally bred and raised</span>
              </div>
            </div>
          </div>

          {/* Details Content Right side */}
          <div style={textDetailsStyle}>
            <h2 style={titleStyle}>{service.title}</h2>
            
            <div style={dividerStyle}></div>

            <p style={introTextStyle}>{service.description}</p>
            
            <div style={mainContentWrapper}>
              <h4 style={subHeaderStyle}>The Ethical Difference</h4>
              <p style={detailsTextStyle}>{service.details}</p>
            </div>

            <div style={actionWrapperStyle}>
              <button onClick={handleAction} className="btn btn-primary">
                {getActionLabel()}
              </button>
              <button onClick={onClose} className="btn btn-secondary">
                Back to Farm Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(10, 15, 12, 0.9)',
  backdropFilter: 'blur(20px)',
  zIndex: 1001,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
}

const modalContentStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid rgba(235, 208, 102, 0.1)',
  borderRadius: '24px',
  boxShadow: 'var(--gold-glow), 0 20px 50px rgba(0,0,0,0.5)',
  width: '100%',
  maxWidth: '920px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  padding: '3rem 2.5rem',
}

const closeButtonStyle = {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(235, 208, 102, 0.08)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const flexLayout = {
  display: 'flex',
  gap: '3rem',
  flexWrap: 'wrap',
}

const visualContainerStyle = {
  flex: '1 1 300px',
  background: 'radial-gradient(circle at center, rgba(42, 87, 61, 0.15) 0%, rgba(14, 20, 16, 0.6) 100%)',
  border: '1px solid rgba(68, 143, 100, 0.12)',
  borderRadius: '16px',
  padding: '2.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '350px',
  position: 'relative',
  overflow: 'hidden',
}

const glowingSphereStyle = {
  position: 'absolute',
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(235, 208, 102, 0.08) 0%, transparent 70%)',
  top: '-40px',
  right: '-40px',
  animation: 'pulseGlow 5s ease-in-out infinite',
}

const badgeContainerStyle = {
  alignSelf: 'flex-start',
  zIndex: 1,
}

const bulletListContainer = {
  marginTop: '3rem',
  zIndex: 1,
}

const bulletTitleStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '1rem',
  fontWeight: 700,
}

const bulletItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '0.8rem',
  fontSize: '0.95rem',
  color: 'var(--text-secondary)',
}

const textDetailsStyle = {
  flex: '1 1 450px',
  display: 'flex',
  flexDirection: 'column',
}

const titleStyle = {
  fontSize: '2.2rem',
  color: 'var(--text-primary)',
  marginBottom: '0.5rem',
}

const dividerStyle = {
  height: '3px',
  width: '60px',
  background: 'var(--accent-orange)',
  borderRadius: '10px',
  marginBottom: '1.5rem',
}

const introTextStyle = {
  fontSize: '1.1rem',
  color: 'var(--text-primary)',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
  fontWeight: 500,
}

const mainContentWrapper = {
  background: 'rgba(14, 20, 16, 0.4)',
  border: '1px solid rgba(235, 208, 102, 0.03)',
  padding: '1.5rem',
  borderRadius: '12px',
  marginBottom: '2rem',
}

const subHeaderStyle = {
  fontSize: '1rem',
  color: 'var(--accent-gold)',
  marginBottom: '0.8rem',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  letterSpacing: '0.04em',
}

const detailsTextStyle = {
  fontSize: '0.98rem',
  lineHeight: 1.7,
}

const actionWrapperStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: 'auto',
  flexWrap: 'wrap',
}
