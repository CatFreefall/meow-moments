import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";

const Photos = () => {
  const { content } = usePosts("photos");

  return (
    <section>
      {content.map((item: any, index: number) => {
        return (
          <div className="mt-16" key={index}>
            <FormatPost post={content[index]} />
            <LikePost post={content[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default Photos;
