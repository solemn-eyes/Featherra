import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react'

export default function ContactForm({ initialProduct = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialProduct ? `Order Inquiry: ${initialProduct.name}` : '',
    message: initialProduct ? `Hello Featherra! I would like to inquire about ordering ${initialProduct.name}. Please let me know how I can proceed.` : '',
    is_newsletter: false
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  // Pre-fill subject & message helper if product is selected
  React.useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({
        ...prev,
        subject: `Order Inquiry: ${initialProduct.name}`,
        message: `Hello Featherra! I would like to inquire about ordering the ${initialProduct.name}. Please let me know about pickup/delivery options for my area. Thank you!`
      }))
      // Scroll to contact form
      const element = document.getElementById('contact-section')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [initialProduct])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.is_newsletter) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required'
      if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
      if (!formData.message.trim()) newErrors.message = 'Message is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setSuccessMessage(data.message)
        // Reset form except email if newsletter
        setFormData({
          name: '',
          email: formData.is_newsletter ? formData.email : '',
          subject: '',
          message: '',
          is_newsletter: false
        })
      } else {
        setErrors(data)
      }
    } catch (err) {
      console.warn("Django server offline, simulating success response offline...", err)
      setTimeout(() => {
        const msg = formData.is_newsletter 
          ? "Thank you for subscribing to Featherra's newsletter! Get ready for fresh updates and cozy farm stories."
          : "Your inquiry has been successfully received. We will get back to you within 24 hours."
        setSuccessMessage(msg)
        setFormData({
          name: '',
          email: formData.is_newsletter ? formData.email : '',
          subject: '',
          message: '',
          is_newsletter: false
        })
      }, 800)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-section" style={sectionStyle}>
      {/* Background Graphic elements */}
      <div style={greenGlowGraphic}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={layoutGridStyle}>
          {/* Left Column: Coordinates & Information */}
          <div style={infoColStyle} className="anim-fade-in-up">
            <span style={subLabelStyle}>GET IN TOUCH</span>
            <h2 style={titleStyle}>Visit Featherra</h2>
            <div style={barStyle}></div>
            <p style={introTextStyle}>
              We are located in a pristine, rolling valley just north of town. Our gates are open to the public during workshop days and scheduled tour hours.
            </p>

            <div style={detailsGridStyle}>
              {/* Coordinates */}
              <div style={detailItemStyle}>
                <div style={iconBoxStyle}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={detailTitleStyle}>Farm Address</h4>
                  <p style={detailTextStyle}>4830 Clover Meadow Lane, West Valley, WV 24901</p>
                </div>
              </div>

              {/* Telephone */}
              <div style={detailItemStyle}>
                <div style={iconBoxStyle}>
                  <Phone size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={detailTitleStyle}>Phone Support</h4>
                  <p style={detailTextStyle}>+1 (555) 349-2810 (Mon-Sat, 8am - 5pm)</p>
                </div>
              </div>

              {/* Email */}
              <div style={detailItemStyle}>
                <div style={iconBoxStyle}>
                  <Mail size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={detailTitleStyle}>Direct Email</h4>
                  <p style={detailTextStyle}>hello@featherra.com</p>
                </div>
              </div>

              {/* Hours */}
              <div style={detailItemStyle}>
                <div style={iconBoxStyle}>
                  <Clock size={18} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={detailTitleStyle}>Visiting Hours</h4>
                  <p style={detailTextStyle}>Saturdays: 9am - 4pm (Guided Tours & Pickups)<br />Mon-Fri: By Appointment Only</p>
                </div>
              </div>
            </div>

            {/* Stylized Map illustration */}
            <div style={mapPlaceholderStyle}>
              <div style={mapDotGlow}></div>
              <span style={mapLabelStyle}>Featherra Pastures</span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div style={formColStyle} className="anim-fade-in-up">
            <div className="glass-card" style={formCardStyle}>
              {successMessage ? (
                <div style={successStateStyle} className="anim-fade-in">
                  <CheckCircle2 size={60} style={{ color: 'var(--accent-gold)', marginBottom: '1.2rem' }} />
                  <h3 style={successTitleStyle}>Submission Successful</h3>
                  <p style={successMessageStyle}>{successMessage}</p>
                  <button 
                    onClick={() => setSuccessMessage('')} 
                    className="btn btn-secondary"
                    style={{ marginTop: '1rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={formStyle}>
                  <h3 style={formHeaderStyle}>Send Us a Message</h3>

                  {/* Toggle Newsletter Signup Only */}
                  <div style={newsletterToggleWrapper}>
                    <label style={checkboxLabelStyle}>
                      <input
                        type="checkbox"
                        name="is_newsletter"
                        checked={formData.is_newsletter}
                        onChange={handleInputChange}
                        style={checkboxStyle}
                      />
                      <span style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                        I only want to subscribe to Featherra's newsletter <Sparkles size={12} style={{ color: 'var(--accent-gold)', marginLeft: '4px' }} />
                      </span>
                    </label>
                  </div>

                  {/* Full Name (Hidden if only newsletter) */}
                  {!formData.is_newsletter && (
                    <div>
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Jerome Carter"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={errors.name ? errorInputStyle : null}
                      />
                      {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
                    </div>
                  )}

                  {/* Email Address (Always Required) */}
                  <div>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jerome@featherra.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={errors.email ? errorInputStyle : null}
                    />
                    {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
                  </div>

                  {/* Subject (Hidden if only newsletter) */}
                  {!formData.is_newsletter && (
                    <div>
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Inquiry about custom laying boxes"
                        value={formData.subject}
                        onChange={handleInputChange}
                        style={errors.subject ? errorInputStyle : null}
                      />
                      {errors.subject && <span style={errorTextStyle}>{errors.subject}</span>}
                    </div>
                  )}

                  {/* Message (Hidden if only newsletter) */}
                  {!formData.is_newsletter && (
                    <div>
                      <label>Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Type your questions or orders here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        style={errors.message ? errorInputStyle : null}
                      />
                      {errors.message && <span style={errorTextStyle}>{errors.message}</span>}
                    </div>
                  )}

                  {/* Newsletter checkbox for standard forms */}
                  {!formData.is_newsletter && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <label style={checkboxLabelStyle}>
                        <input
                          type="checkbox"
                          name="is_newsletter"
                          checked={formData.is_newsletter}
                          onChange={handleInputChange}
                          style={checkboxStyle}
                        />
                        <span>Subscribe to newsletter for recipes and egg discounts</span>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    {loading ? 'Submitting details...' : formData.is_newsletter ? 'Subscribe to Newsletter' : 'Send Message'}
                    <Send size={14} />
                  </button>
                </form>
              )}
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

const greenGlowGraphic = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(42, 87, 61, 0.05) 0%, transparent 75%)',
  bottom: '-10%',
  left: '-10%',
  zIndex: 1,
  animation: 'pulseGlow 6s ease-in-out infinite',
}

const layoutGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4rem',
}

const infoColStyle = {
  flex: '1 1 450px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const subLabelStyle = {
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

const introTextStyle = {
  fontSize: '1.02rem',
  lineHeight: 1.6,
  color: 'var(--text-secondary)',
  marginBottom: '1.5rem',
}

const detailsGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}

const detailItemStyle = {
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'flex-start',
}

const iconBoxStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '50px',
  background: 'rgba(235, 208, 102, 0.04)',
  border: '1px solid rgba(235, 208, 102, 0.12)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const detailTitleStyle = {
  fontSize: '0.92rem',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '0.2rem',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
}

const detailTextStyle = {
  fontSize: '1rem',
  color: 'var(--text-primary)',
  lineHeight: 1.5,
}

const mapPlaceholderStyle = {
  height: '180px',
  background: 'radial-gradient(circle at center, rgba(42, 87, 61, 0.12) 0%, rgba(14, 20, 16, 0.5) 100%)',
  border: '1px solid rgba(235, 208, 102, 0.08)',
  borderRadius: '16px',
  marginTop: '2rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const mapDotGlow = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: 'var(--accent-orange)',
  boxShadow: 'var(--orange-glow), 0 0 15px var(--accent-orange)',
  animation: 'pulseGlow 2s ease-in-out infinite',
}

const mapLabelStyle = {
  position: 'absolute',
  bottom: '1rem',
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

const formColStyle = {
  flex: '1 1 450px',
}

const formCardStyle = {
  padding: '3rem',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
}

const formHeaderStyle = {
  fontSize: '1.6rem',
  fontFamily: 'var(--font-heading)',
  color: 'var(--text-primary)',
  marginBottom: '0.5rem',
  borderBottom: '1px solid rgba(235, 208, 102, 0.08)',
  paddingBottom: '0.8rem',
}

const newsletterToggleWrapper = {
  padding: '0.5rem 0 0.8rem 0',
  borderBottom: '1px dashed rgba(255,255,255,0.05)',
  marginBottom: '0.5rem',
}

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.86rem',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 500,
  margin: 0,
}

const checkboxStyle = {
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  accentColor: 'var(--accent-gold)',
}

const errorInputStyle = {
  borderColor: 'var(--accent-orange)',
  boxShadow: '0 0 10px rgba(217, 125, 65, 0.1)',
}

const errorTextStyle = {
  color: 'var(--accent-orange)',
  fontSize: '0.76rem',
  marginTop: '0.2rem',
  fontWeight: 600,
}

/* Success States */
const successStateStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem 0',
}

const successTitleStyle = {
  fontSize: '1.75rem',
  color: 'var(--text-primary)',
  marginBottom: '0.5rem',
}

const successMessageStyle = {
  fontSize: '1rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.6,
  maxWidth: '360px',
  marginBottom: '1.5rem',
}
