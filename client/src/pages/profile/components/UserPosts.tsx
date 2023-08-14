import { useRef, useEffect } from "react";

import usePosts from "../../../hooks/usePosts";
import FormatPost from "../../../components/post/FormatPost";

type UserPostsProps = {
  username: string;
};

const UserPosts = ({ username }: UserPostsProps) => {
  const { content } = usePosts({ user: username });
  const totalPostLikesRef = useRef<number>(0);

  useEffect(() => {
    totalPostLikesRef.current =
      content.length > 0 ? content[0].totalPostLikes : 0;
  }, [content]);

  return (
    <section>
      {content.map((item: any, index: number) => {
        return (
          <div key={index} className="flex justify-center">
            <FormatPost post={content[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default UserPosts;
