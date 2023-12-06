import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";

type NotificationType = "success" | "info" | "warning" | "error";

export const handlePost = async (
  currUser: ICurrUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any,
  openNotificationWithIcon: (type: NotificationType, message: string) => void,
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
    //adding the data to firebase collection
    addDoc(collection(db, "posts"), {
      date: date,
      post: post,
      userId: user.uid,
      username: username,
      profile: currUser?.profile,
      likes: 0,
      bookmarks: 0,
      comment: 0,
    })
      .then((res) => {
        // updating the newly created postId into the document
        updateDoc(doc(db, "posts", res.id), {
          postId: res.id,
        });
        openNotificationWithIcon("success", "Post Successful");
      })
      .catch(() => {
        openNotificationWithIcon("error", "Failed! Something went wrong.");
      });
    setPost("");
  } else {
    openNotificationWithIcon("error", "Please enter valid post!");
  }
};
