import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../App";

export const handleDislike = async (
  currUser: any,
  deleteLikePost: any,
  postItem: any,
  handleRemoveLike: any,
  location: any
) => {
  if (!currUser) {
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
