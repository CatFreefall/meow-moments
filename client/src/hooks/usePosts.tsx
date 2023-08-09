import { useEffect, useState } from "react";
import { mediaArrayType } from "../util/mediaArrayType";

const usePosts = (sortBy: string) => {
  const [content, setContent] = useState<mediaArrayType[]>([]);

  useEffect(() => {
    fetch(`/getContent/${sortBy}/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (data) => {
        setContent(data);
      })
      .catch((err) => console.log(err));
  }, [sortBy]);

  return { content };
};

export default usePosts;
