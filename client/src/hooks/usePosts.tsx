import { useEffect, useState } from "react";
import { mediaArrayType } from "../util/mediaArrayType";

type usePostsProps = {
  mediaType?: "illustrations" | "photos" | "videos";
  user?: string;
  hashtag?: string;
};

const usePosts = (sortBy: usePostsProps) => {
  const [content, setContent] = useState<mediaArrayType[]>([]);

  let { category, categoryValue } = { category: "", categoryValue: "" };
  for (const [key, value] of Object.entries(sortBy)) {
    category = key;
    categoryValue = value;
  }

  useEffect(() => {
    fetch(`/getContent/${category}/${encodeURIComponent(categoryValue)}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (data) => {
        setContent(data);
        return data;
      })
      .catch((err) => console.log(err));
  }, [category, categoryValue]);

  return { content };
};

export default usePosts;
