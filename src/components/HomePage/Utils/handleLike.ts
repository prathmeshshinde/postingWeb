import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const handleLike = async (
  post_id: string,
  currUser: ICurrUser,
  openNotificationWithIcon: any
) => {
  if (!currUser) {
    return message.error("Please Login to Like");
  }
  try {
    await addDoc(collection(db, "likes"), {
      postId: post_id,
      userId: currUser.userId,
    });
  } catch (err) {
    openNotificationWithIcon("error", "Something went wrong please try again!");
  }
};
