import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IDeleteLikedPosts } from "../../../Interface/ILikedAndBookmarkPosts";

export const handleDislike = async (
  currUser: ICurrUser,
  deleteLikePost: IDeleteLikedPosts[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postItem: any,
  handleRemoveLike: (id: string, deleteLikes: () => void) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  callback: () => void
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return alert("Login First");
  }

  if (location.pathname === "/") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteLikePost?.map(async (items: any) => {
      if (items.postId === postItem?.postId && items.userId === localStore) {
        // firebase query to get documents
        const likedposts = query(collection(db, "posts"));
        getDocs(likedposts).then((snapshot) => {
          snapshot?.docs.forEach((document) => {
            const obj = { likes: document.data().likes - 1 };
            if (items.postId === document.data().postId) {
              // updating the document value likes by -1
              const updateLikeCount = doc(db, "posts", items.postId);
              updateDoc(updateLikeCount, obj);
              callback();
            }
          });
        });
        //deleting the document from likes collection
        await deleteDoc(doc(db, "likes", items?.likedId));
      }
    });
  }

  if (location.pathname === "/like") {
    const deleteLikes = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteLikePost?.map(async (items: any) => {
        if (items.postId === postItem?.postId && items.userId === localStore) {
          const likedposts = query(collection(db, "posts"));
          getDocs(likedposts).then((snapshot) => {
            snapshot?.docs.forEach((document) => {
              const obj = { likes: document.data().likes - 1 };
              if (items.postId === document.data().postId) {
                const updateLikeCount = doc(db, "posts", items.postId);
                updateDoc(updateLikeCount, obj);
              }
            });
          });
          await deleteDoc(doc(db, "likes", items?.likedId));
        }
      });
    };
    handleRemoveLike(postItem?.postId, deleteLikes);
  }
};
