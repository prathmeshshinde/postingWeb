import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";
import { IBookmarkPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { message } from "antd";

export const showBookmarkedPosts = (
  bookmarkedPostId: any,
  bookmarkPost: IBookmarkPosts[],
  location: any,
  postItem: IPost,
  currUser: ICurrUser,
  setBookmarkPostId: any
) => {
  const localStore = localStorage.getItem("userId");
  if (
    bookmarkPost?.length !== 0 &&
    location.pathname !== "/comment" &&
    location.pathname !== "/profile"
  ) {
    getDocs(
      query(
        collection(db, "posts"),
        where("userId", "==", postItem?.userId),
        where("postId", "in", bookmarkedPostId)
      )
    )
      .then((snapshot) => {
        let postDocs: any = [];
        snapshot?.docs?.forEach((doc) => {
          postDocs.push(doc.data());
        });

        let newBookmarkPosts: any = [];
        postDocs.map((post: any) => {
          bookmarkPost.map((postDetail: any) => {
            if (
              post.postId === postDetail.postId &&
              postDetail.userId === localStore
            ) {
              newBookmarkPosts.push(post.postId);
            }
          });
        });

        setBookmarkPostId(newBookmarkPosts);
      })
      .catch((err) => {
        message.error("Please Try Again");
      });
  }
};
