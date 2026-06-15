import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const { shorturl } = await params;

  const client = await clientPromise;
  const db = client.db("cliplink");
  const collection = db.collection("url");

  const check = await collection.findOne({
    shorturl:shorturl
  })

  if (check) {
    redirect(check.url)
  }
  else{
    redirect(`${process.env.NEXT_PUBLIC_HOST}`)
  }
  // return <div>My Post: {shorturl}</div>;
}
