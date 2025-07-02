import { dbConnect } from "@/lib/db";
import { Url } from "@/model/Url";
import shortid from "shortid"; 

export async function POST(request) {
  try {
    const body = await request.json(); 
    const shortUrl = shortid.generate();
    await dbConnect();

    const url = await Url.create({
      shortUrl: shortUrl,
      redirectUrl: body.url, 
      visitHistory: [],
    });

    if (url) {
      return Response.json({
        success: true,
        shortUrl: shortUrl,
        redirectUrl: body.url,
        message: "Short URL generated successfully",
      });
    } else {
      return Response.json(
        {
          success: false,
          message: "Failed to create URL entry",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error generating short URL:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to generate short URL",
      },
      { status: 500 }
    );
  }
}
