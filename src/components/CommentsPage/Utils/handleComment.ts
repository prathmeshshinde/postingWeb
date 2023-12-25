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
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IPost } from "../../../Interface/IPost";

export const handleComment = async (
  currUser: ICurrUser,
  setError: React.Dispatch<React.SetStateAction<string>>,
  comment: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postItem: any,
  username: string,
  setComments: React.Dispatch<React.SetStateAction<IPost[]>>,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  date: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
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
        parentPostId: postItem.id,
      };
      const res = await addDoc(
        collection(db, "posts", postItem?.id, "comments"),
        obj
      );

      const obj2: {
        postId: string;
      } = { postId: res?.id };

      const getDoc = doc(db, "posts", postItem?.id, "comments", res.id);
      await updateDoc(getDoc, obj2);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setComments((prevState: any[]) => [{ ...obj, id: res.id }, ...prevState]);
      setComment("");

      const likedposts = query(collection(db, "posts"));
      getDocs(likedposts).then((snapshot) => {
        snapshot?.docs.forEach((document) => {
          const obj = { comment: document.data().comment + 1 };

          if (postItem.id === document.data().postId) {
            const updateLikeCount = doc(db, "posts", postItem.id);
            updateDoc(updateLikeCount, obj);
          }
        });
      });
    } else {
      message.error("Please enter valid comment");
    }
  } catch (err: unknown) {
    setError("Please Try Again!");
  }
};
