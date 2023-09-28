import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";

export const handleLike = async (
  post_id: string,
  currUser: any,
  openNotificationWithIcon: any
) => {
  if (!currUser) {
    return alert("Login First");
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
