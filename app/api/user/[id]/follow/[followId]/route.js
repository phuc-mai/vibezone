import User from "@lib/models/User"
import { connectToDB } from "@lib/mongodb/mongoose"

export const POST = async (req, { params }) => {
  try {
    await connectToDB()

    const userId = params.id
    const followId = params.followId

    const user = await User.findOne({ clerkId: userId }).populate("posts savedPosts likedPosts followers following")
    const personToFollow = await User.findById(followId).populate("posts savedPosts likedPosts followers following")

    const isFollowing = user?.following.find((item) => item._id.toString() === followId)

    if (isFollowing) {
      user.following = user.following.filter((item) => item._id.toString() !== followId)
      personToFollow.followers = personToFollow.followers.filter((item) => item._id.toString() !== user._id.toString())
    } else {
      user.following.push(personToFollow)
      personToFollow.followers.push(user)
    }

    await user.save()
    await personToFollow.save()

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to follow/unfollow user", { status: 500 })
  }
}