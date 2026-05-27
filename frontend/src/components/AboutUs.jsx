import React from 'react'
import { Sparkles, Sprout, Heart, UserCheck } from 'lucide-react'

export default function AboutUs() {
  const team = [
    {
      name: 'Jerome Carter',
      role: 'Founder & Farm Manager',
      bio: 'Lifelong farmer dedicated to rotational pasture systems and regenerative agriculture models.',
      icon: 'Sprout'
    },
    {
      name: 'Clara Ross',
      role: 'Lead Breeder & Hatchery Specialist',
      bio: 'Expert in heritage breed genetics and organic poultry disease prevention protocols.',
      icon: 'UserCheck'
    }
  ]

  return (
    <section id="about-section" style={sectionStyle}>
      {/* Background radial highlight */}
      <div style={warmBackgroundLight}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={layoutGridStyle}>
          
          {/* Left Column: Our Story */}
          <div style={storyCol} className="anim-fade-in-up">
            <span style={sectionTagStyle}>OUR STORY</span>
            <h2 style={titleStyle}>Cozy, Sustainable Poultry Farming</h2>
            <div style={barStyle}></div>
            
            <p style={paragraphStyle}>
              Featherra began as a family homestead with a simple belief: healthy, stress-free birds forage the most nutritious food. By raising our chickens in open pasture meadows where they can roam, dust-bathe, and seek fresh green forage daily, we restore the natural balance of soil and avian life.
            </p>
            <p style={paragraphStyle}>
              Today, our small farm utilizes regenerative pasture rotation. Our mobile chicken tractors move across our clover fields daily, nourishing the soil and allowing the grass to rebound naturally. This symbiotic process creates the signature bright-orange, creamy yolks our eggs are famous for.
            </p>

            <div style={valuesRow}>
              <div style={valueItem}>
                <div style={valueIconBox}>
                  <Sprout size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <span>Regenerative Agriculture</span>
              </div>
              <div style={valueItem}>
                <div style={valueIconBox}>
                  <Heart size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <span>Animal Welfare Priority</span>
              </div>
            </div>
          </div>

          {/* Right Column: Meet the Team */}
          <div style={teamCol} className="anim-fade-in-up">
            <span style={sectionTagStyle}>FARM TEAM</span>
            <h2 style={titleStyle}>Meet the Guardians</h2>
            <div style={barStyle}></div>

            <div style={teamCardsList}>
              {team.map((member, idx) => (
                <div key={idx} className="glass-card" style={teamCardStyle}>
                  <div style={teamIconWrapper}>
                    {member.icon === 'Sprout' ? (
                      <Sprout size={22} style={{ color: 'var(--accent-gold)' }} />
                    ) : (
                      <UserCheck size={22} style={{ color: 'var(--accent-gold)' }} />
                    )}
                  </div>
                  <div>
                    <h3 style={memberNameStyle}>{member.name}</h3>
                    <span style={memberRoleStyle}>{member.role}</span>
                    <p style={memberBioStyle}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* Styled inline rules */
const sectionStyle = {
  padding: '100px 0',
  position: 'relative',
  background: 'var(--bg-primary)',
  overflow: 'hidden',
}

const warmBackgroundLight = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(235, 208, 102, 0.04) 0%, transparent 70%)',
  top: '30%',
  right: '-10%',
  zIndex: 1,
  animation: 'pulseGlow 7s ease-in-out infinite',
}

const layoutGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4rem',
}

const storyCol = {
  flex: '1 1 450px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const teamCol = {
  flex: '1 1 450px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const sectionTagStyle = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: 'var(--accent-orange)',
}

const titleStyle = {
  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
}

const barStyle = {
  height: '3px',
  width: '60px',
  background: 'var(--accent-gold)',
  borderRadius: '10px',
  marginBottom: '0.5rem',
}

const paragraphStyle = {
  fontSize: '1.02rem',
  lineHeight: 1.65,
  color: 'var(--text-secondary)',
}

const valuesRow = {
  display: 'flex',
  gap: '1.8rem',
  marginTop: '1.5rem',
  flexWrap: 'wrap',
}

const valueItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.94rem',
  color: 'var(--text-primary)',
  fontWeight: 600,
}

const valueIconBox = {
  width: '36px',
  height: '36px',
  borderRadius: '50px',
  background: 'rgba(235, 208, 102, 0.04)',
  border: '1px solid rgba(235, 208, 102, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const teamCardsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '1.5rem',
}

const teamCardStyle = {
  padding: '2rem',
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'flex-start',
}

const teamIconWrapper = {
  width: '46px',
  height: '46px',
  borderRadius: '12px',
  background: 'rgba(235, 208, 102, 0.04)',
  border: '1px solid rgba(235, 208, 102, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const memberNameStyle = {
  fontSize: '1.35rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '0.2rem',
}

const memberRoleStyle = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  color: 'var(--accent-orange)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.6rem',
}

const memberBioStyle = {
  fontSize: '0.92rem',
  lineHeight: 1.5,
  color: 'var(--text-secondary)',
}
