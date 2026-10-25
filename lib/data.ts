export interface PropertyData {
  id: number
  image: string
  images?: string[]
  price: string
  priceNum?: number
  beds: number
  baths: number
  sqft: string
  address: string
  city: string
  state?: string
  zip?: string
  tag?: string
  tagColor?: string
  /** Full subtype string e.g. "Apartment", "Office Space", "Factory / Industrial Shed" */
  type?: string
  /** Top-level category */
  category?: "residential" | "commercial" | "industrial"
  yearBuilt?: number
  lotSize?: string
  description?: string
  features?: string[]
  listingAgent?: AgentData
  isRental?: boolean
  rentPrice?: string
  status?: "for-sale" | "for-rent" | "sold" | "pending"
  daysOnMarket?: number
  zestimate?: string
  monthlyPayment?: string
  hoaFee?: string
  garage?: number
  stories?: number
  heating?: string
  cooling?: string
  parking?: string
  lat?: number
  lng?: number
  isFeatured?: boolean
  isTrending?: boolean
  /** Listing placement flags */
  isForSale?: boolean
  isForRent?: boolean
  /** Property-specific details */
  facing?: string
  furnishing?: string
  floor?: number
  totalFloors?: number
  availableFrom?: string
  securityDeposit?: string
  maintenanceCharges?: string
  lockInPeriod?: string
  landmark?: string
  locality?: string
  possessionDate?: string
  ageOfProperty?: string
}

export interface AgentData {
  id: number
  name: string
  image: string
  phone: string
  email: string
  company: string
  rating: number
  reviewCount: number
  salesCount: number
  bio: string
  specialties: string[]
  areas: string[]
  yearsExperience: number
}

export const agents: AgentData[] = [
  {
    id: 1,
    name: "Anju Jangiti",
    image: "/images/logo.png",
    phone: "7767805544",
    email: "anjujangiti@gmail.com",
    company: "Shree Balaji Enterprises",
    rating: 5.0,
    reviewCount: 1000,
    salesCount: 500,
    bio: "With over 15 years of experience in real estate, Anju has built Shree Balaji Enterprises on the foundation of trust and customer service. Her deep understanding of the local market and commitment to client satisfaction has helped thousands of families find their perfect property across the Mumbai Metropolitan Region.",
    specialties: ["Residential", "Commercial", "Industrial"],
    areas: ["Ambernath", "Badlapur", "Thane", "Mumbai", "Navi Mumbai"],
    yearsExperience: 15,
  },
]

const IK_BASE = "https://ik.imagekit.io/shreebalaji"

export const buyProperties: PropertyData[] = [
  {
    id: 1,
    image: `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.31%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
    images: [
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.31%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.32%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.33%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.34%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.35%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.36%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.37%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
      `${IK_BASE}/Ishwar%20Subhalaxmi/WhatsApp%20Image%202026-02-24%20at%201.35.38%20PM.jpeg?tr=w-800,h-600,q-85,fo-auto`,
    ],
    price: "Contact for Price",
    beds: 0,
    baths: 0,
    sqft: "On Request",
    address: "Ishwar Subhalaxmi",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "house",
    description: "Premium residential property in Ambernath. Ready to Move. Contact Shree Balaji Enterprises for complete details, site visits, and pricing information. RERA Registered Agency – Reg No: A51700023633.",
    features: ["Residential", "Premium", "Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 7,
    lat: 19.197,
    lng: 73.191,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format",
    price: "₹45 Lakh",
    beds: 2,
    baths: 1,
    sqft: "850",
    address: "Greenwood Heights",
    city: "Badlapur",
    state: "Maharashtra",
    tag: "For Sale",
    tagColor: "primary",
    type: "apartment",
    description: "Spacious 2BHK apartment in the heart of Badlapur with modern amenities, close to railway station. Ideal for first-time home buyers.",
    features: ["2 BHK", "Near Station", "Ready to Move"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 3,
    lat: 19.161,
    lng: 73.231,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    price: "₹72 Lakh",
    beds: 3,
    baths: 2,
    sqft: "1200",
    address: "Royal Residency",
    city: "Ambernath",
    state: "Maharashtra",
    tag: "New Launch",
    tagColor: "primary",
    type: "apartment",
    description: "Luxurious 3BHK in a gated community with 24/7 security, clubhouse, and landscaped gardens. Prime location in Ambernath East.",
    features: ["3 BHK", "Gated Community", "Clubhouse"],
    listingAgent: agents[0],
    status: "for-sale",
    daysOnMarket: 1,
    lat: 19.205,
    lng: 73.198,
    isFeatured: true,
    isTrending: true,
  },







]

export const rentalProperties: PropertyData[] = []


export function getPropertyById(id: number): PropertyData | undefined {
  return [...buyProperties, ...rentalProperties].find((p) => p.id === id)
}

export function formatAddress(property: PropertyData): string {
  return `${property.address}, ${property.city}${property.state ? `, ${property.state}` : ""}${property.zip ? ` ${property.zip}` : ""}`
}
