import Post from "@lib/models/Post"
import { connectToDB } from "@lib/mongodb/mongoose"

export const GET = async (req) => {
  try {
    await connectToDB()

    const feedPosts = await Post.find().populate("creator likes").exec()

    return new Response(JSON.stringify(feedPosts), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to fetch all Feed Posts", { status: 500 })
  }
}