import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";

export const getBookmarkedPosts = (
  setRemoveBookmarkPosts: any,
  setBookmarkPost: any,
  setBookmarkPostId: any
) => {
  const bookmarkposts = query(collection(db, "bookmarks"));
  getDocs(bookmarkposts)
    .then((snapshot) => {
      let bookmarkPosts: any = [];
      let toRemoveBookmark: any = [];
      let bookmarkPostId: any = [];
      snapshot?.docs.forEach((doc) => {
        bookmarkPosts.push(doc.data());
        toRemoveBookmark.push({ ...doc.data(), bookmarkedId: doc.id });
        bookmarkPostId.push(doc.data().postId);
      });
      setRemoveBookmarkPosts(toRemoveBookmark);
      setBookmarkPost(bookmarkPosts);
      setBookmarkPostId(bookmarkPostId);
    })
    .catch((err) => {
      console.log(err.message, "app");
    });
};
