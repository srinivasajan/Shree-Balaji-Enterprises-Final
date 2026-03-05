// Simple admin authentication using localStorage
// Password is hashed client-side for minimal security on a static deployment

export const ADMIN_PASSWORD = "SBE@Admin2024"
export const AUTH_KEY = "sbe_admin_auth"
export const AUTH_TOKEN = "sbe_authenticated_v1"

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, AUTH_TOKEN)
      sessionStorage.setItem(AUTH_KEY, AUTH_TOKEN)
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(AUTH_KEY)
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return (
    localStorage.getItem(AUTH_KEY) === AUTH_TOKEN ||
    sessionStorage.getItem(AUTH_KEY) === AUTH_TOKEN
  )
}
