import { Key } from "react";
import { useNavigate } from "react-router-dom";

type PostHashtagsProps = {
  hashtags: string[];
};

const PostHashtags = ({ hashtags }: PostHashtagsProps) => {
  const nav = useNavigate();

  return (
    <section className="flex overflow-y-scroll">
      {hashtags.map((hashtag: string, index: Key) => {
        return (
          <button
            key={index}
            className="bg-orange mx-1 mt-2 px-3 rounded-full"
            onClick={() => nav(`/hashtag/${encodeURIComponent(hashtag)}`)}
          >
            {hashtag}
          </button>
        );
      })}
    </section>
  );
};

export default PostHashtags;
