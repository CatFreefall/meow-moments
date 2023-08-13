import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";
import Footer from "../../components/common/Footer";

const TrendingIllustrations = () => {
  const { content } = usePosts({ mediaType: "illustrations" });

  // creating a copy of the content object as an array so that I can sort
  // by totalPostLikes
  const contentArray = [...content];
  contentArray.sort((a, b) => b.totalPostLikes - a.totalPostLikes);

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="mt-16">
        {contentArray.map((item: any, index: number) => {
          return (
            <div key={index} className="flex justify-center">
              <FormatPost post={item} />
            </div>
          );
        })}
      </main>
      <Footer />
    </section>
  );
};

export default TrendingIllustrations;
