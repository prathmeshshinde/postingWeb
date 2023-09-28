import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";

export const getLikedPosts = (
  SetDeleteLikePost: any,
  setLikedPostId: any,
  setLikedPosts: any
) => {
  const likedposts = query(collection(db, "likes"));
  getDocs(likedposts)
    .then((snapshot) => {
      let likedPosts: any = [];
      let toDeleteLike: any = [];
      let likedPostsId: any = [];
      snapshot?.docs.forEach((doc) => {
        likedPosts.push(doc.data());
        toDeleteLike.push({ ...doc.data(), likedId: doc.id });
        likedPostsId.push(doc.data().postId);
      });
      SetDeleteLikePost(toDeleteLike);
      setLikedPosts(likedPosts);
      setLikedPostId(likedPostsId);
    })
    .catch((err) => {
      console.log(err.message, "app");
    });
};
