import { useEffect, useState } from "react";

import IndividualTag from "./components/IndividualTag";
import { tag } from "../../util/tagType";
import Footer from "../../components/common/Footer";

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
    <section className="h-screen flex flex-col justify-between">
      <main className="mt-16 flex flex-wrap mx-2">
        {totalLikes.map((tag: tag, index: number) => {
          return <IndividualTag tag={tag} key={index} />;
        })}
      </main>
      <Footer />
    </section>
  );
};

export default Hashtags;
