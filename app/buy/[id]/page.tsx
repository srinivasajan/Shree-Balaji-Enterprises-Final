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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id: rawId } = await params
  const id = Number(rawId)
  const property = buyProperties.find((p) => p.id === id)

  if (!property) {
    return {
      title: "Property Not Found",
    }
  }

  const title = property.tag === "New Launch" 
    ? `New Launch: ${property.type?.toUpperCase()} in ${property.city} | ${property.price}`
    : `${property.type?.toUpperCase() || 'Property'} for Sale in ${property.city} | ${property.price}`

  const description = property.description 
    ? property.description.slice(0, 155) + "..."
    : `Buy this beautiful ${property.beds ? property.beds + ' BHK ' : ''}property located at ${formatAddress(property)}. Contact Shree Balaji Enterprises for site visit today.`

  const images = property.images && property.images.length > 0 
    ? property.images[0] 
    : property.image

  const canonicalUrl = `https://www.shreebalajienterprises.live/buy/${id}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: images,
          width: 1200,
          height: 630,
          alt: `Property for sale: ${property.address}, ${property.city}`,
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

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: rawId } = await params
  const id = Number(rawId)
  const property = buyProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  const similar = buyProperties.filter((p) => p.id !== id).slice(0, 4)

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `https://www.shreebalajienterprises.live/buy/${property.id}#listing`,
    name: `${property.beds ? property.beds + " BHK " : ""}${property.type || "Property"} for Sale in ${property.city}`,
    description: property.description,
    url: `https://www.shreebalajienterprises.live/buy/${property.id}`,
    image: property.images || [property.image],
    datePosted: "2026-02-24",
    about: {
      "@type": property.type === "apartment" ? "Apartment" : property.type === "house" ? "House" : "SingleFamilyResidence",
      name: `${property.address}, ${property.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: property.state || "Maharashtra",
        addressCountry: "IN",
      },
      ...(property.lat && property.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: property.lat,
              longitude: property.lng,
            },
          }
        : {}),
      ...(property.beds > 0 ? { numberOfBedrooms: property.beds } : {}),
      ...(property.baths > 0 ? { numberOfBathroomsTotal: property.baths } : {}),
      ...(property.sqft && property.sqft !== "On Request"
        ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: property.sqft,
              unitText: "SQFT",
            },
          }
        : {}),
    },
    offers: {
      "@type": "Offer",
      url: `https://www.shreebalajienterprises.live/buy/${property.id}`,
      priceCurrency: "INR",
      price: property.priceNum || 0,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        price: property.priceNum || 0,
        description: property.price,
      },
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Shree Balaji Enterprises",
        telephone: "+917767805544",
        url: "https://www.shreebalajienterprises.live",
      },
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shreebalajienterprises.live",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Buy",
        item: "https://www.shreebalajienterprises.live/buy",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.address,
        item: `https://www.shreebalajienterprises.live/buy/${property.id}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

