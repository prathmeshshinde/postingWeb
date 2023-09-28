import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";

export const getComments = async (
  setError: any,
  setComments: any,
  setLoading: any,
  postItem: any
) => {
  const docRef = collection(db, "posts", postItem?.id, "comments");
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
      setError(err.message);
    });
};
