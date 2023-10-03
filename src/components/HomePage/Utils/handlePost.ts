import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../App";

export const handlePost = async (
  currUser: any,
  user: any,
  openNotificationWithIcon: any,
  setPost: any,
  post: any,
  date: any,
  limit: any,
  username: any
) => {
  if (!currUser) {
    return openNotificationWithIcon("error", "Please Login First");
  }
  if (post.trim().length !== 0 && !limit) {
    addDoc(collection(db, "posts"), {
      date: date,
      post: post,
      userId: user.uid,
      username: username,
      profile: currUser?.profile,
    })
      .then((res) => {
        updateDoc(doc(db, "posts", res.id), {
          postId: res.id,
        });
        openNotificationWithIcon("success", "Post Successful");
      })
      .catch((err: any) => {
        console.log(err.message, "home Page");
      });
    setPost("");
  } else {
    openNotificationWithIcon("error", "Please enter valid post!");
  }
};
