type mediaArrayType = {
  username: string,
  date_posted: Date,
  description: string,
  mediaFileURLs: string[],
  post_id: string,
  totalPostLikes: number,
}

type postProps = {
  post: mediaArrayType,
}

export type { mediaArrayType, postProps };