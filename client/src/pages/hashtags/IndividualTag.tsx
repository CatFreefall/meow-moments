import { tagType } from "../../util/tagType";

const IndividualTag = ({ tag }: tagType) => {
  return (
    <div>
      {tag.tagName} {tag.likes}
    </div>
  );
};

export default IndividualTag;
