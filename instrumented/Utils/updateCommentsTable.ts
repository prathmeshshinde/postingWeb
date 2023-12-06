import { doc, updateDoc } from "firebase/firestore";
import { db } from "../App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCommentsTable = async (data: any) => {
  const colRef = doc(db, "posts", data?.parentPostId, "comments", data?.postId);

  const current = Date.now();

  const updatedPost = {
    edited: "Edited",
    post: data.post,
    date: current,
  };
  await updateDoc(colRef, updatedPost);
};
