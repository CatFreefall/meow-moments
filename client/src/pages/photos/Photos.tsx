import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";

const Photos = () => {
  const { content } = usePosts("photos");

  return (
    <section className="mt-16">
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

export default Photos;
