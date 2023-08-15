import { useEffect, useState } from "react";
import { tag } from "../util/tagType";

const useHashtags = () => {
  const [hashtags, setHashtags] = useState<tag[]>([]);

  const setHashtagState = (hashtags: tag[]) => {
    const sortedHashtags = hashtags.sort((a, b) => b.likes - a.likes);
    setHashtags(sortedHashtags);
  };

  useEffect(() => {
    fetch("/get-hashtags", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setHashtagState(data.tagLikes));
  }, []);

  return { hashtags };
};

export default useHashtags;
