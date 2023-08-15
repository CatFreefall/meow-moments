import useHashtags from "../../../hooks/useHashtags";
import { tag } from "../../../util/tagType";
import IndividualTag from "../../hashtags/components/IndividualTag";

const TrendingHashtagsContainer = () => {
  const { hashtags } = useHashtags();

  return (
    <section className="w-full">
      <div className="bg-blue w-60 h-2 rounded-3xl mx-auto mb-2" />
        {
          hashtags.map((hashtag: tag, index: number) => (
            <IndividualTag key={index} tag={hashtag} />
          ))
        }
      <div className="bg-blue w-60 h-2 rounded-3xl mx-auto my-4" />
    </section>
  );
};

export default TrendingHashtagsContainer;
