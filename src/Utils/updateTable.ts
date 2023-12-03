import { doc, updateDoc } from "firebase/firestore";
import { db } from "../App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateTable = async (data: any) => {
  const colRef = doc(db, "posts", data?.postId);
  await updateDoc(colRef, data);
};
