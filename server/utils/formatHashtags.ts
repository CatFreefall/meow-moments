import { format } from 'path';
const formatHashtags = (text: string): string[] => {
  const formattedHashtags = text.split(", ");
  return formattedHashtags.length >= 3 ? formattedHashtags.slice(0, 3) : formattedHashtags;
};

export default formatHashtags;
