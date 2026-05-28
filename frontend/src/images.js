/**
 * Maps API `image_name` keys to poultry-themed assets in /public/images.
 * Each image matches its service or product (eggs, chicken, chicks, farm).
 */
const ASSET_IMAGES = {
  eggs_service: '/images/eggs_service.jpg',       // Fresh eggs service
  meat_service: '/images/meat_service.jpg',       // Poultry meat service
  chicks_service: '/images/chicks_service.jpg',   // Hatchery / chicks service
  tours_service: '/images/tours_service.jpg',     // Pasture hens / farm tours
  heritage_eggs: '/images/heritage_eggs.jpg',     // Heritage egg product
  whole_broiler: '/images/whole_broiler.jpg',     // Whole broiler product
  starter_chicks: '/images/starter_chicks.jpg',   // Starter chicks pack
  workshop_ticket: '/images/workshop_ticket.jpg', // Farm visit experience
  farm_sunset: '/images/farm_sunset.jpg',         // Hero background
}

const FALLBACK_IMAGE = '/images/farm_sunset.jpg'

export function getAssetImage(imageName) {
  if (!imageName) return FALLBACK_IMAGE
  const key = String(imageName).replace(/\.(jpe?g|png|webp)$/i, '')
  return ASSET_IMAGES[key] || `/images/${key}.jpg`
}
