import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IRemoveBookmarkPosts } from "../../../Interface/ILikedAndBookmarkPosts";

export const handleRemoveBookmark = async (
  currUser: ICurrUser,
  removeBookmarkPosts: IRemoveBookmarkPosts[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postItem: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  handleRemoveBookmarkPosts: (id: string) => void,
  callback: () => void
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return alert("Login First");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeBookmarkPosts?.map(async (items: any) => {
    if (items?.postId === postItem?.postId) {
      await deleteDoc(doc(db, "bookmarks", items.bookmarkedId));

      const bookmarkposts = query(collection(db, "posts"));
      getDocs(bookmarkposts).then((snapshot) => {
        snapshot?.docs.forEach((document) => {
          const obj = { bookmarks: document.data().bookmarks - 1 };
          if (items.postId === document.data().postId) {
            const updateBookmarkCount = doc(db, "posts", items.postId);
            updateDoc(updateBookmarkCount, obj);
            callback();
          }
        });
      });
    }
  });

  if (location.pathname === "/bookmark") {
    handleRemoveBookmarkPosts(postItem?.postId);
  }
};
