import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const handleBookmark = async (
  post_id: string,
  openNotificationWithIcon: (type: NotificationType, message: string) => void,
  callback: () => void
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return message.error("Please Login to Bookmark");
  }
  try {
    await addDoc(collection(db, "bookmarks"), {
      postId: post_id,
      userId: localStore,
    });

    const Bookmarkposts = query(collection(db, "posts"));

    getDocs(Bookmarkposts).then((snapshot) => {
      snapshot?.docs.forEach((document) => {
        const obj = { bookmarks: document.data().bookmarks + 1 };

        if (post_id === document.data().postId) {
          const updateBookmarksCount = doc(db, "posts", post_id);
          updateDoc(updateBookmarksCount, obj);
          callback();
        }
      });
    });
  } catch (err) {
    openNotificationWithIcon("error", "Something went wrong please try again!");
  }
};
