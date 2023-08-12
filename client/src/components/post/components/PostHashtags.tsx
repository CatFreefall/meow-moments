import { Key } from "react";

type PostHashtagsProps = {
  hashtags: string[];
};

const PostHashtags = ({ hashtags }: PostHashtagsProps) => {
  return (
    <section className="flex overflow-y-scroll">
      {hashtags.map((hashtag: string, index: Key) => {
        return (
          <button className="bg-orange mx-1 mt-2 px-3 rounded-full">
            {hashtag}
          </button>
        );
      })}
    </section>
  );
};

export default PostHashtags;
