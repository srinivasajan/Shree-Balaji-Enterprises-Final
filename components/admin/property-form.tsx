"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react"
import { PropertyData, AgentData } from "@/lib/data"
import { saveProperty, nextPropertyId } from "@/lib/admin-store"

interface PropertyFormProps {
  initialData?: Partial<PropertyData>
  initialType?: "buy" | "rent"
  agents: AgentData[]
  isEdit?: boolean
}

const PROPERTY_TYPES: Record<string, string[]> = {
  residential: [
    "Apartment", "House / Villa", "Independent Floor", "Studio Apartment",
    "Duplex", "Penthouse", "Row House", "Builder Floor", "Farmhouse", "Plot / Land",
  ],
  commercial: [
    "Office Space", "Shop / Showroom", "Commercial Plot", "Warehouse",
    "Co-working Space", "Hotel / Guest House", "Restaurant / Cafe", "Showroom / Retail Space",
  ],
  industrial: [
    "Factory / Industrial Shed", "Godown / Warehouse", "Industrial Plot", "Industrial Building",
  ],
}

const QUICK_FEATURES = [
  "Gated Community", "Lift / Elevator", "24x7 Security", "Power Backup",
  "Swimming Pool", "Gym / Fitness Center", "Club House", "Children Play Area",
  "Garden / Park", "CCTV Surveillance", "Intercom", "Rainwater Harvesting",
  "Solar Panels", "Visitor Parking", "Fire Safety", "Vastu Compliant",
]

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
const LABEL = "block text-xs font-semibold text-slate-500 mb-1"

const KNOWN_AREAS = [
  "Ambernath", "Badlapur", "Ulhasnagar", "Kalyan", "Dombivli", "Thane",
  "Bhiwandi", "Mumbra", "Titwala", "Asangaon", "Shahapur", "Murbad",
  "Khopoli", "Karjat", "Vasai", "Mira Road", "Mumbai", "Navi Mumbai", "Panvel",
]

export function PropertyFormComponent({
  initialData,
  initialType = "buy",
  agents,
  isEdit = false,
}: PropertyFormProps) {
  const router = useRouter()

  const defaultForSale = !initialData?.isRental && (initialType === "buy" || !initialType)
  const defaultForRent = !!initialData?.isRental || initialType === "rent"

  const [form, setForm] = useState<Partial<PropertyData>>({
    address: "", city: "", state: "Maharashtra", zip: "",
    locality: "", landmark: "",
    price: "", rentPrice: "", securityDeposit: "", maintenanceCharges: "",
    possessionDate: "", lockInPeriod: "", availableFrom: "",
    beds: undefined, baths: undefined, sqft: "",
    category: "residential", type: PROPERTY_TYPES.residential[0],
    status: "for-sale", description: "", features: [], images: [],
    facing: "", furnishing: "", ageOfProperty: "",
    daysOnMarket: undefined, yearBuilt: undefined,
    garage: undefined, stories: undefined, floor: undefined, totalFloors: undefined,
    hoaFee: "", heating: "", cooling: "", parking: "", tag: "",
    zestimate: "", monthlyPayment: "", lotSize: "",
    isFeatured: false, isTrending: false,
    isForSale: defaultForSale, isForRent: defaultForRent,
    ...initialData,
  })

  const [featureInput, setFeatureInput] = useState("")
  const [imageInput, setImageInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [saving, setSaving] = useState(false)
  const [cityCustom, setCityCustom] = useState(() => !!(initialData?.city && !KNOWN_AREAS.includes(initialData.city)))

  function set(key: keyof PropertyData, value: unknown) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function setCategory(cat: string) {
    const types = PROPERTY_TYPES[cat] ?? []
    setForm(prev => ({ ...prev, category: cat as PropertyData["category"], type: types[0] ?? "" }))
  }

  function addFeature() {
    const v = featureInput.trim()
    if (!v) return
    if (!(form.features ?? []).includes(v)) set("features", [...(form.features ?? []), v])
    setFeatureInput("")
  }

  function toggleQuickFeature(f: string) {
    const cur = form.features ?? []
    set("features", cur.includes(f) ? cur.filter(x => x !== f) : [...cur, f])
  }

  function removeFeature(i: number) {
    set("features", (form.features ?? []).filter((_, idx) => idx !== i))
  }

  function addImage() {
    const v = imageInput.trim()
    if (!v) return
    const imgs = [...(form.images ?? []), v]
    set("images", imgs)
    if (!form.image) set("image", imgs[0])
    setImageInput("")
  }

  function removeImage(i: number) {
    const imgs = (form.images ?? []).filter((_, idx) => idx !== i)
    set("images", imgs)
    if (i === 0) set("image", imgs[0] ?? "")
  }

  async function uploadFiles(files: FileList) {
    setUploading(true)
    setUploadError("")
    const newUrls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/imagekit/upload", { method: "POST", body: fd })
      const json = await res.json()
      if (res.ok) {
        newUrls.push(json.url)
      } else {
        setUploadError(json.error ?? "Upload failed")
      }
    }
    if (newUrls.length) {
      const merged = [...(form.images ?? []), ...newUrls]
      set("images", merged)
      if (!form.image) set("image", merged[0])
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const id = form.id ?? nextPropertyId()
    const autoTag =
      form.tag?.trim() ||
      (form.isForSale && form.isForRent
        ? "For Sale / Rent"
        : form.isForRent
        ? "For Rent"
        : "For Sale")

    const base: PropertyData = {
      id,
      image: form.image ?? form.images?.[0] ?? "",
      images: form.images ?? [],
      price: form.price ?? "",
      beds: form.beds !== undefined ? Number(form.beds) : 0,
      baths: form.baths !== undefined ? Number(form.baths) : 0,
      sqft: form.sqft ?? "",
      address: form.address ?? "",
      city: form.city ?? "",
      state: form.state ?? "Maharashtra",
      zip: form.zip,
      tag: autoTag,
      tagColor: "primary",
      type: form.type,
      category: form.category,
      status: form.status ?? "for-sale",
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
      lotSize: form.lotSize,
      description: form.description,
      features: form.features ?? [],
      listingAgent: agents[0],
      isRental: false,
      rentPrice: form.rentPrice,
      daysOnMarket: form.daysOnMarket !== undefined ? Number(form.daysOnMarket) : 0,
      zestimate: form.zestimate,
      monthlyPayment: form.monthlyPayment,
      hoaFee: form.hoaFee,
      garage: form.garage !== undefined ? Number(form.garage) : undefined,
      stories: form.stories ? Number(form.stories) : undefined,
      heating: form.heating,
      cooling: form.cooling,
      parking: form.parking,
      facing: form.facing,
      furnishing: form.furnishing,
      floor: form.floor !== undefined ? Number(form.floor) : undefined,
      totalFloors: form.totalFloors ? Number(form.totalFloors) : undefined,
      availableFrom: form.availableFrom,
      securityDeposit: form.securityDeposit,
      maintenanceCharges: form.maintenanceCharges,
      lockInPeriod: form.lockInPeriod,
      landmark: form.landmark,
      locality: form.locality,
      possessionDate: form.possessionDate,
      ageOfProperty: form.ageOfProperty,
      isFeatured: !!form.isFeatured,
      isTrending: !!form.isTrending,
      isForSale: !!form.isForSale,
      isForRent: !!form.isForRent,
    }

    if (form.isForSale) {
      saveProperty({ ...base, isRental: false }, "buy")
    }
    if (form.isForRent) {
      const rp = form.rentPrice?.trim()
      saveProperty(
        { ...base, isRental: true, status: "for-rent", price: rp ? rp + "/mo" : base.price },
        "rent"
      )
    }
    if (!form.isForSale && !form.isForRent) {
      saveProperty(base, "buy")
    }

    setTimeout(() => {
      setSaving(false)
      router.push("/admin/properties")
    }, 300)
  }

  const currentTypes = PROPERTY_TYPES[form.category ?? "residential"] ?? []

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* WHERE TO LIST */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-1 text-sm uppercase tracking-wide">Where to List</h2>
        <p className="text-xs text-slate-400 mb-4">Select all sections this property should appear in. You can pick multiple.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { key: "isForSale",  label: "For Sale",            sub: "Add to the For Sale listings page",     icon: "🏷️" },
            { key: "isForRent",  label: "For Rent",            sub: "Add to the For Rent listings page",     icon: "🔑" },
            { key: "isFeatured", label: "Featured Properties", sub: "Show in homepage Featured section",     icon: "⭐" },
            { key: "isTrending", label: "Trending Homes",      sub: "Show in homepage Trending section",     icon: "🔥" },
          ] as const).map(({ key, label, sub, icon }) => (
            <label
              key={key}
              className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${
                form[key]
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
              }`}
            >
              <input
                type="checkbox"
                checked={!!form[key]}
                onChange={e => set(key, e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded cursor-pointer accent-primary"
              />
              <div>
                <div className="text-sm font-bold text-slate-700">{icon} {label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* PROPERTY CATEGORY */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Property Category</h2>
        <div className="flex gap-3 flex-wrap">
          {(["residential", "commercial", "industrial"] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors ${
                form.category === cat
                  ? "bg-primary text-white border-primary"
                  : "border-slate-200 text-slate-600 hover:border-primary/60"
              }`}
            >
              {cat === "residential" ? "🏠 Residential" : cat === "commercial" ? "🏢 Commercial" : "🏭 Industrial"}
            </button>
          ))}
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={LABEL}>Property Name / Address</label>
            <input type="text" value={form.address ?? ""} onChange={e => set("address", e.target.value)}
              className={INPUT} placeholder="e.g. Royal Residency, Plot No. 24" />
          </div>
          <div>
            <label className={LABEL}>Locality / Area</label>
            <input type="text" value={form.locality ?? ""} onChange={e => set("locality", e.target.value)}
              className={INPUT} placeholder="e.g. Ambernath West" />
          </div>
          <div>
            <label className={LABEL}>Landmark / Near</label>
            <input type="text" value={form.landmark ?? ""} onChange={e => set("landmark", e.target.value)}
              className={INPUT} placeholder="e.g. Near Railway Station" />
          </div>
          <div>
            <label className={LABEL}>City / Area</label>
            <select
              value={cityCustom ? "__custom__" : (form.city ?? "")}
              onChange={e => {
                if (e.target.value === "__custom__") {
                  setCityCustom(true)
                } else {
                  setCityCustom(false)
                  set("city", e.target.value)
                }
              }}
              className={INPUT + " bg-white"}
              aria-label="City"
            >
              <option value="">— Select area —</option>
              {KNOWN_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              <option value="__custom__">Other (type below)</option>
            </select>
            {cityCustom && (
              <input
                type="text"
                value={form.city ?? ""}
                onChange={e => set("city", e.target.value)}
                className={INPUT + " mt-2"}
                placeholder="Type city name..."
                autoFocus
              />
            )}
          </div>
          <div>
            <label className={LABEL}>State</label>
            <input type="text" value={form.state ?? ""} onChange={e => set("state", e.target.value)}
              className={INPUT} placeholder="Maharashtra" />
          </div>
          <div>
            <label className={LABEL}>PIN Code</label>
            <input type="text" value={form.zip ?? ""} onChange={e => set("zip", e.target.value)}
              className={INPUT} placeholder="421501" />
          </div>
          <div>
            <label className={LABEL}>Property Type</label>
            <select
              value={form.type ?? currentTypes[0] ?? ""}
              onChange={e => set("type", e.target.value)}
              className={INPUT + " bg-white"}
              aria-label="Property type"
            >
              {currentTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* SALE PRICING */}
      {form.isForSale && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">🏷️ Sale Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={LABEL}>Sale Price</label>
              <input type="text" value={form.price ?? ""} onChange={e => set("price", e.target.value)}
                className={INPUT} placeholder="₹45 Lakh" />
            </div>
            <div>
              <label className={LABEL}>Listing Status</label>
              <select value={form.status ?? "for-sale"} onChange={e => set("status", e.target.value)}
                className={INPUT + " bg-white"} aria-label="Listing status">
                <option value="for-sale">For Sale</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Possession Date</label>
              <input type="text" value={form.possessionDate ?? ""} onChange={e => set("possessionDate", e.target.value)}
                className={INPUT} placeholder="Ready to Move / Dec 2025" />
            </div>
            <div>
              <label className={LABEL}>EMI / Monthly Payment</label>
              <input type="text" value={form.monthlyPayment ?? ""} onChange={e => set("monthlyPayment", e.target.value)}
                className={INPUT} placeholder="₹22,000/mo (estimated)" />
            </div>
            <div>
              <label className={LABEL}>Society / HOA Maintenance</label>
              <input type="text" value={form.hoaFee ?? ""} onChange={e => set("hoaFee", e.target.value)}
                className={INPUT} placeholder="₹2,500/mo" />
            </div>
            <div>
              <label className={LABEL}>Estimated Valuation</label>
              <input type="text" value={form.zestimate ?? ""} onChange={e => set("zestimate", e.target.value)}
                className={INPUT} placeholder="₹47 Lakh" />
            </div>
          </div>
        </div>
      )}

      {/* RENT PRICING */}
      {form.isForRent && (
        <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">🔑 Rent Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={LABEL}>Monthly Rent</label>
              <input type="text" value={form.rentPrice ?? ""} onChange={e => set("rentPrice", e.target.value)}
                className={INPUT} placeholder="₹18,000" />
            </div>
            <div>
              <label className={LABEL}>Security Deposit</label>
              <input type="text" value={form.securityDeposit ?? ""} onChange={e => set("securityDeposit", e.target.value)}
                className={INPUT} placeholder="₹54,000 (3 months)" />
            </div>
            <div>
              <label className={LABEL}>Maintenance Charges</label>
              <input type="text" value={form.maintenanceCharges ?? ""} onChange={e => set("maintenanceCharges", e.target.value)}
                className={INPUT} placeholder="₹1,500/mo (included / extra)" />
            </div>
            <div>
              <label className={LABEL}>Lock-in Period</label>
              <input type="text" value={form.lockInPeriod ?? ""} onChange={e => set("lockInPeriod", e.target.value)}
                className={INPUT} placeholder="6 months" />
            </div>
            <div>
              <label className={LABEL}>Available From</label>
              <input type="text" value={form.availableFrom ?? ""} onChange={e => set("availableFrom", e.target.value)}
                className={INPUT} placeholder="Immediate / 1 Apr 2026" />
            </div>
          </div>
        </div>
      )}

      {/* PROPERTY DETAILS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Property Details</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>Bedrooms</label>
            <input type="number" min={0} max={30} value={form.beds ?? ""} onChange={e => set("beds", e.target.value)}
              className={INPUT} placeholder="2" aria-label="Bedrooms" />
          </div>
          <div>
            <label className={LABEL}>Bathrooms</label>
            <input type="number" min={0} max={30} value={form.baths ?? ""} onChange={e => set("baths", e.target.value)}
              className={INPUT} placeholder="2" aria-label="Bathrooms" />
          </div>
          <div>
            <label className={LABEL}>Carpet Area (Sq.Ft.)</label>
            <input type="text" value={form.sqft ?? ""} onChange={e => set("sqft", e.target.value)}
              className={INPUT} placeholder="650" />
          </div>
          <div>
            <label className={LABEL}>Lot / Plot Size</label>
            <input type="text" value={form.lotSize ?? ""} onChange={e => set("lotSize", e.target.value)}
              className={INPUT} placeholder="1200 sqft / 50x24" />
          </div>
          <div>
            <label className={LABEL}>Floor No.</label>
            <input type="number" min={0} value={form.floor ?? ""} onChange={e => set("floor", e.target.value)}
              className={INPUT} placeholder="3" />
          </div>
          <div>
            <label className={LABEL}>Total Floors in Building</label>
            <input type="number" min={1} value={form.totalFloors ?? ""} onChange={e => set("totalFloors", e.target.value)}
              className={INPUT} placeholder="7" />
          </div>
          <div>
            <label className={LABEL}>Year Built</label>
            <input type="number" value={form.yearBuilt ?? ""} onChange={e => set("yearBuilt", e.target.value)}
              className={INPUT} placeholder="2019" />
          </div>
          <div>
            <label className={LABEL}>Age of Property</label>
            <input type="text" value={form.ageOfProperty ?? ""} onChange={e => set("ageOfProperty", e.target.value)}
              className={INPUT} placeholder="5 years / New Construction" />
          </div>
          <div>
            <label className={LABEL}>Facing</label>
            <select value={form.facing ?? ""} onChange={e => set("facing", e.target.value)}
              className={INPUT + " bg-white"} aria-label="Facing direction">
              <option value="">Select facing</option>
              {["East","West","North","South","North-East","North-West","South-East","South-West"].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL}>Furnishing</label>
            <select value={form.furnishing ?? ""} onChange={e => set("furnishing", e.target.value)}
              className={INPUT + " bg-white"} aria-label="Furnishing">
              <option value="">Select furnishing</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Fully Furnished">Fully Furnished</option>
            </select>
          </div>
          <div>
            <label className={LABEL}>Garage / Covered Parking</label>
            <input type="number" min={0} value={form.garage ?? ""} onChange={e => set("garage", e.target.value)}
              className={INPUT} placeholder="1" />
          </div>
          <div>
            <label className={LABEL}>Parking Type</label>
            <input type="text" value={form.parking ?? ""} onChange={e => set("parking", e.target.value)}
              className={INPUT} placeholder="Open / Covered / Basement" />
          </div>
        </div>
      </div>

      {/* ADDITIONAL INFORMATION */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Additional Information</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>Heating</label>
            <input type="text" value={form.heating ?? ""} onChange={e => set("heating", e.target.value)}
              className={INPUT} placeholder="Central / None" />
          </div>
          <div>
            <label className={LABEL}>Cooling / A/C</label>
            <input type="text" value={form.cooling ?? ""} onChange={e => set("cooling", e.target.value)}
              className={INPUT} placeholder="Split AC / Central AC / None" />
          </div>
          <div>
            <label className={LABEL}>Stories</label>
            <input type="number" min={1} value={form.stories ?? ""} onChange={e => set("stories", e.target.value)}
              className={INPUT} placeholder="2" />
          </div>
          <div>
            <label className={LABEL}>Days on Market</label>
            <input type="number" min={0} value={form.daysOnMarket ?? ""} onChange={e => set("daysOnMarket", e.target.value)}
              className={INPUT} placeholder="0" aria-label="Days on market" />
          </div>
          <div>
            <label className={LABEL}>Badge Label</label>
            <input type="text" value={form.tag ?? ""} onChange={e => set("tag", e.target.value)}
              className={INPUT} placeholder="New Launch / Ready to Move" />
            <p className="text-[11px] text-slate-400 mt-1">Leave blank to auto-set from listing type</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Description</h2>
        <textarea
          value={form.description ?? ""}
          onChange={e => set("description", e.target.value)}
          rows={5}
          className={INPUT + " resize-none"}
          placeholder="Describe the property — highlights, nearby schools, hospitals, transport, society facilities..."
        />
      </div>

      {/* FEATURES / AMENITIES */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-1 text-sm uppercase tracking-wide">Features / Amenities</h2>
        <p className="text-xs text-slate-400 mb-4">Click chips to quickly add common features, or type a custom one below.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_FEATURES.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => toggleQuickFeature(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                (form.features ?? []).includes(f)
                  ? "bg-primary text-white border-primary"
                  : "border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
              }`}
            >{f}</button>
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Type a custom feature and press Enter..."
          />
          <button type="button" onClick={addFeature} aria-label="Add feature"
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.features ?? []).map((f, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full font-medium">
              {f}
              <button type="button" onClick={() => removeFeature(i)} aria-label={`Remove ${f}`} className="hover:text-red-500 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {(form.features ?? []).length === 0 && (
            <p className="text-xs text-slate-400">No features selected yet.</p>
          )}
        </div>
      </div>

      {/* PROPERTY IMAGES */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Property Images</h2>
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors mb-3 ${
            uploading ? "border-primary/60 bg-primary/5" : "border-slate-200 hover:border-primary hover:bg-primary/5"
          }`}
        >
          <input type="file" accept="image/*" multiple className="hidden"
            onChange={e => e.target.files && uploadFiles(e.target.files)} disabled={uploading} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-primary">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">Uploading to ImageKit...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-400">
              <Upload className="h-7 w-7" />
              <p className="text-sm font-medium text-slate-600">Click or drag to upload images</p>
              <p className="text-xs">PNG, JPG, WEBP up to 20 MB each</p>
            </div>
          )}
        </label>
        {uploadError && <p className="text-xs text-red-500 mb-3">{uploadError}</p>}
        <details className="mb-3">
          <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 select-none">Or paste an image URL</summary>
          <div className="flex gap-2 mt-2">
            <input type="url" value={imageInput} onChange={e => setImageInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addImage() } }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="https://ik.imagekit.io/shreebalaji/..." />
            <button type="button" onClick={addImage} aria-label="Add image URL"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </details>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {(form.images ?? []).map((url, i) => (
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={() => removeImage(i)} aria-label="Remove image"
                  className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">Main</span>
              )}
            </div>
          ))}
          {(form.images ?? []).length === 0 && (
            <div className="aspect-video rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 col-span-2">
              <ImageIcon className="h-6 w-6 mb-1 opacity-50" />
              <p className="text-xs">No images yet</p>
            </div>
          )}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex items-center justify-end gap-3 pb-6">
        <button type="button" onClick={() => router.push("/admin/properties")}
          className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Property"}
        </button>
      </div>
    </form>
  )
}
