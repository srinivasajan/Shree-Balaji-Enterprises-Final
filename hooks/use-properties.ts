"use client"

import { useState, useEffect } from "react"
import { buyProperties, rentalProperties, PropertyData } from "@/lib/data"
import { getBuyProperties, getRentProperties } from "@/lib/admin-store"

/**
 * Returns buy properties from the admin store (localStorage).
 * Falls back to the static data on first render (SSR-safe).
 */
export function useBuyProperties(): PropertyData[] {
  const [props, setProps] = useState<PropertyData[]>(buyProperties)
  useEffect(() => {
    setProps(getBuyProperties())
  }, [])
  return props
}

/**
 * Returns rent properties from the admin store (localStorage).
 */
export function useRentProperties(): PropertyData[] {
  const [props, setProps] = useState<PropertyData[]>(rentalProperties)
  useEffect(() => {
    setProps(getRentProperties())
  }, [])
  return props
}

/**
 * Returns all buy properties flagged as featured.
 * If none are explicitly marked, returns all (graceful default).
 */
export function useFeaturedProperties(): PropertyData[] {
  const all = useBuyProperties()
  const explicit = all.filter((p) => p.isFeatured === true)
  return explicit.length > 0 ? explicit : all
}

/**
 * Returns all buy properties flagged as trending.
 * If none are explicitly marked, returns all (graceful default).
 */
export function useTrendingProperties(): PropertyData[] {
  const all = useBuyProperties()
  const explicit = all.filter((p) => p.isTrending === true)
  return explicit.length > 0 ? explicit : all
}
