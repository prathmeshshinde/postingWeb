import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../App";
import { IRemoveBookmarkPosts } from "../../../Interface/ILikedAndBookmarkPosts";

export const handleRemoveBookmark = async (
  removeBookmarkPosts: IRemoveBookmarkPosts[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postItem: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  handleRemoveBookmarkPosts: (id: string, removeBookmark: () => void) => void,
  callback: () => void
) => {
  const localStore = localStorage.getItem("userId");

  if (location.pathname === "/") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeBookmarkPosts?.map(async (items: any) => {
      if (items?.postId === postItem?.postId && items.userId === localStore) {
        await deleteDoc(doc(db, "bookmarks", items.bookmarkedId));

        const bookmarkposts = query(collection(db, "posts"));
        getDocs(bookmarkposts).then((snapshot) => {
          snapshot?.docs.forEach((document) => {
            const obj = { bookmarks: document.data().bookmarks - 1 };
            if (items.postId === document.data().postId) {
              // updating the document value bookmarks by -1
              const updateBookmarkCount = doc(db, "posts", items.postId);
              updateDoc(updateBookmarkCount, obj);
              callback();
            }
          });
        });
      }
    });
  }

  if (location.pathname === "/bookmark") {
    const removeBookmark = () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      removeBookmarkPosts?.map(async (items: any) => {
        if (items?.postId === postItem?.postId && items.userId === localStore) {
          await deleteDoc(doc(db, "bookmarks", items.bookmarkedId));

          const bookmarkposts = query(collection(db, "posts"));
          getDocs(bookmarkposts).then((snapshot) => {
            snapshot?.docs.forEach((document) => {
              const obj = { bookmarks: document.data().bookmarks - 1 };
              if (items.postId === document.data().postId) {
                const updateBookmarkCount = doc(db, "posts", items.postId);
                updateDoc(updateBookmarkCount, obj);
                // callback();
              }
            });
          });
        }
      });
    handleRemoveBookmarkPosts(postItem?.postId, removeBookmark);
  }
};
