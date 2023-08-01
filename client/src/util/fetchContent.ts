import { mediaArrayType } from "./mediaArrayType";

type sortByType = "recent" | "popular";
type contentType = "illustrations" | "videos" | "photos";

// This function is used to fetch any type of content like illustrations, videos
// photos.
const fetchContent = async (
  contentType: contentType,
  sortBy: sortByType,
  setContentArray: React.Dispatch<React.SetStateAction<mediaArrayType[]>>
) => {
  await fetch(`/getContent/${contentType}/${sortBy}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      setContentArray(data);
    })
    .catch((err) => console.log(err));
};

export default fetchContent;
