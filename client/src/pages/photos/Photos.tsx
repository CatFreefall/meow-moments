import { useEffect, useState } from "react";

import fetchContent from "../../util/fetchContent";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import { mediaArrayType } from "../../util/mediaArrayType";

const Photos = () => {
  const [photosArray, setPhotosArray] = useState<mediaArrayType[]>([]);

  useEffect(() => {
    fetchContent("photos", "recent", setPhotosArray);
  }, []);

  return (
    <section>
      {photosArray.map((item, index) => {
        return (
          <div className="mt-16" key={index}>
            <FormatPost post={photosArray[index]} />
            <LikePost post={photosArray[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default Photos;
