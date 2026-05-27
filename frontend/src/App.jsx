import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import ServicesGrid from './components/ServicesGrid'
import ProductsCatalog from './components/ProductsCatalog'
import News from './components/News'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

import SearchOverlay from './components/SearchOverlay'
import ServiceModal from './components/ServiceModal'
import BookingModal from './components/BookingModal'

// Pre-defined high-quality farm harvest and services data for offline and boot fallbacks
const MOCK_SERVICES = [
  {
    id: 1,
    title: "Featherra Farm Fresh Eggs",
    description: "Discover the taste of real, pasture-raised eggs. Healthy, free-roaming hens produce the most nutritious, golden yolks.",
    details: "Our heritage-breed hens spend their days roaming lush clover pastures, foraging on organic greens and seeds. Every single egg is hand-gathered daily at sunrise, gently inspected, and packed. Rich in Omega-3 and Vitamin D, these are farm-fresh eggs as nature intended.",
    image_name: "eggs_service",
    cta_text: "Learn More",
    icon: "Egg",
    order: 1
  },
  {
    id: 2,
    title: "Ethically Raised Poultry Meat",
    description: "Savor the taste of responsible farming. Our chickens are raised in spacious, sun-drenched pastures with zero antibiotics.",
    details: "We raise our slow-growing broiler flocks in mobile pasture coops that move daily to fresh grass. This ensures high welfare, natural stress-free foraging, and robust bird health. Ethically processed on our farm and air-chilled, our poultry meat delivers superior flavor, tenderness, and nutrition.",
    image_name: "meat_service",
    cta_text: "View Options",
    icon: "Flame",
    order: 2
  },
  {
    id: 3,
    title: "Starter Chicks & Hatchery Services",
    description: "Begin your own homesteading journey with robust, high-quality chicks from our carefully managed breeding flock.",
    details: "Start your backyard flock on the right foot. We hatch sturdy, vaccinated day-old chicks from premium dual-purpose breeds (including Buff Orpingtons, Rhode Island Reds, and Araucanas). Every purchase includes a digital homestead manual and lifetime husbandry consultation from our team.",
    image_name: "chicks_service",
    cta_text: "Hatchery Details",
    icon: "Bird",
    order: 3
  },
  {
    id: 4,
    title: "Poultry Workshops, Tours & Expert Advice",
    description: "Learn sustainable farming methods, experience guided tours, or get premium consulting to optimize your flock.",
    details: "Featherra is a center for learning. We open our farm gates for monthly hands-on workshops covering pasture management, organic feeding, predator-proofing, and coop builds. We also offer 1-on-1 on-site consulting for smallholders and guided farm experience walks for families.",
    image_name: "tours_service",
    cta_text: "Book a Visit",
    icon: "BookOpen",
    order: 4
  }
]

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Pasture-Raised Heritage Eggs (Carton)",
    category: "eggs",
    description: "A gorgeous dozen of hand-picked multi-colored eggs ranging from deep chocolate browns to sky blues. Collected fresh daily from pasture-fed heritage layers.",
    price: 6.50,
    unit: "Dozen",
    image_name: "heritage_eggs",
    is_available: true,
    is_organic: true,
    order: 1
  },
  {
    id: 2,
    name: "Whole Pasture Broiler Chicken",
    category: "meat",
    description: "Fully processed and dressed, slow-grown broiler chicken. Perfect for roasting. Raised in moving shelters on dynamic pastures.",
    price: 24.00,
    unit: "Whole Bird (approx 2kg)",
    image_name: "whole_broiler",
    is_available: true,
    is_organic: true,
    order: 2
  },
  {
    id: 3,
    name: "Buff Orpington Starter Chicks Pack",
    category: "chicks",
    description: "A robust pack of 5 vaccinated day-old chicks. Buff Orpingtons are incredibly friendly, cold-hardy, and excellent brown-egg layers for backyard coops.",
    price: 35.00,
    unit: "Pack of 5 Day-Olds",
    image_name: "starter_chicks",
    is_available: true,
    is_organic: false,
    order: 3
  },
  {
    id: 4,
    name: "Featherra Guided Sunset Farm Tour",
    category: "experiences",
    description: "Guided sunset farm experience. Walk through the pastures, interact with our heritage laying hens, explore the hatchery, and enjoy farm-fresh cider.",
    price: 20.00,
    unit: "Ticket / Person",
    image_name: "workshop_ticket",
    is_available: true,
    is_organic: true,
    order: 4
  }
]

export default function App() {
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])
  
  const [servicesLoading, setServicesLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(true)
  
  const [searchOpen, setSearchOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedWorkshop, setSelectedWorkshop] = useState('sustainable_poultry')
  const [activeService, setActiveService] = useState(null)
  const [selectedInquiryProduct, setSelectedInquiryProduct] = useState(null)

  // Fetch Services & Products from Django REST API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/services/')
        if (res.ok) {
          const data = await res.json()
          setServices(data.length > 0 ? data : MOCK_SERVICES)
        } else {
          setServices(MOCK_SERVICES)
        }
      } catch (err) {
        console.warn("Unable to fetch backend services, using local design resources...", err)
        setServices(MOCK_SERVICES)
      } finally {
        setServicesLoading(false)
      }
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products/')
        if (res.ok) {
          const data = await res.json()
          setProducts(data.length > 0 ? data : MOCK_PRODUCTS)
        } else {
          setProducts(MOCK_PRODUCTS)
        }
      } catch (err) {
        console.warn("Unable to fetch backend products, using local design resources...", err)
        setProducts(MOCK_PRODUCTS)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchServices()
    fetchProducts()
  }, [])

  const handleLaunchBooking = (workshopType = 'sustainable_poultry') => {
    setSelectedWorkshop(workshopType)
    setBookingOpen(true)
  }

  const handleOrderRedirect = (product) => {
    setSelectedInquiryProduct(product)
  }

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(`${sectionId}-section`)
    if (el) {
      const yOffset = -80
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="featherra-app-wrapper" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Navigation sticky bar */}
      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        onBookClick={() => handleLaunchBooking('sustainable_poultry')}
      />

      {/* Hero landing segments */}
      <Hero
        onExploreClick={() => handleScrollToSection('services')}
      />

      {/* Philosophy and farm team segments */}
      <AboutUs />

      {/* Services Grid display */}
      <ServicesGrid
        services={services}
        onSelectService={(service) => setActiveService(service)}
        loading={servicesLoading}
      />

      {/* Products and inventory catalog segments */}
      <ProductsCatalog
        products={products}
        onOrderClick={handleOrderRedirect}
        onBookClick={handleLaunchBooking}
        loading={productsLoading}
      />

      {/* Farm blog updates segment */}
      <News />

      {/* Booking and general support mail panel */}
      <ContactForm
        initialProduct={selectedInquiryProduct}
      />

      {/* Premium Footer segment */}
      <Footer />

      {/* Search overlay popup */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        services={services}
        products={products}
        onSelectService={(service) => setActiveService(service)}
        onSelectProduct={(product) => handleOrderRedirect(product)}
      />

      {/* Deep-dive service modal popup */}
      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onBookFarm={handleLaunchBooking}
        onExploreProducts={() => handleScrollToSection('products')}
      />

      {/* Workshop/Tour booking modal popup */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialWorkshop={selectedWorkshop}
      />
    </div>
  )
}
