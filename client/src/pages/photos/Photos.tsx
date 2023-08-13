import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";
import Footer from "../../components/common/Footer";

const Photos = () => {
  const { content } = usePosts({ mediaType: "photos" });

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="mt-16">
        {content.map((item: any, index: number) => {
          return (
            <div key={index} className="flex justify-center">
              <FormatPost post={content[index]} />
            </div>
          );
        })}
      </main>
      <Footer />
    </section>
  );
};

export default Photos;
