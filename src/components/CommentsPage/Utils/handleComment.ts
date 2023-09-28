import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";

export const handleComment = async (
  currUser: any,
  setError: any,
  comment: any,
  postItem: any,
  username: any,
  setComments: any,
  setComment: any,
  date: any,
  user: any
) => {
  if (!currUser) {
    alert("Please login first");
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
    }
  } catch (err: any) {
    setError("Please Try Again!");
  }
};
