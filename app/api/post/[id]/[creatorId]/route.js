import Post from "@lib/models/Post";
import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);

    const user = await User.findByIdAndUpdate(
      params.creatorId,
      { $pull: { posts: params.id } },
      { new: true, useFindAndModify: false }
    )
      .populate("posts savedPosts likedPosts followers following")
      .exec();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to delete the post", { status: 500 });
  }
};
