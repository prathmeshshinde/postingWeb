import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";

export const showBookmarkedPosts = (
  bookmarkedPostId: any,
  bookmarkPost: any,
  location: any,
  postItem: any,
  currUser: any,
  setBookmarkPostId: any
) => {
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
              postDetail.userId === currUser?.userId
            ) {
              newBookmarkPosts.push(post.postId);
            }
          });
        });

        setBookmarkPostId(newBookmarkPosts);
      })
      .catch((err) => {
        console.log(err.message, "Please Try Again later!");
      });
  }
};
