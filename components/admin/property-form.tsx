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

const BLANK: Partial<PropertyData> = {
  address: "", city: "", state: "Maharashtra", zip: "", price: "",
  beds: 1, baths: 1, sqft: "", type: "apartment", status: "for-sale",
  description: "", features: [], images: [], tag: "For Sale",
  daysOnMarket: 0, yearBuilt: undefined, garage: undefined, stories: undefined,
  hoaFee: "", heating: "", cooling: "", parking: "",
  isFeatured: false, isTrending: false,
}

export function PropertyFormComponent({ initialData, initialType = "buy", agents, isEdit = false }: PropertyFormProps) {
  const router = useRouter()
  const [propType, setPropType] = useState<"buy" | "rent">(initialType)
  const [form, setForm] = useState<Partial<PropertyData>>({ ...BLANK, ...initialData })
  const [featureInput, setFeatureInput] = useState("")
  const [imageInput, setImageInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set(key: keyof PropertyData, value: unknown) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.address?.trim()) e.address = "Address is required"
    if (!form.city?.trim()) e.city = "City is required"
    if (!form.price?.trim()) e.price = "Price is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function addFeature() {
    if (!featureInput.trim()) return
    set("features", [...(form.features ?? []), featureInput.trim()])
    setFeatureInput("")
  }

  function removeFeature(i: number) {
    set("features", (form.features ?? []).filter((_, idx) => idx !== i))
  }

  function addImage() {
    if (!imageInput.trim()) return
    const imgs = [...(form.images ?? []), imageInput.trim()]
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
      const current = form.images ?? []
      const merged = [...current, ...newUrls]
      set("images", merged)
      if (!form.image) set("image", merged[0])
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    const id = form.id ?? nextPropertyId()
    const data: PropertyData = {
      id,
      image: form.image ?? form.images?.[0] ?? "",
      images: form.images ?? [],
      price: form.price ?? "",
      beds: Number(form.beds ?? 1),
      baths: Number(form.baths ?? 1),
      sqft: form.sqft ?? "",
      address: form.address ?? "",
      city: form.city ?? "",
      state: form.state ?? "Maharashtra",
      zip: form.zip,
      tag: form.tag ?? (propType === "rent" ? "For Rent" : "For Sale"),
      tagColor: "primary",
      type: form.type,
      status: propType === "rent" ? "for-rent" : (form.status ?? "for-sale"),
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
      lotSize: form.lotSize,
      description: form.description,
      features: form.features ?? [],
      listingAgent: agents[0],
      isRental: propType === "rent",
      rentPrice: propType === "rent" ? form.price : undefined,
      daysOnMarket: Number(form.daysOnMarket ?? 0),
      zestimate: form.zestimate,
      monthlyPayment: form.monthlyPayment,
      hoaFee: form.hoaFee,
      garage: form.garage ? Number(form.garage) : undefined,
      stories: form.stories ? Number(form.stories) : undefined,
      heating: form.heating,
      cooling: form.cooling,
      parking: form.parking,
      isFeatured: !!form.isFeatured,
      isTrending: !!form.isTrending,
    }
    setTimeout(() => {
      saveProperty(data, propType)
      setSaving(false)
      router.push("/admin/properties")
    }, 400)
  }

  const err = (k: string) => errors[k] && <p className="text-red-500 text-xs mt-1">{errors[k]}</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Listing type toggle */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Listing Type</h2>
        <div className="flex gap-3">
          {(["buy", "rent"] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setPropType(t)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold border-2 transition-colors ${propType === t ? "bg-primary text-white border-primary" : "border-slate-200 text-slate-600 hover:border-primary"}`}
            >
              {t === "buy" ? "For Sale" : "For Rent"}
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Property Name / Address *</label>
            <input type="text" value={form.address ?? ""} onChange={e => set("address", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="e.g. Royal Residency, Plot No. 24" />
            {err("address")}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">City *</label>
            <input type="text" value={form.city ?? ""} onChange={e => set("city", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Ambernath" />
            {err("city")}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
            <input type="text" value={form.state ?? ""} onChange={e => set("state", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Maharashtra" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">PIN Code</label>
            <input type="text" value={form.zip ?? ""} onChange={e => set("zip", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="421501" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Property Type</label>
            <select aria-label="Property type" value={form.type ?? "apartment"} onChange={e => set("type", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
              {["apartment","house","condo","townhome","land","multi-family"].map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Details */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Pricing & Details</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Price *</label>
            <input type="text" value={form.price ?? ""} onChange={e => set("price", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="₹45 Lakh" />
            {err("price")}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Bedrooms</label>
            <input type="number" min={0} max={20} value={form.beds ?? 1} aria-label="Bedrooms" onChange={e => set("beds", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Bathrooms</label>
            <input type="number" min={0} max={20} value={form.baths ?? 1} aria-label="Bathrooms" onChange={e => set("baths", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Sq. Ft.</label>
            <input type="text" value={form.sqft ?? ""} onChange={e => set("sqft", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="850" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Year Built</label>
            <input type="number" value={form.yearBuilt ?? ""} onChange={e => set("yearBuilt", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="2022" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Garage</label>
            <input type="number" min={0} value={form.garage ?? ""} onChange={e => set("garage", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="1" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Lot Size</label>
            <input type="text" value={form.lotSize ?? ""} onChange={e => set("lotSize", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="1200 sqft" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Parking</label>
            <input type="text" value={form.parking ?? ""} onChange={e => set("parking", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Open / Covered" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Days on Market</label>
            <input type="number" min={0} value={form.daysOnMarket ?? 0} aria-label="Days on market" onChange={e => set("daysOnMarket", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          {propType === "buy" && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select aria-label="Property status" value={form.status ?? "for-sale"} onChange={e => set("status", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                <option value="for-sale">For Sale</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Badge Label</label>
            <input type="text" value={form.tag ?? ""} onChange={e => set("tag", e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="New Launch" />
          </div>
        </div>
      </div>

      {/* Homepage Visibility */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Homepage Visibility</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={!!form.isFeatured}
              onChange={e => set("isFeatured", e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 accent-amber-500 cursor-pointer"
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
              ⭐ Show in Featured Properties
            </span>
            <span className="text-xs text-slate-400">(Homepage featured section)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={!!form.isTrending}
              onChange={e => set("isTrending", e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 accent-emerald-600 cursor-pointer"
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
              🔥 Show in Trending Homes
            </span>
            <span className="text-xs text-slate-400">(Homepage trending section)</span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Description</h2>
        <textarea
          value={form.description ?? ""}
          onChange={e => set("description", e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          placeholder="Describe the property…"
        />
      </div>

      {/* Features */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Features / Amenities</h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="e.g. Gated Community, Swimming Pool…"
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
              <button type="button" onClick={() => removeFeature(i)} aria-label="Remove feature" className="hover:text-red-500 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {(form.features ?? []).length === 0 && <p className="text-xs text-slate-400">No features added yet.</p>}
        </div>
      </div>

      {/* Images */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Property Images</h2>
        {/* File upload area */}
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors mb-3 ${
            uploading ? "border-primary/60 bg-primary/5" : "border-slate-200 hover:border-primary hover:bg-primary/5"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && uploadFiles(e.target.files)}
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-primary">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">Uploading to ImageKit…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-400">
              <Upload className="h-7 w-7" />
              <p className="text-sm font-medium text-slate-600">Click to upload images</p>
              <p className="text-xs">PNG, JPG, WEBP up to 20 MB each</p>
            </div>
          )}
        </label>
        {uploadError && <p className="text-xs text-red-500 mb-3">{uploadError}</p>}
        {/* Paste URL fallback */}
        <details className="mb-3">
          <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600 select-none">Or paste an image URL</summary>
          <div className="flex gap-2 mt-2">
            <input
              type="url"
              value={imageInput}
              onChange={e => setImageInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addImage() } }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="https://ik.imagekit.io/shreebalaji/…"
            />
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

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => router.push("/admin/properties")}
          className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Property"}
        </button>
      </div>
    </form>
  )
}
