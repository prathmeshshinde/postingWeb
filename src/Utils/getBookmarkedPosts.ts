import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";
import {
  IBookmarkPosts,
  IRemoveBookmarkPosts,
} from "../Interface/ILikedAndBookmarkPosts";
import { message } from "antd";

export const getBookmarkedPosts = (
  setRemoveBookmarkPosts: React.Dispatch<
    React.SetStateAction<IRemoveBookmarkPosts[]>
  >,
  setBookmarkPost: React.Dispatch<React.SetStateAction<IBookmarkPosts[]>>,
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
      message.error(err.message);
    });
};
