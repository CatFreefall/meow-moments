type sortBy = "recent" | "popular";
type contentType = "illustrations" | "videos" | "photos";

// This function is used to fetch any type of content like illustrations, videos
// photos.
const fetchContent = async (
  contentType: contentType,
  sortBy: sortBy = "recent"
) => {
  await fetch(`/getContent/${contentType}/${sortBy}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

export default fetchContent;
