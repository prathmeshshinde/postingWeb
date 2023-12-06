import {
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { ICurrUser } from "../../../Interface/ICurrUser";

type NotificationType = "success" | "info" | "warning" | "error";

export const handleLike = async (
  post_id: string,
  currUser: ICurrUser,
  openNotificationWithIcon: (type: NotificationType, message: string) => void,
  callback: () => void
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return message.error("Please Login to Like");
  }
  try {
    await addDoc(collection(db, "likes"), {
      postId: post_id,
      userId: localStore,
    });
    const likedposts = query(collection(db, "posts"));
    getDocs(likedposts).then((snapshot) => {
      // mapping over the documents and updating the state with new value
      snapshot?.docs.forEach((document) => {
        const obj = { likes: document.data().likes + 1 };

        if (post_id === document.data().postId) {
          const updateLikeCount = doc(db, "posts", post_id);
          updateDoc(updateLikeCount, obj);
          callback();
        }
      });
    });
  } catch (err) {
    openNotificationWithIcon("error", "Something went wrong please try again!");
  }
};
