import { useNavigate } from "react-router-dom";

import { tagType } from "../../../util/tagType";

const IndividualTag = ({ tag }: tagType) => {
  const nav = useNavigate();

  return (
    <button
      className="bg-orange my-2 mx-1 py-1 px-3 rounded-full flex items-center"
      onClick={() => nav(`/hashtag/${encodeURIComponent(tag.tagName)}`)}
    >
      <h6 className="mr-3">{tag.tagName}</h6>
      <h6>{tag.likes}</h6>
      <img
        alt=""
        src="/assets/icons/heart-active-icon.webp"
        className="w-6 h-6 ml-1"
      />
    </button>
  );
};

export default IndividualTag;
