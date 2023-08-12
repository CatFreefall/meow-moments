class hashtagLikes {
  tagName: string;
  likes: number;

  constructor(tagName: string, likes: number) {
    this.tagName = tagName;
    this.likes = likes;
  }
}

class totalTagLikes {
  tagLikes: hashtagLikes[];

  constructor() {
    this.tagLikes = [];
  }

  addEntry(tagName: string, likes: number) {
    const existingTag = this.tagLikes.find((tag) => tag.tagName === tagName);
    if (existingTag) {
      existingTag.likes += likes;
    } else {
      this.tagLikes.push(new hashtagLikes(tagName, likes));
    }
  }
}

export default totalTagLikes;
