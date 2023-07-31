import { useEffect, useState } from "react";

import fetchContent from "../../util/fetchContent";
import FormatPost from "./components/FormatPost";
import LikePost from "./components/likes/LikePost";

const Illustrations = () => {
  const [loading, isLoading] = useState(true);
  const [illustrationsArray, setIllustrationsArray] = useState([]);

  const setLoaded = () => {
    isLoading(false);
  };

  useEffect(() => {
    fetchContent("illustrations", "recent", setIllustrationsArray).then(() =>
      setLoaded()
    );
  }, []);

  return loading === true ? null : (
    <div>
      {illustrationsArray.map((item, index) => {
        return (
          <div className="mt-16" key={index}>
            <FormatPost post={illustrationsArray[index]} />
            <LikePost post={illustrationsArray[index]} />
          </div>
        );
      })}
    </div>
  );
};

export default Illustrations;
