import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";
import { IComment } from "../../../Interface/IComment";
import { message } from "antd";

export const getComments = async (
  setError: any,
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  const docRef = collection(db, "posts", id, "comments");
  getDocs(docRef)
    .then((snapshot) => {
      let commentDocs: any = [];
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
