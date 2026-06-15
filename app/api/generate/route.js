import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("cliplink");
  const collection = db.collection("url");

  if (!body.shorturl.trim()) {
    let unique = false;

    while (!unique) {
      const randomAlias = Math.random().toString(36).substring(2, 8);

      const exists = await collection.findOne({
        shorturl: randomAlias,
      });

      if (!exists) {
        body.shorturl = randomAlias;
        unique = true;
      }
    }
  }

  const check = await collection.findOne({
    shorturl: body.shorturl,
  });
  if (check) {
    return Response.json({
      success: false,
      error: true,
      message: "url exists",
    });
  }
  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
  });

  return Response.json({
    success: true,
    error: false,
    message: "url generated!!!",
    shorturl: body.shorturl,
  });
}
