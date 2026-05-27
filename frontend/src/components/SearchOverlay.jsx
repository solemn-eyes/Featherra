import React, { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight, Sparkles } from 'lucide-react'

export default function SearchOverlay({ isOpen, onClose, services = [], products = [], onSelectService, onSelectProduct }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ services: [], products: [] })
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
      document.body.style.overflow = 'hidden'
    } else {
      setQuery('')
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults({ services: [], products: [] })
      return
    }

    const term = query.toLowerCase()
    const filteredServices = services.filter(
      s => s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term) || s.details.toLowerCase().includes(term)
    )
    const filteredProducts = products.filter(
      p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
    )

    setResults({ services: filteredServices, products: filteredProducts })
  }, [query, services, products])

  if (!isOpen) return null

  return (
    <div style={overlayStyle} className="anim-fade-in">
      <button onClick={onClose} style={closeButtonStyle} aria-label="Close search">
        <X size={28} />
      </button>

      <div style={searchContainerStyle}>
        <div style={searchFieldWrapperStyle}>
          <Search size={24} style={searchIconStyle} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Featherra (e.g. organic eggs, starter chicks, farm tours)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={resultsContainerStyle}>
          {query.trim() === '' ? (
            <div style={suggestionsStyle}>
              <p style={suggestionTitleStyle}>Popular Searches</p>
              <div style={suggestionTagsStyle}>
                {['Eggs', 'Broiler Chicken', 'Starter Chicks', 'Farm Tours', 'Workshops'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={suggestionTagStyle}
                  >
                    <Sparkles size={12} style={{ color: 'var(--accent-gold)' }} />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.services.length === 0 && results.products.length === 0 ? (
            <div style={noResultsStyle}>
              <p>No results found for "{query}"</p>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Try searching for generic terms like "eggs", "meat", or "workshops".</span>
            </div>
          ) : (
            <div style={resultsGridStyle}>
              {results.services.length > 0 && (
                <div>
                  <h3 style={resultsHeaderStyle}>Farm Services</h3>
                  <div style={listStyle}>
                    {results.services.map(service => (
                      <div
                        key={service.id}
                        onClick={() => {
                          onSelectService(service)
                          onClose()
                        }}
                        style={resultCardStyle}
                      >
                        <div>
                          <h4 style={cardTitleStyle}>{service.title}</h4>
                          <p style={cardDescStyle}>{service.description}</p>
                        </div>
                        <ArrowRight size={16} style={arrowStyle} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.products.length > 0 && (
                <div>
                  <h3 style={resultsHeaderStyle}>Available Organic Products</h3>
                  <div style={listStyle}>
                    {results.products.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product)
                          onClose()
                        }}
                        style={resultCardStyle}
                      >
                        <div>
                          <h4 style={cardTitleStyle}>{product.name}</h4>
                          <p style={cardDescStyle}>
                            {product.description.slice(0, 80)}... 
                            <strong style={{ color: 'var(--accent-gold)', marginLeft: '8px' }}>
                              ${product.price} / {product.unit}
                            </strong>
                          </p>
                        </div>
                        <ArrowRight size={16} style={arrowStyle} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(10, 15, 12, 0.95)',
  backdropFilter: 'blur(20px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '8rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
}

const closeButtonStyle = {
  position: 'absolute',
  top: '2.5rem',
  right: '2.5rem',
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  transition: 'all 0.3s ease',
}

const searchContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
}

const searchFieldWrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '2px solid rgba(235, 208, 102, 0.3)',
  paddingBottom: '0.8rem',
  transition: 'border-color 0.3s ease',
}

const searchIconStyle = {
  position: 'absolute',
  left: 4,
  color: 'var(--accent-gold)',
}

const searchInputStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  paddingLeft: '2.5rem',
  fontSize: '1.5rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  outline: 'none',
}

const resultsContainerStyle = {
  maxHeight: '60vh',
  overflowY: 'auto',
  paddingRight: '10px',
}

const suggestionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  animation: 'fadeInUp 0.6s ease',
}

const suggestionTitleStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 700,
}

const suggestionTagsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
}

const suggestionTagStyle = {
  background: 'rgba(235, 208, 102, 0.04)',
  border: '1px solid rgba(235, 208, 102, 0.12)',
  color: 'var(--text-secondary)',
  padding: '0.5rem 1.2rem',
  borderRadius: '50px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  transition: 'all 0.3s ease',
}

const noResultsStyle = {
  textAlign: 'center',
  padding: '3rem 0',
  color: 'var(--text-secondary)',
}

const resultsGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
}

const resultsHeaderStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  color: 'var(--accent-gold)',
  marginBottom: '1rem',
  borderLeft: '3px solid var(--accent-orange)',
  paddingLeft: '10px',
}

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
}

const resultCardStyle = {
  background: 'rgba(19, 26, 21, 0.4)',
  border: '1px solid rgba(235, 208, 102, 0.05)',
  padding: '1.2rem',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  transition: 'all 0.3s ease',
}

const cardTitleStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.15rem',
  color: 'var(--text-primary)',
  marginBottom: '0.3rem',
}

const cardDescStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
}

const arrowStyle = {
  color: 'var(--accent-gold)',
  opacity: 0.5,
  transition: 'all 0.3s ease',
}
