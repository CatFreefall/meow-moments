type mediaArrayType = {
  username: string,
  date_posted: Date,
  description: string,
  mediaFileURLs: string[],
  post_id: string,
}

type postProps = {
  post: mediaArrayType,
}

export type { mediaArrayType, postProps };