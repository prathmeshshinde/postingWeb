import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";
import {
  IDeleteLikedPosts,
  ILikedPosts,
} from "../Interface/ILikedAndBookmarkPosts";
import { message } from "antd";

export const getLikedPosts = (
  SetDeleteLikePost: React.Dispatch<React.SetStateAction<IDeleteLikedPosts[]>>,
  setLikedPostId: React.Dispatch<React.SetStateAction<string[]>>,
  setLikedPosts: React.Dispatch<React.SetStateAction<ILikedPosts[]>>
) => {
  const likedposts = query(collection(db, "likes"));
  getDocs(likedposts)
    .then((snapshot) => {
      const likedPosts: ILikedPosts[] = [];
      const toDeleteLike: IDeleteLikedPosts[] = [];
      const likedPostsId: string[] = [];
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
      message.error(err.message);
    });
};
