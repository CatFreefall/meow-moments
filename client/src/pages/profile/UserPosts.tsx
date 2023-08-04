import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { mediaArrayType } from "../../util/mediaArrayType";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";

type userPostsProps = {
  username: String;
};

const UserPosts = ({ username }: userPostsProps) => {
  const userPosts = useRef<mediaArrayType[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`/user-posts/${username}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) =>
        data[0].post_id === null
          ? nav(`/profile/${username}/user-not-found`)
          : (userPosts.current = data)
      );
  }, [username, nav]);

  return (
    <section>
      {userPosts.current.map((item, index) => {
        return (
          <div key={index}>
            <MenuSectionDivider />
            <FormatPost post={userPosts.current[index]} />
            <LikePost post={userPosts.current[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default UserPosts;
