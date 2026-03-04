"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterState {
  priceMin: string
  priceMax: string
  bedsMin: string
  bathsMin: string
  homeType: string[]
  furnishing: string[]
  possession: string[]
  facing: string[]
  sqftMin: string
  sqftMax: string
  sortBy: string
}

export function SearchFilters({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterState) => void
}) {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: "",
    priceMax: "",
    bedsMin: "",
    bathsMin: "",
    homeType: [],
    furnishing: [],
    possession: [],
    facing: [],
    sqftMin: "",
    sqftMax: "",
    sortBy: "Newest",
  })
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleFilter = (name: string) => {
    setActiveFilter(activeFilter === name ? null : name)
  }

  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    const next = { ...filters, [key]: value }
    setFilters(next)
    onFilterChange?.(next)
  }

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, next)
  }

  const priceRanges = [
    { label: "Any", min: "", max: "" },
    { label: "Under ₹30L", min: "", max: "3000000" },
    { label: "₹30L - ₹60L", min: "3000000", max: "6000000" },
    { label: "₹60L - ₹1Cr", min: "6000000", max: "10000000" },
    { label: "₹1Cr - ₹2Cr", min: "10000000", max: "20000000" },
    { label: "₹2Cr+", min: "20000000", max: "" },
  ]

  const homeTypes = ["Apartment", "Villa / Bungalow", "Plot / Land", "Shop", "Office", "Warehouse", "Townhome", "Multi-family"]
  const furnishingOptions = ["Furnished", "Semi-Furnished", "Unfurnished"]
  const possessionOptions = ["Ready to Move", "Under Construction", "New Launch"]
  const facingOptions = ["East", "West", "North", "South", "North-East", "South-West"]
  const sqftRanges = [
    { label: "Any", min: "", max: "" },
    { label: "Under 500 sqft", min: "", max: "500" },
    { label: "500 – 1000 sqft", min: "500", max: "1000" },
    { label: "1000 – 2000 sqft", min: "1000", max: "2000" },
    { label: "2000 sqft+", min: "2000", max: "" },
  ]
  const sortOptions = ["Newest", "Price (Low to High)", "Price (High to Low)", "Beds", "Sqft"]

  const moreActiveCount = [
    filters.homeType.length > 0,
    filters.furnishing.length > 0,
    filters.possession.length > 0,
    filters.facing.length > 0,
    filters.sqftMin || filters.sqftMax,
  ].filter(Boolean).length

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-2 py-3 px-4 bg-card border-b border-border">
        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("price")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
              filters.priceMin || filters.priceMax
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground hover:border-foreground/30"
            }`}
          >
            Price
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {activeFilter === "price" && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-50 min-w-[260px]">
              <p className="text-sm font-semibold text-foreground mb-3">Price Range</p>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      updateFilter("priceMin", range.min)
                      updateFilter("priceMax", range.max)
                      setActiveFilter(null)
                    }}
                    className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      filters.priceMin === range.min && filters.priceMax === range.max
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Beds & Baths */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("beds")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
              filters.bedsMin
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground hover:border-foreground/30"
            }`}
          >
            {"Beds & Baths"}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {activeFilter === "beds" && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-50 min-w-[280px]">
              <p className="text-sm font-semibold text-foreground mb-3">Bedrooms</p>
              <div className="flex gap-2 mb-4">
                {["Any", "1+", "2+", "3+", "4+", "5+"].map((opt) => (
                  <button
                    key={`bed-${opt}`}
                    onClick={() => updateFilter("bedsMin", opt === "Any" ? "" : opt.replace("+", ""))}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                      (opt === "Any" && !filters.bedsMin) || filters.bedsMin === opt.replace("+", "")
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-foreground mb-3">Bathrooms</p>
              <div className="flex gap-2">
                {["Any", "1+", "2+", "3+", "4+"].map((opt) => (
                  <button
                    key={`bath-${opt}`}
                    onClick={() => {
                      updateFilter("bathsMin", opt === "Any" ? "" : opt.replace("+", ""))
                      setActiveFilter(null)
                    }}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                      (opt === "Any" && !filters.bathsMin) || filters.bathsMin === opt.replace("+", "")
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Home Type */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("homeType")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
              filters.homeType.length > 0
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground hover:border-foreground/30"
            }`}
          >
            Home Type
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {activeFilter === "homeType" && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-50 min-w-[220px]">
              <p className="text-sm font-semibold text-foreground mb-3">Home Type</p>
              <div className="flex flex-col gap-2">
                {homeTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.homeType.includes(type)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...filters.homeType, type]
                          : filters.homeType.filter((t) => t !== type)
                        updateFilter("homeType", next)
                      }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-3 w-full py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Filters button */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("more")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
              moreActiveCount > 0
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground hover:border-foreground/30"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {moreActiveCount > 0 && (
              <span className="ml-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {moreActiveCount}
              </span>
            )}
          </button>

          {activeFilter === "more" && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-5 z-50 w-[420px] max-h-[80vh] overflow-y-auto">

              {/* Property Type */}
              <p className="text-sm font-semibold text-foreground mb-2">Property Type</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {homeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleArrayFilter("homeType", type)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      filters.homeType.includes(type)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Furnishing */}
              <p className="text-sm font-semibold text-foreground mb-2">Furnishing</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {furnishingOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArrayFilter("furnishing", opt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      filters.furnishing.includes(opt)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Possession Status */}
              <p className="text-sm font-semibold text-foreground mb-2">Possession Status</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {possessionOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArrayFilter("possession", opt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      filters.possession.includes(opt)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Area (sqft) */}
              <p className="text-sm font-semibold text-foreground mb-2">Area (sqft)</p>
              <div className="flex flex-col gap-1.5 mb-4">
                {sqftRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      updateFilter("sqftMin", range.min)
                      updateFilter("sqftMax", range.max)
                    }}
                    className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      filters.sqftMin === range.min && filters.sqftMax === range.max
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Facing */}
              <p className="text-sm font-semibold text-foreground mb-2">Facing</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {facingOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArrayFilter("facing", opt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      filters.facing.includes(opt)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    updateFilter("homeType", [])
                    updateFilter("furnishing", [])
                    updateFilter("possession", [])
                    updateFilter("facing", [])
                    updateFilter("sqftMin", "")
                    updateFilter("sqftMax", "")
                  }}
                  className="flex-1 py-2 text-sm font-semibold text-foreground border border-border rounded-md hover:bg-muted transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setActiveFilter(null)}
                  className="flex-1 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => toggleFilter("sort")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Sort: {filters.sortBy}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {activeFilter === "sort" && (
            <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg py-2 z-50 min-w-[200px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    updateFilter("sortBy", opt)
                    setActiveFilter(null)
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    filters.sortBy === opt
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden flex items-center gap-2 px-4 py-3 bg-card border-b border-border overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full border border-border text-foreground shrink-0"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
        {["Price", "Beds", "Home Type", "Sort"].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-full border border-border text-foreground shrink-0"
          >
            {label}
            <ChevronDown className="h-3 w-3" />
          </button>
        ))}
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100vh-130px)]">
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3">Price Range</p>
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      updateFilter("priceMin", range.min)
                      updateFilter("priceMax", range.max)
                    }}
                    className={`block w-full text-left px-3 py-2.5 text-sm rounded-md mb-1 transition-colors ${
                      filters.priceMin === range.min && filters.priceMax === range.max
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3">Bedrooms</p>
                <div className="flex gap-2 flex-wrap">
                  {["Any", "1+", "2+", "3+", "4+", "5+"].map((opt) => (
                    <button
                      key={`mob-bed-${opt}`}
                      onClick={() => updateFilter("bedsMin", opt === "Any" ? "" : opt.replace("+", ""))}
                      className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                        (opt === "Any" && !filters.bedsMin) || filters.bedsMin === opt.replace("+", "")
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3">Home Type</p>
                {homeTypes.map((type) => (
                  <label key={`mob-${type}`} className="flex items-center gap-2.5 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.homeType.includes(type)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...filters.homeType, type]
                          : filters.homeType.filter((t) => t !== type)
                        updateFilter("homeType", next)
                      }}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <Button onClick={() => setMobileFiltersOpen(false)} className="w-full">
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Click-away overlay for desktop dropdowns */}
      {activeFilter && (
        <div
          className="hidden md:block fixed inset-0 z-40"
          onClick={() => setActiveFilter(null)}
        />
      )}
    </>
  )
}
