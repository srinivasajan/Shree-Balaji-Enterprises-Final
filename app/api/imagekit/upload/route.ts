import { NextRequest, NextResponse } from "next/server"

const IK_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"
const IK_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY ?? ""

export async function POST(req: NextRequest) {
  if (!IK_PRIVATE_KEY) {
    return NextResponse.json(
      { error: "ImageKit private key not configured. Add IMAGEKIT_PRIVATE_KEY to .env.local" },
      { status: 500 }
    )
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = formData.get("file") as File | null
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // Validate image type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
  }

  // Validate size (max 20 MB)
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large. Maximum size is 20 MB." }, { status: 400 })
  }

  const ikBody = new FormData()
  ikBody.append("file", file)
  ikBody.append("fileName", file.name.replace(/\s+/g, "-"))
  ikBody.append("folder", "/properties")
  ikBody.append("useUniqueFileName", "true")

  // ImageKit uses HTTP Basic Auth: privateKey as username, empty password
  const credentials = Buffer.from(`${IK_PRIVATE_KEY}:`).toString("base64")

  let ikRes: Response
  try {
    ikRes = await fetch(IK_UPLOAD_URL, {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
      body: ikBody,
    })
  } catch {
    return NextResponse.json({ error: "Failed to reach ImageKit" }, { status: 502 })
  }

  if (!ikRes.ok) {
    const detail = await ikRes.text()
    return NextResponse.json({ error: "ImageKit upload failed", detail }, { status: 502 })
  }

  const data = await ikRes.json()

  // Return optimised URL with ImageKit transformations
  const url = `${data.url}?tr=w-800,h-600,q-85,fo-auto`

  return NextResponse.json({ url, fileId: data.fileId, name: data.name })
}
