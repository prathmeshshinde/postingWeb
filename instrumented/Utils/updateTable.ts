import { doc, updateDoc } from "firebase/firestore";
import { db } from "../App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTable = async (data: any) => {
  const colRef = doc(db, "posts", data?.postId);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const current = new Date().toLocaleString("en-US", options);

  const updatedPost = {
    edited: "Edited",
    post: data.post,
    date: current,
  };
  await updateDoc(colRef, updatedPost);
};
