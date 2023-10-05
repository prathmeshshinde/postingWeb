import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const handleBookmark = async (
  post_id: string,
  currUser: ICurrUser,
  openNotificationWithIcon: any
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
  } catch (err) {
    openNotificationWithIcon("error", "Something went wrong please try again!");
  }
};
