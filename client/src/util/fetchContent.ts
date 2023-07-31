type sortBy = "recent" | "popular";
type contentType = "illustrations" | "videos" | "photos";

// This function is used to fetch any type of content like illustrations, videos
// photos.
const fetchContent = async (
  contentType: contentType,
  sortBy: sortBy = "recent",
  setContentArray: React.Dispatch<React.SetStateAction<never[]>>
) => {
  await fetch(`/getContent/${contentType}/${sortBy}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      setContentArray(data)
      return data;
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default fetchContent;
