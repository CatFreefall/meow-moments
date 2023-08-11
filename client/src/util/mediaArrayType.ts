type mediaArrayType = {
  username: string,
  profilePictureURL: string,
  date_posted: Date,
  description: string,
  mediaFileURLs: string[],
  post_id: string,
  postHashtags: string[],
  totalPostLikes: number,
}

type postProps = {
  post: mediaArrayType,
}

export type { mediaArrayType, postProps };