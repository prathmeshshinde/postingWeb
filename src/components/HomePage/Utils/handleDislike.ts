import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IDeleteLikedPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";

export const handleDislike = async (
  currUser: ICurrUser,
  deleteLikePost: IDeleteLikedPosts[],
  postItem: IPost,
  handleRemoveLike: any,
  location: any
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return alert("Login First");
  }
  deleteLikePost?.map(async (items: any) => {
    if (items.postId === postItem?.postId) {
      await deleteDoc(doc(db, "likes", items?.likedId));
    }
  });
  if (location.pathname === "/like") {
    handleRemoveLike(postItem?.postId);
  }
};
