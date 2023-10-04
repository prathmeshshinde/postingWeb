import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IRemoveBookmarkPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";

export const handleRemoveBookmark = async (
  currUser: ICurrUser,
  removeBookmarkPosts: IRemoveBookmarkPosts[],
  postItem: IPost,
  location: any,
  handleRemoveBookmarkPosts: any
) => {
  if (!currUser) {
    return alert("Login First");
  }
  removeBookmarkPosts?.map(async (items: any) => {
    if (items?.postId === postItem?.postId) {
      await deleteDoc(doc(db, "bookmarks", items.bookmarkedId));
    }
  });

  if (location.pathname === "/bookmark") {
    handleRemoveBookmarkPosts(postItem?.postId);
  }
};
