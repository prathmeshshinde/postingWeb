import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";
import { message } from "antd";
import { IPost } from "../../../Interface/IPost";

export const getComments = async (
  setError: React.Dispatch<React.SetStateAction<string>>,
  setComments: React.Dispatch<React.SetStateAction<IPost[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  const docRef = collection(db, "posts", id, "comments");
  getDocs(docRef)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const commentDocs: any[] = [];
      snapshot.docs.forEach((doc) => {
        commentDocs.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentDocs);
      setLoading(false);
    })
    .catch((err) => {
      message.error("Something went wrong!");
      setError(err.message);
    });
};
