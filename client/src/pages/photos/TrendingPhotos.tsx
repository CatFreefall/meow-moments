import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";

const TrendingPhotos = () => {
  const { content } = usePosts("photos");

  // creating a copy of the content object as an array so that I can sort
  // by totalPostLikes
  const contentArray = [...content];
  contentArray.sort((a, b) => b.totalPostLikes - a.totalPostLikes);

  return (
    <section className="mt-16">
      {contentArray.map((item: any, index: number) => {
        return (
          <div key={index} className="flex justify-center">
            <FormatPost post={contentArray[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default TrendingPhotos;