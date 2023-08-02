import { useEffect, useState } from "react";

import fetchContent from "../../util/fetchContent";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import { mediaArrayType } from "../../util/mediaArrayType";

const Illustrations = () => {
  const [illustrationsArray, setIllustrationsArray] = useState<
    mediaArrayType[]
  >([]);

  useEffect(() => {
    fetchContent("illustrations", "recent", setIllustrationsArray);
  }, []);

  return (
    <section>
      {illustrationsArray.map((item, index) => {
        return (
          <div className="mt-16" key={index}>
            <FormatPost post={illustrationsArray[index]} />
            <LikePost post={illustrationsArray[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default Illustrations;
