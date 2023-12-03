import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";
import { message } from "antd";

export const getPostsForTable = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPosts: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const colRef = collection(db, "posts");
  const q = query(colRef);
  getDocs(q)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postDocs: any[] = [];

      snapshot?.docs?.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postDocs);
      setLoading(false);
    })
    .catch((err) => {
      message.error(`${err.message} Somthing went wrong please try again!`);
    });
};
