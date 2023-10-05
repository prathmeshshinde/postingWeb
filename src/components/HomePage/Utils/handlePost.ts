import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const handlePost = async (
  currUser: ICurrUser,
  user: any,
  openNotificationWithIcon: any,
  setPost: React.Dispatch<React.SetStateAction<string>>,
  post: string,
  date: string,
  limit: boolean,
  username: string
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    return openNotificationWithIcon("error", "Please Login to Post");
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
        openNotificationWithIcon("error", "Failed! Something went wrong.");
      });
    setPost("");
  } else {
    openNotificationWithIcon("error", "Please enter valid post!");
  }
};
