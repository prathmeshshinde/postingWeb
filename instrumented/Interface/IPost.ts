export interface IPost {
  length: number;
  id?: string;
  post?: string;
  bio?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date?: any;
  postId?: string;
  profile?: string;
  userId?: string;
  username?: string;
  edited?: string;
  comment?: number;
  likes?: number;
  bookmarks?: number;
  index?: number;
}
