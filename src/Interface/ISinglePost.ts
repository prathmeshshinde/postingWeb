/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IBookmarkPosts,
  IDeleteLikedPosts,
  ILikedPosts,
  IRemoveBookmarkPosts,
} from "./ILikedAndBookmarkPosts";

export interface ISinglePost {
  postItem?: any;
  compare?: any;
  postCommentDeleltId?: any;
  likedPosts: ILikedPosts[];
  deleteLikePost: IDeleteLikedPosts[];
  bookmarkPost: IBookmarkPosts[];
  removeBookmarkPosts: IRemoveBookmarkPosts[];
  handleRemoveLike?: any;
  handleRemoveBookmarkPosts?: any;
  likedPostsId?: string[];
  bookmarkedPostId?: string[];
  setToUpdateComments?: any;
  toUpdateComments?: any;
  parentPost?: any;
  updatelikes?: boolean;
  setUpdatelikes?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteId?: any;
  userPost?: any;
}
