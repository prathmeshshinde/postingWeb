import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";
import { ILikedPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const showLikedPosts = (
  likedPosts: ILikedPosts[],
  location: any,
  postItem: IPost,
  likedPostsId: any,
  currUser: ICurrUser,
  setLikedPostId: any
) => {
  const localStore = localStorage.getItem("userId");
  if (
    likedPosts?.length !== 0 &&
    location.pathname !== "/comment" &&
    location.pathname !== "/profile"
  ) {
    getDocs(
      query(
        collection(db, "posts"),
        where("userId", "==", postItem?.userId),
        where("postId", "in", likedPostsId)
      )
    )
      .then((snapshot) => {
        let postDocs: any = [];
        let postUserId: any = [];
        snapshot?.docs?.forEach((doc) => {
          postDocs.push(doc?.data());
          postUserId.push(doc.data().userId);
        });

        let newLikedPosts: any = [];
        postDocs.map((post: any) => {
          likedPosts.map((postDetail: any) => {
            if (
              post.postId === postDetail.postId &&
              postDetail.userId === localStore
            ) {
              newLikedPosts.push(post.postId);
            }
          });
        });
        setLikedPostId(newLikedPosts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};
