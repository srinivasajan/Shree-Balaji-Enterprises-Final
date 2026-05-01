import { Metadata } from "next"
import { notFound } from "next/navigation"
import { RentalDetailClient } from "@/components/rental-detail-client"
import { rentalProperties, formatAddress } from "@/lib/data"

// Ensures static routes can be pre-rendered for rentals
export async function generateStaticParams() {
  return rentalProperties.map((property) => ({
    id: property.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = Number(params.id)
  const property = rentalProperties.find((p) => p.id === id)

  if (!property) {
    return {
      title: "Rental Not Found | Shree Balaji Enterprises",
    }
  }

  const title = `Rent ${property.type?.toUpperCase() || 'Property'} in ${property.city} | ${property.price}`
  const description = property.description 
    ? property.description.slice(0, 155) + "..."
    : `Rent this beautiful ${property.beds ? property.beds + ' BHK ' : ''}property located at ${formatAddress(property)}. Available now. Contact us today.`

  const images = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.shreebalajienterprises.live/rent/${id}`,
      type: "article",
      images: [
        {
          url: images,
          width: 1200,
          height: 630,
          alt: `Rental property located at ${property.address}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images],
    },
  }
}

export default function RentalDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const property = rentalProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const similar = rentalProperties.filter((p) => p.id !== id).slice(0, 4)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${property.beds ? property.beds + ' BHK ' : ''}${property.type || 'Property'} for Rent in ${property.city}`,
    "image": property.images || [property.image],
    "description": property.description,
    "sku": `SBE-RENT-${property.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Shree Balaji Enterprises"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.shreebalajienterprises.live/rent/${property.id}`,
      "priceCurrency": "INR",
      "price": property.priceNum || 0,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": property.listingAgent?.name || "Anju Jangiti"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RentalDetailClient 
        initialProperty={property} 
        initialSimilar={similar} 
        id={id} 
      />
    </>
  )
}
