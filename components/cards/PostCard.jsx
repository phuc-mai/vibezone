import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostCard = ({ post, creator, loggedInUser, update }) => {
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${loggedInUser.id}`);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const isSaved = userData?.savedPosts?.find((item) => item._id === post._id);
  const isLiked = userData?.likedPosts?.find((item) => item._id === post._id);

  const handleSave = async () => {
    const response = await fetch(
      `/api/user/${loggedInUser.id}/save/${post._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update()
  };

  const handleLike = async () => {
    const response = await fetch(
      `/api/user/${loggedInUser.id}/like/${post._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update()
  };

  const handleDelete = async () => {
    await fetch(`/api/post/${post._id}/${userData._id}`, {
      method: "DELETE",
    });
    update()
  }

  return (
    <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
      <div className="flex justify-between">
        <Link href={`/profile/${creator._id}/posts`}>
          <div className="flex gap-3 items-center">
            <Image
              src={creator.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small-semibold text-light-1">
                {creator.firstName} {creator.lastName}
              </p>
              <p className="text-subtle-medium text-light-3">
                @{creator.username}
              </p>
            </div>
          </div>
        </Link>

        {loggedInUser.id === creator.clerkId && (
          <Link href={`/edit-post/${post._id}`}>
            <BorderColor sx={{ color: "white", cursor: "pointer" }} />
          </Link>
        )}
      </div>

      <p className="text-body-normal text-light-1 max-sm:text-small-normal">
        {post.caption}
      </p>

      <Image
        src={post.postPhoto}
        alt="post photo"
        width={200}
        height={150}
        className="rounded-lg w-full"
      />

      <p className="text-base-semibold text-purple-1 max-sm:text-small-normal">
        {post.tag}
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {!isLiked ? (
            <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} onClick={() => handleLike()} />
          ) : (
            <Favorite sx={{ color: "red", cursor: "pointer" }} onClick={() => handleLike()} />
          )}
          <p className="text-light-1">{post.likes.length}</p>
        </div>

        {loggedInUser.id !== creator.clerkId &&
          (isSaved ? (
            <Bookmark sx={{ color: "purple", cursor: "pointer" }} onClick={() => handleSave()} />
          ) : (
            <BookmarkBorder sx={{ color: "white", cursor: "pointer" }} onClick={() => handleSave()} />
          ))}

          {loggedInUser.id === creator.clerkId && (
            <Delete sx={{ color: "white", cursor: "pointer" }} onClick={() => handleDelete()} />
          )}
      </div>
    </div>
  );
};

export default PostCard;
