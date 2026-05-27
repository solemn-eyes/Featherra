import React from 'react'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'

export default function News() {
  const posts = [
    {
      title: 'Spring Pasture Rotation Calendar Online',
      date: 'May 20, 2026',
      author: 'Jerome Carter',
      desc: 'Our mobile coop tractors are rolling! Check out our dynamic pasture grazing schedules designed to maximize soil health and insect foraging.',
      category: 'Pasture Management'
    },
    {
      title: 'Decoding Egg Shells: Why Colorful Eggs Rule',
      date: 'May 12, 2026',
      author: 'Clara Ross',
      desc: 'From olive green to pastel sky blues, explore the fascinating genetics behind the beautiful variety of eggs in our Featherra heritage boxes.',
      category: 'Poultry Science'
    },
    {
      title: 'Hatchery Core Upgrades: New Solar Incubators',
      date: 'May 04, 2026',
      author: 'Jerome Carter',
      desc: 'We are thrilled to announce that our custom hatchery incubators are now running 100% on clean solar panels. Safe, sustainable chick starts!',
      category: 'Farm Innovation'
    }
  ]

  return (
    <section id="news-section" style={sectionStyle}>
      <div className="container">
        
        {/* Section Header */}
        <div style={headerWrapper}>
          <span style={sectionTagStyle}>FARM NEWS</span>
          <h2 style={sectionTitleStyle}>Featherra Agricultural Blog</h2>
          <div style={barStyle}></div>
          <p style={sectionSubtitleStyle}>
            Keep up with clean energy upgrades, seasonal pasture plans, and expert homesteading tips from our core breeders and growers.
          </p>
        </div>

        {/* Blog Grid */}
        <div style={gridStyle}>
          {posts.map((post, idx) => (
            <article key={idx} className="glass-card" style={cardStyle}>
              {/* Blog visual top */}
              <div style={topFrameStyle}>
                <BookOpen size={24} style={{ color: 'rgba(235, 208, 102, 0.15)', transform: 'scale(1.5)' }} />
                <span style={categoryBadgeStyle}>{post.category}</span>
              </div>

              {/* Blog details */}
              <div style={infoWrapper}>
                <div style={metaRow}>
                  <div style={metaItem}>
                    <Calendar size={12} style={{ color: 'var(--accent-gold)' }} />
                    <span>{post.date}</span>
                  </div>
                  <div style={metaItem}>
                    <User size={12} style={{ color: 'var(--accent-gold)' }} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 style={postTitleStyle}>{post.title}</h3>
                <p style={postDescStyle}>{post.desc}</p>

                <a href="#read" style={ctaLinkStyle} onClick={e => e.preventDefault()}>
                  Read Article <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

/* Styled inline rules */
const sectionStyle = {
  padding: '100px 0',
  position: 'relative',
  background: 'var(--bg-secondary)',
  borderTop: '1px solid rgba(235, 208, 102, 0.04)',
  borderBottom: '1px solid rgba(235, 208, 102, 0.04)',
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
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2.5rem',
}

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
}

const topFrameStyle = {
  height: '140px',
  background: 'radial-gradient(circle at center, rgba(217, 125, 65, 0.1) 0%, rgba(14, 20, 16, 0.65) 100%)',
  borderBottom: '1px solid rgba(235, 208, 102, 0.08)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const categoryBadgeStyle = {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  background: 'rgba(217, 125, 65, 0.15)',
  border: '1px solid rgba(217, 125, 65, 0.3)',
  color: 'var(--accent-orange)',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '3px 10px',
  borderRadius: '4px',
  textTransform: 'uppercase',
}

const infoWrapper = {
  padding: '2rem 1.8rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

const metaRow = {
  display: 'flex',
  gap: '1.5rem',
  marginBottom: '1rem',
}

const metaItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  fontWeight: 600,
}

const postTitleStyle = {
  fontSize: '1.35rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  lineHeight: 1.25,
  marginBottom: '0.8rem',
}

const postDescStyle = {
  fontSize: '0.92rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
  marginBottom: '1.8rem',
}

const ctaLinkStyle = {
  marginTop: 'auto',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: 'var(--accent-gold)',
  textDecoration: 'none',
  width: 'fit-content',
  transition: 'var(--transition-smooth)',
}
