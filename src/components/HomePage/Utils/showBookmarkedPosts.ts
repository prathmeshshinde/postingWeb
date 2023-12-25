import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";
import { IBookmarkPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";
import { message } from "antd";

export const showBookmarkedPosts = (
  bookmarkedPostId: string[] | undefined,
  bookmarkPost: IBookmarkPosts[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  postItem: IPost,
  setBookmarkPostId: React.Dispatch<React.SetStateAction<string[]>>
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const postDocs: any[] = [];
        snapshot?.docs?.forEach((doc) => {
          postDocs.push(doc.data());
        });

        // mapping through two arrays and adding the values to the new array which satisfice the given conditions
        const newBookmarkPosts: string[] = [];
        postDocs.map((post: IPost) => {
          bookmarkPost.map((postDetail: IBookmarkPosts) => {
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
      .catch(() => {
        message.error("Please Try Again");
      });
  }
};
