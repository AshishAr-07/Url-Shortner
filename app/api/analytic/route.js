import { dbConnect } from "@/lib/db";
import { Url } from "@/model/Url";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const shortUrlId = searchParams.get("id");

    if (!shortUrlId) {
      return Response.json(
        {
          success: false,
          message: "Short URL ID is required",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const entry = await Url.findOne({ shortUrl: shortUrlId });

    if (entry) {
      return Response.json({
        success: true,
        totalClicks: entry.visitHistory.length,
        entry,
      });
    } else {
      return Response.json(
        {
          success: false,
          message: "Short URL not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error, "Error in getting analytics");
    return Response.json(
      {
        success: false,
        message: "Error fetching analytics",
      },
      { status: 500 }
    );
  }
}
