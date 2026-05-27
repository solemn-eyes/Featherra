import React, { useState } from 'react'
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react'

export default function ProductsCatalog({ products = [], onOrderClick, onBookClick, loading }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'eggs', label: 'Fresh Eggs' },
    { id: 'meat', label: 'Poultry Meat' },
    { id: 'chicks', label: 'Starter Chicks' },
    { id: 'experiences', label: 'Experiences' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const handleActionClick = (product) => {
    if (product.category === 'experiences') {
      onBookClick('sustainable_poultry')
    } else {
      onOrderClick(product)
    }
  }

  return (
    <section id="products-section" style={sectionStyle}>
      <div className="container">
        {/* Section Header */}
        <div style={headerWrapper}>
          <span style={sectionTagStyle}>FARM HARVEST</span>
          <h2 style={sectionTitleStyle}>Shop Featherra Organics</h2>
          <div style={barStyle}></div>
          <p style={sectionSubtitleStyle}>
            Support organic homesteading and sustainable farming. Purchase our premium pasture-raised eggs, organic meat, starter birds, and farm event tickets.
          </p>
        </div>

        {/* Filter Categories Row */}
        <div style={filterContainerStyle}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={selectedCategory === cat.id ? activeFilterStyle : filterStyle}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={skeletonGridStyle}>
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="glass-card" style={skeletonCardStyle}>
                <div style={skeletonImageStyle}></div>
                <div style={skeletonTextTitle}></div>
                <div style={skeletonTextDesc}></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={emptyStateStyle}>
            <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p>No products found in this category right now.</p>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We are currently updating our stocks, please check back shortly!</span>
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredProducts.map(product => (
              <div key={product.id} className="glass-card" style={productCardStyle}>
                {/* Image Placeholder Frame */}
                <div style={imageContainerStyle}>
                  <div style={glowingPastureGradient}></div>
                  <ShoppingBag size={24} style={shoppingBagIcon} />
                  {product.is_organic && (
                    <span style={organicBadgeStyle}>
                      <Sparkles size={10} /> 100% ORGANIC
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={infoWrapperStyle}>
                  <div style={priceRowStyle}>
                    <span style={categoryLabelStyle}>{product.category.toUpperCase()}</span>
                    <span style={priceStyle}>${product.price} <small style={unitStyle}>/ {product.unit}</small></span>
                  </div>
                  
                  <h3 style={titleStyle}>{product.name}</h3>
                  <p style={descStyle}>{product.description}</p>

                  <button
                    onClick={() => handleActionClick(product)}
                    className="btn btn-primary"
                    style={actionButtonStyle}
                  >
                    {product.category === 'experiences' ? 'Book Tour Ticket' : 'Request Order'}
                    <ArrowRight size={16} />
                  </button>
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
  background: 'var(--bg-secondary)',
  borderTop: '1px solid rgba(235, 208, 102, 0.04)',
  borderBottom: '1px solid rgba(235, 208, 102, 0.04)',
}

const headerWrapper = {
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto 3rem auto',
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

const filterContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  marginBottom: '4rem',
}

const filterStyle = {
  background: 'rgba(14, 20, 16, 0.3)',
  border: '1px solid rgba(235, 208, 102, 0.1)',
  color: 'var(--text-secondary)',
  padding: '0.65rem 1.6rem',
  borderRadius: '50px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'var(--transition-smooth)',
}

const activeFilterStyle = {
  ...filterStyle,
  background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-hover))',
  color: 'hsl(140, 25%, 5%)',
  border: 'none',
  boxShadow: 'var(--gold-glow)',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2.5rem',
}

const productCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
}

const imageContainerStyle = {
  height: '200px',
  background: 'radial-gradient(circle at center, rgba(42, 87, 61, 0.25) 0%, rgba(14, 20, 16, 0.75) 100%)',
  borderBottom: '1px solid rgba(235, 208, 102, 0.08)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}

const glowingPastureGradient = {
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: 'radial-gradient(circle, rgba(235, 208, 102, 0.03) 0%, transparent 60%)',
  animation: 'pulseGlow 10s ease-in-out infinite',
}

const shoppingBagIcon = {
  color: 'rgba(235, 208, 102, 0.15)',
  transform: 'scale(1.8)',
}

const organicBadgeStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'rgba(42, 87, 61, 0.75)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(68, 143, 100, 0.4)',
  color: '#8edc9c',
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.05em',
  padding: '4px 10px',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}

const infoWrapperStyle = {
  padding: '2rem 1.8rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

const priceRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.8rem',
}

const categoryLabelStyle = {
  fontSize: '0.75rem',
  color: 'var(--accent-orange)',
  fontWeight: 700,
  letterSpacing: '0.08em',
}

const priceStyle = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
}

const unitStyle = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  fontWeight: 500,
}

const titleStyle = {
  fontSize: '1.4rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '0.8rem',
}

const descStyle = {
  fontSize: '0.92rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
  marginBottom: '1.8rem',
}

const actionButtonStyle = {
  marginTop: 'auto',
  width: '100%',
  padding: '0.8rem 1.5rem',
  fontSize: '0.9rem',
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 1.5rem',
  color: 'var(--text-secondary)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

/* Skeletons */
const skeletonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2.5rem',
}

const skeletonCardStyle = {
  height: '420px',
  opacity: 0.6,
  overflow: 'hidden',
}

const skeletonImageStyle = {
  height: '200px',
  background: 'rgba(255,255,255,0.03)',
}

const skeletonTextTitle = {
  height: '24px',
  width: '150px',
  background: 'rgba(255,255,255,0.03)',
  borderRadius: '4px',
  margin: '2rem 1.8rem 1rem 1.8rem',
}

const skeletonTextDesc = {
  height: '60px',
  width: '80%',
  background: 'rgba(255,255,255,0.02)',
  borderRadius: '4px',
  margin: '0 1.8rem',
}
