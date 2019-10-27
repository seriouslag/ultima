
interface InstagramPagination {
  next_max_id: string;
  next_url: string;
}

interface InstagramData {
  id: string;
  user: InstagramUser;
  images: InstagramImages;
  created_time: string;
  caption: InstagramCaption;
  user_has_liked: boolean;
  likes: InstagramCount;
  tags: any[];
  filter: string;
  comments: InstagramCount;
  type: string;
  link: string;
  location: any;
  attribution: any;
  users_in_photo: InstagramUser[];
  videos: InstagramVideos;
}

interface InstagramVideos {
  standard_resolution: Resolution;
  low_resolution: Resolution;
  low_bandwidth: Resolution;
}

interface Resolution {
  id: string;
  width: string;
  height: string;
  url: string;
}

interface InstagramCaption {
  id: string;
  text: string;
  created_time: string;
  from: InstagramUser;
}

interface InstagramImages {
  thumbnail: InstagramImage;
  low_resolution: InstagramImage;
  standard_resolution: InstagramImage;
}

interface InstagramCount {
  count: number;
}

interface InstagramImage {
  width: string;
  height: string;
  url: string;
}

interface InstagramUser {
  id: string;
  full_name: string;
  profile_picture: string;
  username: string;
}

interface InstagramMeta {
  code: number;
}

interface Instagram {
  pagination: InstagramPagination;
  data: InstagramData[];
  meta: InstagramMeta;
}

export {
  Instagram,
  InstagramMeta,
  InstagramUser,
  InstagramImage,
  InstagramCount,
  InstagramImages,
  InstagramCaption,
  InstagramData,
  InstagramPagination,
};
