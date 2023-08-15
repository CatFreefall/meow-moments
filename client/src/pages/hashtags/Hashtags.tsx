import IndividualTag from "./components/IndividualTag";
import { tag } from "../../util/tagType";
import Footer from "../../components/common/Footer";
import useHashtags from "../../hooks/useHashtags";

const Hashtags = () => {
  const { hashtags } = useHashtags();

  return (
    <section className="h-screen flex flex-col justify-between">
      <main className="mt-16 flex flex-wrap mx-2">
        {hashtags.map((tag: tag, index: number) => {
          return <IndividualTag tag={tag} key={index} />;
        })}
      </main>
      <Footer />
    </section>
  );
};

export default Hashtags;
