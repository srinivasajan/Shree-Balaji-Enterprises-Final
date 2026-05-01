import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PropertyDetailClient } from "@/components/property-detail-client"
import { buyProperties, formatAddress } from "@/lib/data"

// This ensures we can generate static routes for all buy properties if desired
export async function generateStaticParams() {
  return buyProperties.map((property) => ({
    id: property.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = Number(params.id)
  const property = buyProperties.find((p) => p.id === id)

  if (!property) {
    return {
      title: "Property Not Found | Shree Balaji Enterprises",
    }
  }

  const title = property.tag === "New Launch" 
    ? `New Launch: ${property.type?.toUpperCase()} in ${property.city} | ${property.price}`
    : `${property.type?.toUpperCase() || 'Property'} for Sale in ${property.city} | ${property.price}`

  const description = property.description 
    ? property.description.slice(0, 155) + "..."
    : `Buy this beautiful ${property.beds ? property.beds + ' BHK ' : ''}property located at ${formatAddress(property)}. Contact us for a site visit today.`

  const images = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.shreebalajienterprises.live/buy/${id}`,
      type: "article",
      images: [
        {
          url: images,
          width: 1200,
          height: 630,
          alt: `Property located at ${property.address}`,
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

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  const property = buyProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const similar = buyProperties.filter((p) => p.id !== id).slice(0, 4)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${property.beds ? property.beds + ' BHK ' : ''}${property.type || 'Property'} in ${property.city}`,
    "image": property.images || [property.image],
    "description": property.description,
    "sku": `SBE-BUY-${property.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Shree Balaji Enterprises"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.shreebalajienterprises.live/buy/${property.id}`,
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
      <PropertyDetailClient 
        initialProperty={property} 
        initialSimilar={similar} 
        id={id} 
        type="buy" 
      />
    </>
  )
}
