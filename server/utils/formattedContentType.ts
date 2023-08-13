import { GetSignedUrlResponse } from "@google-cloud/storage";

type formattedContentType = {
  username: any;
  profilePictureURL: GetSignedUrlResponse;
  date_posted: any;
  mediaFileURLs: string[];
  description: any;
  post_id: any;
  postHashtags: any[];
  totalPostLikes: number;
};

export type { formattedContentType };
