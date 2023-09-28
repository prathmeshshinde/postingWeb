import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";

export const showLikedPosts = (
  likedPosts: any,
  location: any,
  postItem: any,
  likedPostsId: any,
  currUser: any,
  setLikedPostId: any
) => {
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
              postDetail.userId === currUser.userId
            ) {
              newLikedPosts.push(post.postId);
            }
          });
        });
        setLikedPostId(newLikedPosts);
      })
      .catch((err) => {
        console.log(err.message, "Please Try Again later!");
      });
  }
};
