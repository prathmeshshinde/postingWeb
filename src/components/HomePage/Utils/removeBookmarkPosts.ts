import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../App";

export const handleRemoveBookmark = async (
  currUser: any,
  removeBookmarkPosts: any,
  postItem: any,
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
