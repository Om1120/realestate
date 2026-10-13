// src/data/mockData.js

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Apartments',
    slug: 'apartments',
    description: 'Ultra-luxury sky residences and serviced penthouses with panoramic skyline vistas.',
    image: '/properties/apartment_regency.jpg',
    propertyCount: 8,
    status: 'Active'
  },
  {
    id: 'cat-2',
    name: 'Houses & Villas',
    slug: 'houses',
    description: 'Palatial standalone mansions, private heritage villas, and gated royal estates.',
    image: '/properties/villa_sovereign.jpg',
    propertyCount: 9,
    status: 'Active'
  },
  {
    id: 'cat-3',
    name: 'Penthouses',
    slug: 'penthouses',
    description: 'Crown jewel duplex and triplex penthouses featuring private plunge pools and wrap-around terraces.',
    image: '/properties/penthouse_sky.jpg',
    propertyCount: 5,
    status: 'Active'
  },
  {
    id: 'cat-4',
    name: 'Commercial Properties',
    slug: 'commercial',
    description: 'Grade-A corporate towers, high-street luxury retail flagships, and executive suites.',
    image: '/properties/corporate_tower.jpg',
    propertyCount: 6,
    status: 'Active'
  },
  {
    id: 'cat-5',
    name: 'Heritage Mansions',
    slug: 'heritage',
    description: 'Colonial and royal ancestral estates restored to world-class modern architectural standards.',
    image: '/properties/lutyens_heritage.jpg',
    propertyCount: 3,
    status: 'Active'
  }
];

export const INITIAL_AGENTS = [
  {
    id: 'agt-1',
    name: 'Maharaj Vikramaditya Singhania',
    role: 'Senior Vice President — Luxury Residences',
    email: 'vikram.singhania@aureliaestates.com',
    phone: '+91 98250 11223',
    image: '/Images/Cus1.webp', // Male
    experience: '18 Years',
    location: 'Mumbai & Ahmedabad',
    address: 'Level 18, Aurelia Towers, One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    specialization: 'Palatial Villas, Penthouses & Heritage Estates',
    bio: 'With nearly two decades of advisory expertise for royal dynasties, industrialists, and UHNW families, Vikramaditya specializes in iconic landmark acquisitions.',
    propertiesCount: 9,
    status: 'Active',
    rating: 4.98
  },
  {
    id: 'agt-2',
    name: 'Gayatri Devi Merchant',
    role: 'Director — Prime Urban Properties',
    email: 'gayatri.merchant@aureliaestates.com',
    phone: '+91 98790 44332',
    image: '/Images/Cus3.webp', // Female
    experience: '14 Years',
    location: 'Ahmedabad & Vadodara',
    address: 'Aurelia Experience Lounge, 4th Floor, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054',
    specialization: 'Luxury High-Rise & Waterfront Residences',
    bio: 'Gayatri is celebrated for her discreet client relations and deep architectural insight across Gujarat’s premier luxury corridors including Sindhu Bhavan and Alkapuri.',
    propertiesCount: 7,
    status: 'Active',
    rating: 4.95
  },
  {
    id: 'agt-3',
    name: 'Rajeshwar Roy Choudhury',
    role: 'Managing Director — Commercial & Capital Assets',
    email: 'rajeshwar.roy@aureliaestates.com',
    phone: '+91 98110 55667',
    image: '/Images/Cus2.webp', // Male
    experience: '16 Years',
    location: 'Delhi NCR & Bengaluru',
    address: 'Aurelia Executive Suites, Barakhamba Road, Connaught Place, New Delhi 110001',
    specialization: 'Corporate Headquarters & High-Street Retail',
    bio: 'Rajeshwar orchestrates marquee transactions for Fortune 500 corporate offices, tech parks, and luxury boutique retail assets in Delhi and Bangalore.',
    propertiesCount: 6,
    status: 'Active',
    rating: 4.92
  },
  {
    id: 'agt-4',
    name: 'Ananya Deshmukh',
    role: 'Associate Partner — Pune & Coastal Estates',
    email: 'ananya.deshmukh@aureliaestates.com',
    phone: '+91 99220 88990',
    image: '/Images/Cus4.webp', // Female
    experience: '10 Years',
    location: 'Pune & Mumbai',
    address: 'Aurelia Sanctuary Gallery, Lane 7, Koregaon Park, Pune, Maharashtra 411001',
    specialization: 'Bespoke Bungalows & Private Vineyard Estates',
    bio: 'Ananya brings precision and artistic curation to ultra-private luxury homes in Koregaon Park and serene lifestyle sanctuaries.',
    propertiesCount: 5,
    status: 'Active',
    rating: 4.96
  },
  {
    id: 'agt-5',
    name: 'Devika Varma',
    role: 'Senior Partner — Heritage & Royal Sanctuaries',
    email: 'devika.varma@aureliaestates.com',
    phone: '+91 98330 22441',
    image: '/Images/Cus5.webp', // Female
    experience: '15 Years',
    location: 'Jaipur & Udaipur',
    address: 'Aurelia Heritage Pavilion, Near City Palace, C-Scheme, Jaipur, Rajasthan 302001',
    specialization: 'Heritage Haveli Palaces & Boutique Resorts',
    bio: 'Devika has facilitated private transactions for prestigious heritage properties, royal courtyards, and palatial architectural gems.',
    propertiesCount: 8,
    status: 'Active',
    rating: 4.97
  },
  {
    id: 'agt-6',
    name: 'Pooja Singhania',
    role: 'Principal Advisor — Waterfront & Beachfront Estates',
    email: 'pooja.singhania@aureliaestates.com',
    phone: '+91 98450 77889',
    image: '/Images/Cus6.webp', // Female
    experience: '12 Years',
    location: 'Goa & Alibaug',
    address: 'Aurelia Coastal Desk, Fort Aguada Road, Candolim, North Goa 403515',
    specialization: 'Beachfront Mansions & Ultra-Luxury Villas',
    bio: 'Pooja specializes in exclusive coastal retreats, private beachfront sanctuaries, and bespoke luxury holiday homes for discerning collectors.',
    propertiesCount: 6,
    status: 'Active',
    rating: 4.94
  },
  {
    id: 'agt-7',
    name: 'Radhika Kapoor',
    role: 'Executive Director — International & Trophy Corridors',
    email: 'radhika.kapoor@aureliaestates.com',
    phone: '+91 98920 33556',
    image: '/Images/Cus7.webp', // Female
    experience: '17 Years',
    location: 'Mumbai & Dubai',
    address: 'Aurelia Trophy Pavilion, Worli Sea Face, Mumbai, Maharashtra 400030',
    specialization: 'Sky Penthouses & Private Islands',
    bio: 'Radhika connects high-net-worth individuals with unmatched trophy properties, duplex penthouses, and signature architectural landmarks.',
    propertiesCount: 11,
    status: 'Active',
    rating: 4.99
  }
];

export const INITIAL_PROPERTIES = [
  {
    id: 'AUR-101',
    title: 'The Royal Sovereign Villa at Ambli Crest',
    slug: 'the-royal-sovereign-villa-ambli-crest',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 185000000, // 18.5 Cr
    bookingAmount: 500000, // 5 Lakh
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 7,
    area: 9800,
    location: 'Ahmedabad',
    address: 'Plot 14, Ambli-Bopal Royal Avenue, Off SG Highway, Ahmedabad, Gujarat 380058',
    coordinates: { lat: 23.0336, lng: 72.4862 },
    description: 'An architectural magnum opus offering bespoke classical columns, double-height grand foyer, Italian Statuario marble, temperature-controlled private infinity pool, and lush manicured royal courtyards.',
    featured: true,
    image: '/properties/villa_sovereign.jpg',
    images: [
      '/properties/villa_sovereign.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Swimming Pool', 'Private Elevator', '24/7 Security & CCTV', 'Smart Home Automation', 
      'Landscaped Garden', 'Gymnasium & Spa', '4+ Covered Parking', 'Power Backup', 
      'Club House', 'Wine Cellar', 'Staff Quarters'
    ],
    agentId: 'agt-1',
    createdAt: '2026-08-15T10:30:00Z'
  },
  {
    id: 'AUR-102',
    title: 'The Sky Palace Triplex Penthouse at Worli Sea Face',
    slug: 'sky-palace-triplex-penthouse-worli',
    propertyType: 'Penthouse',
    category: 'Penthouses',
    price: 340000000, // 34 Cr
    bookingAmount: 1000000, // 10 Lakh
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    area: 7500,
    location: 'Mumbai',
    address: 'Tower Aurelius, 42nd - 44th Floor, Worli Sea Face, Mumbai, Maharashtra 400018',
    coordinates: { lat: 19.0176, lng: 72.8151 },
    description: 'An unmatched triplex penthouse overlooking the Arabian Sea and the Bandra-Worli Sea Link. Features a rooftop glass infinity pool, private biometric elevator, 360-degree ocean decks, and bespoke interiors by European master craftsmen.',
    featured: true,
    image: '/properties/penthouse_sky.jpg',
    images: [
      '/properties/penthouse_sky.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Infinity Pool', 'Private Elevator', 'Helipad Access', 'Sea View', 
      'Smart Home Automation', 'Concierge 24/7', 'Gymnasium & Spa', 'Wine Cellar', 
      'Italian Marble', 'Home Theatre'
    ],
    agentId: 'agt-1',
    createdAt: '2026-08-20T14:15:00Z'
  },
  {
    id: 'AUR-103',
    title: 'Imperial Regency Residences — Sindhu Bhavan',
    slug: 'imperial-regency-residences-sindhu-bhavan',
    propertyType: 'Apartment',
    category: 'Apartments',
    price: 48000000, // 4.8 Cr
    bookingAmount: 200000, // 2 Lakh
    status: 'Available',
    bedrooms: 4,
    bathrooms: 4,
    area: 4200,
    location: 'Ahmedabad',
    address: 'Sindhu Bhavan Marg, Bodakdev Ext., Ahmedabad, Gujarat 380054',
    coordinates: { lat: 23.0454, lng: 72.5089 },
    description: 'A benchmark in luxury condominium living with double-height ceiling living salons, expansive wrap-around balconies, private entry vestibule, and club-level wellness concierge.',
    featured: true,
    image: '/properties/apartment_regency.jpg',
    images: [
      '/properties/apartment_regency.jpg',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Swimming Pool', 'Club House', 'Gymnasium & Spa', '24/7 Security & CCTV', 
      'Children Play Area', 'Power Backup', 'Landscaped Garden', 'Covered Parking'
    ],
    agentId: 'agt-2',
    createdAt: '2026-08-25T09:00:00Z'
  },
  {
    id: 'AUR-104',
    title: 'The Buckingham Manor at Koregaon Park',
    slug: 'buckingham-manor-koregaon-park',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 145000000, // 14.5 Cr
    bookingAmount: 500000,
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    area: 8200,
    location: 'Pune',
    address: 'Lane 4, North Main Road, Koregaon Park, Pune, Maharashtra 411001',
    coordinates: { lat: 18.5362, lng: 73.8939 },
    description: 'Nestled among century-old banyan trees, this British colonial-inspired private manor boasts teakwood beamed ceilings, sprawling verandas, heated lap pool, and a private botanical sanctuary.',
    featured: true,
    image: '/properties/manor_estate.jpg',
    images: [
      '/properties/manor_estate.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Heated Pool', 'Botanical Garden', 'Smart Home Automation', 
      'Security & CCTV', 'Italian Marble', 'Staff Quarters', 'Solar Power Backup'
    ],
    agentId: 'agt-4',
    createdAt: '2026-09-01T11:20:00Z'
  },
  {
    id: 'AUR-105',
    title: 'Aurelia Prime Grand Corporate Tower',
    slug: 'aurelia-prime-grand-corporate-tower',
    propertyType: 'Commercial',
    category: 'Commercial Properties',
    price: 520000000, // 52 Cr
    bookingAmount: 2500000,
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 12,
    area: 28000,
    location: 'Bengaluru',
    address: 'Outer Ring Road, Marathahalli-Sarjapur Junction, Bengaluru, Karnataka 560103',
    coordinates: { lat: 12.9279, lng: 77.6835 },
    description: 'IGBC Platinum Certified ultra-luxury grade-A commercial campus. Features double-glazed acoustic curtain walls, high-speed destination-controlled elevators, and executive board suites.',
    featured: false,
    image: '/properties/corporate_tower.jpg',
    images: [
      '/properties/corporate_tower.jpg',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'High-Speed Elevators', 'Grade-A Platinum LEED', '24/7 Surveillance', 
      'Ample 100+ Parking', 'Centralized HVAC', 'Cafeteria & Auditorium'
    ],
    agentId: 'agt-3',
    createdAt: '2026-09-05T16:00:00Z'
  },
  {
    id: 'AUR-106',
    title: 'Palais de Dumas Waterfront Villa',
    slug: 'palais-de-dumas-waterfront-villa',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 95000000, // 9.5 Cr
    bookingAmount: 400000,
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 5,
    area: 6800,
    location: 'Surat',
    address: 'Dumas Road, Near VIP Cir, Vesu Extension, Surat, Gujarat 395007',
    coordinates: { lat: 21.1418, lng: 72.7667 },
    description: 'A serene luxury oasis situated in Surat’s most prestigious residential enclave. Boasts French arched windows, expansive landscaped lawns, and private wellness pavilions.',
    featured: true,
    image: '/properties/waterfront_villa.jpg',
    images: [
      '/properties/waterfront_villa.jpg',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Swimming Pool', 'Gymnasium & Spa', 'Italian Marble', 'Landscaped Garden', 
      'Security 24/7', 'Power Backup', 'Covered Parking'
    ],
    agentId: 'agt-2',
    createdAt: '2026-09-08T10:00:00Z'
  },
  {
    id: 'AUR-107',
    title: 'The Windsor Courtyard Luxury Villa — Alkapuri',
    slug: 'windsor-courtyard-alkapuri-vadodara',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 68000000, // 6.8 Cr
    bookingAmount: 300000,
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    area: 5500,
    location: 'Vadodara',
    address: 'RC Dutt Road, Near Circuit House, Alkapuri, Vadodara, Gujarat 390007',
    coordinates: { lat: 22.3107, lng: 73.1706 },
    description: 'An elite heritage-infused modern villa in royal Vadodara with tranquil central courtyards, marble water fountains, grand dining halls, and private master suites.',
    featured: false,
    image: '/properties/windsor_villa.jpg',
    images: [
      '/properties/windsor_villa.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Courtyard Water Fountain', 'Italian Marble', 'Home Automation', 
      'Security 24/7', 'Private Terrace Garden', 'Covered Car Park'
    ],
    agentId: 'agt-2',
    createdAt: '2026-09-10T12:00:00Z'
  },
  {
    id: 'AUR-108',
    title: 'Lutyens Heritage Colonial Bungalow',
    slug: 'lutyens-heritage-colonial-bungalow',
    propertyType: 'Heritage Mansions',
    category: 'Heritage Mansions',
    price: 780000000, // 78 Cr
    bookingAmount: 2000000,
    status: 'For Sale',
    bedrooms: 7,
    bathrooms: 8,
    area: 16500,
    location: 'Delhi',
    address: 'Amrita Shergill Marg, Lutyens Bungalow Zone, New Delhi, Delhi 110003',
    coordinates: { lat: 28.5983, lng: 77.2274 },
    description: 'The pinnacle of prestige and power in India’s capital. An authentic colonial mansion set within 1.5 acres of private heritage gardens with regal high ceilings, antique fireplaces, and private state banquet halls.',
    featured: true,
    image: '/properties/lutyens_heritage.jpg',
    images: [
      '/properties/lutyens_heritage.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '1.5 Acre Private Grounds', 'Private Guardhouse', 'Banquet Hall', 
      'Wine Cellar', 'Heated Swimming Pool', 'Tennis Court', 'Staff Quarters'
    ],
    agentId: 'agt-3',
    createdAt: '2026-09-12T15:30:00Z'
  },
  {
    id: 'AUR-109',
    title: 'The Ritz Executive High-Street Flagship Store',
    slug: 'ritz-executive-flagship-store-sg-highway',
    propertyType: 'Commercial',
    category: 'Commercial Properties',
    price: 125000000, // 12.5 Cr
    bookingAmount: 500000,
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 4,
    area: 6200,
    location: 'Ahmedabad',
    address: 'Main SG Highway Frontage, Bodakdev, Ahmedabad, Gujarat 380054',
    coordinates: { lat: 23.0512, lng: 72.5124 },
    description: 'Prominent 120-foot wide glass frontage showroom space on Ahmedabad’s billionaire mile. Perfect for international luxury watchmakers, couture ateliers, or private banks.',
    featured: false,
    image: '/properties/commercial_retail.jpg',
    images: [
      '/properties/commercial_retail.jpg',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'High Footfall Frontage', 'Valet Parking', 'Centralized Air Conditioning', 
      '100% Power Backup', 'Fire Suppression System', '24/7 Security'
    ],
    agentId: 'agt-2',
    createdAt: '2026-09-14T09:45:00Z'
  },
  {
    id: 'AUR-110',
    title: 'The Sovereign Sky Villa at Pali Hill',
    slug: 'sovereign-sky-villa-pali-hill-bandra',
    propertyType: 'Apartment',
    category: 'Apartments',
    price: 195000000, // 19.5 Cr
    bookingAmount: 1000000,
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    location: 'Mumbai',
    address: 'Nargis Dutt Road, Pali Hill, Bandra West, Mumbai, Maharashtra 400050',
    coordinates: { lat: 19.0634, lng: 72.8295 },
    description: 'Perched in the leafy enclave of Bollywood royalty and industrial magnates. Features private plunge pool, teakwood deck, bespoke automated mood illumination, and private parking for 4 supercars.',
    featured: true,
    image: '/properties/pali_hill_sky.jpg',
    images: [
      '/properties/pali_hill_sky.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Plunge Pool', 'Valet Concierge', 'Italian Marble', 
      'Smart Automation', 'Gymnasium', 'Sea View Deck'
    ],
    agentId: 'agt-1',
    createdAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'AUR-111',
    title: 'Opulent Gardenia Villa — Sadashivanagar',
    slug: 'opulent-gardenia-villa-sadashivanagar',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 220000000, // 22 Cr
    bookingAmount: 1000000,
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    area: 8900,
    location: 'Bengaluru',
    address: '11th Cross, Sadashivanagar, Bengaluru, Karnataka 560080',
    coordinates: { lat: 13.0068, lng: 77.5813 },
    description: 'Located in Bangalore’s most aristocratic residential neighborhood. Boasts neoclassical Greek columns, temperature-controlled wine room, infinity pool, and Japanese Zen gardens.',
    featured: false,
    image: '/properties/windsor_villa.jpg',
    images: [
      '/properties/windsor_villa.jpg',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Infinity Pool', 'Zen Garden', 'Home Theatre Room', 
      '4 Car Garage', 'Smart Access Control', 'Staff Quarters'
    ],
    agentId: 'agt-3',
    createdAt: '2026-09-16T14:30:00Z'
  },
  {
    id: 'AUR-112',
    title: 'The Grand Venetian Penthouse — Vesu',
    slug: 'grand-venetian-penthouse-vesu-surat',
    propertyType: 'Penthouse',
    category: 'Penthouses',
    price: 38000000, // 3.8 Cr
    bookingAmount: 150000,
    status: 'For Rent',
    rentPrice: 175000, // 1.75 L/month
    bedrooms: 4,
    bathrooms: 4,
    area: 4500,
    location: 'Surat',
    address: 'VIP Road, Opp. University Gate, Vesu, Surat, Gujarat 395007',
    coordinates: { lat: 21.1524, lng: 72.7845 },
    description: 'Italian neoclassical interiors with imported chandelier light installations, private terrace garden with barbecue pergola, and designer modular kitchen.',
    featured: false,
    image: '/properties/penthouse_sky.jpg',
    images: [
      '/properties/penthouse_sky.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Terrace Barbecue Pergola', 'Smart Lighting', 'Clubhouse & Pool Access', 
      'Covered Parking', '24/7 Security'
    ],
    agentId: 'agt-2',
    createdAt: '2026-09-18T10:00:00Z'
  },
  {
    id: 'AUR-113',
    title: 'Mayfair Classic Heritage Estate',
    slug: 'mayfair-classic-heritage-estate-golf-links',
    propertyType: 'Heritage Mansions',
    category: 'Heritage Mansions',
    price: 650000000, // 65 Cr
    bookingAmount: 2000000,
    status: 'Sold',
    bedrooms: 6,
    bathrooms: 7,
    area: 14000,
    location: 'Delhi',
    address: 'Golf Links Enclave, New Delhi, Delhi 110003',
    coordinates: { lat: 28.5991, lng: 77.2341 },
    description: 'An illustrious aristocratic home overlooking the Delhi Golf Club with sprawling emerald lawns, regal marble verandas, and bespoke chandeliers.',
    featured: false,
    image: '/properties/lutyens_heritage.jpg',
    images: [
      '/properties/lutyens_heritage.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Golf Course Views', 'Sprawling Lawns', 'Private Gym & Spa', 
      'Security Post', 'Staff Housing'
    ],
    agentId: 'agt-3',
    createdAt: '2026-09-19T13:00:00Z'
  },
  {
    id: 'AUR-114',
    title: 'Kalyani Royal Manor — Pune',
    slug: 'kalyani-royal-manor-pune',
    propertyType: 'Villa',
    category: 'Houses & Villas',
    price: 88000000, // 8.8 Cr
    bookingAmount: 400000,
    status: 'Available',
    bedrooms: 4,
    bathrooms: 5,
    area: 6100,
    location: 'Pune',
    address: 'Central Avenue, Kalyani Nagar, Pune, Maharashtra 411006',
    coordinates: { lat: 18.5492, lng: 73.9048 },
    description: 'A contemporary luxury villa blending teakwood aesthetics with sleek glass architecture. Includes private lap pool and temperature-controlled wine gallery.',
    featured: false,
    image: '/properties/manor_estate.jpg',
    images: [
      '/properties/manor_estate.jpg',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Lap Pool', 'Wine Cellar', 'Smart Security', 
      'Landscaped Garden', '3 Car Garage'
    ],
    agentId: 'agt-4',
    createdAt: '2026-09-20T11:00:00Z'
  },
  {
    id: 'AUR-115',
    title: 'The Monarch Executive Penthouse — Gotri',
    slug: 'monarch-executive-penthouse-gotri-vadodara',
    propertyType: 'Penthouse',
    category: 'Penthouses',
    price: 29000000, // 2.9 Cr
    bookingAmount: 100000,
    status: 'Rented',
    rentPrice: 110000, // 1.1 L/month
    bedrooms: 3,
    bathrooms: 4,
    area: 3600,
    location: 'Vadodara',
    address: 'Gotri-Sevasi Main Road, Vadodara, Gujarat 390021',
    coordinates: { lat: 22.3245, lng: 73.1362 },
    description: 'High-floor sanctuary with panoramic views over Vadodara’s green belts. Designed with minimalist Italian cabinetry, marble bathrooms, and expansive outdoor decks.',
    featured: false,
    image: '/properties/apartment_regency.jpg',
    images: [
      '/properties/apartment_regency.jpg',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Sky Deck', 'Designer Lighting', 'Clubhouse Access', 
      'Covered Parking', '24/7 Security'
    ],
    agentId: 'agt-2',
    createdAt: '2026-09-21T14:00:00Z'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Siddharth Singhania',
    email: 'user@example.com',
    phone: '+91 98200 77665',
    address: 'Bungalow 7, Altamount Road, Mumbai, Maharashtra',
    registrationDate: '2026-06-12',
    status: 'Active',
    avatar: '/Images/Cus1.webp' // Male
  },
  {
    id: 'cust-2',
    name: 'Radhika Patel',
    email: 'radhika.patel@horizonholdings.in',
    phone: '+91 98795 22331',
    address: 'Silver Oak Greens, Bodakdev, Ahmedabad, Gujarat',
    registrationDate: '2026-07-04',
    status: 'Active',
    avatar: '/Images/Cus4.webp' // Female
  },
  {
    id: 'cust-3',
    name: 'Karan Mehra',
    email: 'karan.mehra@apextech.com',
    phone: '+91 98101 99887',
    address: 'Indiranagar 100ft Road, Bengaluru, Karnataka',
    registrationDate: '2026-08-11',
    status: 'Active',
    avatar: '/Images/Cus2.webp' // Male
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'INQ-901',
    propertyId: 'AUR-101',
    propertyTitle: 'The Royal Sovereign Villa at Ambli Crest',
    customerName: 'Siddharth Singhania',
    customerEmail: 'user@example.com',
    customerPhone: '+91 98200 77665',
    message: 'Requesting a private brochure and scheduling a private VIP walkthrough for this weekend.',
    date: '2026-09-22T14:30:00Z',
    status: 'In Progress'
  },
  {
    id: 'INQ-902',
    propertyId: 'AUR-102',
    propertyTitle: 'The Sky Palace Triplex Penthouse at Worli Sea Face',
    customerName: 'Radhika Patel',
    customerEmail: 'radhika.patel@horizonholdings.in',
    customerPhone: '+91 98795 22331',
    message: 'Seeking legal clearance documentation and floor layouts for the upper terrace level.',
    date: '2026-09-24T10:15:00Z',
    status: 'New'
  },
  {
    id: 'INQ-903',
    propertyId: 'AUR-105',
    propertyTitle: 'Aurelia Prime Grand Corporate Tower',
    customerName: 'Karan Mehra',
    customerEmail: 'karan.mehra@apextech.com',
    customerPhone: '+91 98101 99887',
    message: 'Evaluating full floor commercial floor-plate availability for our international AI lab headquarters.',
    date: '2026-09-25T16:45:00Z',
    status: 'Contacted'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-801',
    propertyId: 'AUR-101',
    propertyTitle: 'The Royal Sovereign Villa at Ambli Crest',
    customerName: 'Siddharth Singhania',
    customerEmail: 'user@example.com',
    customerPhone: '+91 98200 77665',
    agentName: 'Maharaj Vikramaditya Singhania',
    date: '2026-10-02',
    time: '11:00 AM',
    status: 'Confirmed',
    message: 'Private chauffeured viewing requested for family elders.'
  },
  {
    id: 'APT-802',
    propertyId: 'AUR-104',
    propertyTitle: 'The Buckingham Manor at Koregaon Park',
    customerName: 'Radhika Patel',
    customerEmail: 'radhika.patel@horizonholdings.in',
    customerPhone: '+91 98795 22331',
    agentName: 'Ananya Deshmukh',
    date: '2026-10-05',
    time: '03:30 PM',
    status: 'Pending',
    message: 'Weekend walkthrough.'
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-77491',
    propertyId: 'AUR-103',
    propertyTitle: 'Imperial Regency Residences — Sindhu Bhavan',
    customerName: 'Siddharth Singhania',
    customerEmail: 'user@example.com',
    amount: 200000, // Token deposit ₹ 2 Lakh
    propertyPrice: 48000000,
    paymentMethod: 'Credit Card (Black Amex Concierge)',
    date: '2026-09-20T15:20:00Z',
    status: 'Successful',
    receiptNumber: 'AUR-REC-2026-0920'
  }
];

export const POPULAR_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Ahmedabad',
    state: 'Gujarat',
    propertiesCount: 14,
    image: '/properties/villa_sovereign.jpg',
    description: 'Ambli Road, Sindhu Bhavan, Bodakdev & SG Highway luxury enclaves.'
  },
  {
    id: 'loc-2',
    name: 'Mumbai',
    state: 'Maharashtra',
    propertiesCount: 18,
    image: '/properties/penthouse_sky.jpg',
    description: 'Worli Sea Face, Bandra West, Malabar Hill & Juhu beachfronts.'
  },
  {
    id: 'loc-3',
    name: 'Surat',
    state: 'Gujarat',
    propertiesCount: 8,
    image: '/properties/waterfront_villa.jpg',
    description: 'Vesu, VIP Road, Dumas Waterfront & Piplod villas.'
  },
  {
    id: 'loc-4',
    name: 'Vadodara',
    state: 'Gujarat',
    propertiesCount: 7,
    image: '/properties/windsor_villa.jpg',
    description: 'Alkapuri, Gotri, Vasna & royal palace heritage corridors.'
  },
  {
    id: 'loc-5',
    name: 'Pune',
    state: 'Maharashtra',
    propertiesCount: 10,
    image: '/properties/manor_estate.jpg',
    description: 'Koregaon Park, Kalyani Nagar & Boat Club Road estates.'
  },
  {
    id: 'loc-6',
    name: 'Delhi',
    state: 'Delhi NCR',
    propertiesCount: 12,
    image: '/properties/lutyens_heritage.jpg',
    description: 'Lutyens Bungalow Zone, Golf Links & Greater Kailash.'
  },
  {
    id: 'loc-7',
    name: 'Bengaluru',
    state: 'Karnataka',
    propertiesCount: 15,
    image: '/properties/corporate_tower.jpg',
    description: 'Sadashivanagar, Indiranagar, Whitefield & Tech Corridors.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'His Highness Vikramjit Singh',
    designation: 'Patron & Heritage Collector',
    city: 'Ahmedabad',
    image: '/Images/Cus1.webp', // Male
    propertyTitle: 'The Royal Sovereign Villa at Ambli',
    rating: 5,
    quote: 'Aurelia Estates provided an unmatched level of discretion and classical architectural curation. Their team orchestrated our family acquisition seamlessly.'
  },
  {
    id: 'test-2',
    name: 'Meera Choksi Kapadia',
    designation: 'Managing Partner, Kapadia Global Capital',
    city: 'Mumbai',
    image: '/Images/Cus7.webp', // Female
    propertyTitle: 'The Sky Palace Triplex Penthouse',
    rating: 5,
    quote: 'Finding a sea-facing penthouse with biometric security and private elevator in Mumbai seemed impossible until Aurelia presented this crown jewel.'
  },
  {
    id: 'test-3',
    name: 'Arjun Somany',
    designation: 'Industrialist & Tech Founder',
    city: 'Bengaluru',
    image: '/Images/Cus2.webp', // Male
    propertyTitle: 'Aurelia Prime Grand Corporate Tower',
    rating: 5,
    quote: 'The commercial team under Rajeshwar Roy negotiated an extraordinary institutional grade-A acquisition for our multinational tech campus.'
  }
];
