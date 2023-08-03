import { useEffect, useRef } from "react";

import { mediaArrayType } from "../../util/mediaArrayType";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import { Menu } from "../../components/navbar/menu_components/Menu";
import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";

type userPostsProps = {
  username: String;
  setUserPosts: React.Dispatch<React.SetStateAction<mediaArrayType[]>>;
};

const UserPosts = ({ username, setUserPosts }: userPostsProps) => {
  const userPosts = useRef<mediaArrayType[]>([]);

  useEffect(() => {
    fetch(`/user-posts/${username}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => (userPosts.current = data));
  }, [username]);

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
