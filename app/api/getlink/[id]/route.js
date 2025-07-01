import { dbConnect } from "@/lib/db"
import { Url } from "@/model/Url"

export async function GET(request, { params }) {
  try {
    // Get the shortUrl from route params
    const shortUrl = await params.id

    await dbConnect()

    const entry = await Url.findOneAndUpdate(
      { shortUrl },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true },
    )
    console.log(entry)

    if (entry) {
      return Response.redirect(entry.redirectUrl)
    } else {
      return Response.json(
        {
          success: false,
          message: "Short URL not found",
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.log("Error fetching URL:", error)
    return Response.json(
      {
        success: false,
        message: "Error fetching URL",
      },
      { status: 500 },
    )
  }
}
