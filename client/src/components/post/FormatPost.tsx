import { useRef } from "react";

import { postProps } from "../../util/mediaArrayType";
import MediaCarousel from "./components/MediaCarousel";
import LikePost from "./components/LikePost";
import ProfileButton from "./components/ProfileButton";
import MenuSectionDivider from "../navbar/menu_components/MenuSectionDivider";
import PostHashtags from "./components/PostHashtags";
import { useAuthContext } from "../../hooks/useAuthState";
import DeletePost from "../../pages/profile/components/DeletePost";

// post areas are initially rendered with an image located in the public
// folder and replaced with the post image once loaded for lazy loading
// and a better user experience.
const FormatPost = ({ post }: postProps) => {
  const datePosted = new Date(post.date_posted).toLocaleDateString();
  const totalPostLikesRef = useRef<number>(post.totalPostLikes);
  const {
    authentication: [authenticated],
  } = useAuthContext();

  return (
    <section className="w-60 bg-darkishgrey my-2 shadow-xl rounded-lg h-fit p-4">
      <div className="flex items-center justify-between mb-2 -mt-1 font-header text-lg">
        <ProfileButton
          username={post.username}
          profilePictureURL={post.profilePictureURL}
        />
        <h6 className="text-xs">{datePosted}</h6>
      </div>
      <MenuSectionDivider color="bg-blue" />
      <MediaCarousel srcURLs={post.mediaFileURLs} />
      <MenuSectionDivider color="bg-blue" />
      <p className="text-xs break-words">{post.description}</p>
      <PostHashtags hashtags={post.postHashtags} />

      <LikePost postId={post.post_id} totalPostLikesRef={totalPostLikesRef} />
      {authenticated && <DeletePost post={post} />}
    </section>
  );
};

export default FormatPost;
