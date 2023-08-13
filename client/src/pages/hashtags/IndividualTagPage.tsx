import { useParams } from "react-router-dom";

import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";

const IndividualTagPage = () => {
  const { tagname } = useParams();
  const { content } = usePosts({ hashtag: tagname });

  const contentArray = [...content];
  contentArray.sort((a, b) => b.totalPostLikes - a.totalPostLikes);

  return (
    <section className="mt-16">
      {contentArray.map((item: any, index: number) => {
        return (
          <div key={index} className="flex justify-center">
            <FormatPost post={item} />
          </div>
        );
      })}
    </section>
  );
};

export default IndividualTagPage;
