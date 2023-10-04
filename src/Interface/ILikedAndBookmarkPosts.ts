export interface IDeleteLikedPosts {
  likedId: string;
  postId: string;
  userId: string;
}

export interface ILikedPosts {
  postId: string;
  userId: string;
}

export interface IBookmarkPosts {
  postId: string;
  userId: string;
}

export interface IRemoveBookmarkPosts {
  bookmarkedId?: string;
  postId: string;
  userId: string;
}
