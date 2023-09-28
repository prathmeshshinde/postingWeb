import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";

export const getPosts = (
  limit: any,
  scroll: any,
  setPosts: any,
  setLoading: any
) => {
  const colRef = collection(db, "posts");
  const q = query(colRef, limit(scroll));
  getDocs(q)
    .then((snapshot) => {
      let postDocs: any = [];
      snapshot?.docs?.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postDocs);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err.message, "app");
    });
};
