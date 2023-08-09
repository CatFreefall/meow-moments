import FormatPost from "../../../components/post/FormatPost";
import LikePost from "../../../components/post/LikePost";
import usePosts from "../../../hooks/usePosts";
import MenuSectionDivider from "../../../components/navbar/menu_components/MenuSectionDivider";
import DeletePost from "./DeletePost";

type userPostsProps = {
  username: string;
};

// TODO: render the button to delete a post conditionally
const UserPosts = ({ username }: userPostsProps) => {
  const { content } = usePosts(username);

  return (
    <section>
      {content.map((item: any, index: number) => {
        return (
          <div key={index}>
            <MenuSectionDivider />
            <FormatPost post={content[index]} />
            <LikePost post={content[index]} />
            <DeletePost post={content[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default UserPosts;
