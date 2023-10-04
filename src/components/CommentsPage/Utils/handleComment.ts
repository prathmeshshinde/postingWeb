import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IComment } from "../../../Interface/IComment";

export const handleComment = async (
  currUser: ICurrUser,
  setError: any,
  comment: string,
  postItem: any,
  username: string,
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  date: string,
  user: any
) => {
  if (!currUser) {
    message.error("Please login first");
    return;
  }
  try {
    if (comment.trim().length !== 0) {
      const obj = {
        date: date,
        post: comment,
        userId: user.uid,
        username: username,
        profile: currUser?.profile,
        id: postItem?.id,
      };
      const res = await addDoc(
        collection(db, "posts", postItem?.id, "comments"),
        obj
      );

      setComments((prevState: any) => [{ ...obj, id: res.id }, ...prevState]);
      setComment("");
    } else {
      message.error("Please enter valid comment");
    }
  } catch (err: any) {
    message.error("Something went wrong!");
    setError("Please Try Again!");
  }
};
