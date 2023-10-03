import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";

export const handleBookmark = async (
  post_id: string,
  currUser: any,
  openNotificationWithIcon: any
) => {
  if (!currUser) {
    return message.error("Please Login to Bookmark");
  }
  try {
    await addDoc(collection(db, "bookmarks"), {
      postId: post_id,
      userId: currUser?.userId,
    });
  } catch (err) {
    openNotificationWithIcon("error", "Something went wrong please try again!");
  }
};
