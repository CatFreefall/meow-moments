import { useEffect, useState } from "react";

import IndividualTag from "./IndividualTag";
import { tag } from "../../util/tagType";

const Hashtags = () => {
  const [totalLikes, setTotalLikes] = useState<tag[]>([]);

  const setTotalTagLikes = (data: tag[]) => {
    setTotalLikes(data);
  };

  useEffect(() => {
    fetch("/get-hashtags", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setTotalTagLikes(data.tagLikes));
  }, []);

  return (
    <section className="mt-16 flex flex-wrap mx-2">
      {totalLikes.map((tag: tag, index: number) => {
        return <IndividualTag tag={tag} key={index} />;
      })}
    </section>
  );
};

export default Hashtags;
