import { useEffect, useState } from "react";

import fetchContent from "../../util/fetchContent";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import { mediaArrayType } from "../../util/mediaArrayType";
import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";

const Illustrations = () => {
  const [illustrationsArray, setIllustrationsArray] = useState<
    mediaArrayType[]
  >([]);

  useEffect(() => {
    fetchContent("illustrations", "recent", setIllustrationsArray);
  }, []);

  return (
    <section className="mt-16">
      {illustrationsArray.map((item, index) => {
        return (
          <div key={index}>
            <MenuSectionDivider />
            <FormatPost post={illustrationsArray[index]} />
            <LikePost post={illustrationsArray[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default Illustrations;
