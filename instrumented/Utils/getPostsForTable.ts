import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../App";
import { message } from "antd";

export const getPostsForTable = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPosts: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const localStore = localStorage.getItem("userId");
  const colRef = collection(db, "posts");
  const q = query(colRef);
  getDocs(q)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postDocs: any[] = [];

      snapshot?.docs?.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });

      // filtering the array based on userId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newposts = postDocs.filter((ele: any) => {
        return ele?.userId === localStore;
      });

      // Sorting the newposts array which consist of comments by descending order
      const orderedPosts = newposts.sort((a, b) => {
        return b.date - a.date;
      });

      setPosts(orderedPosts);
      setLoading(false);
    })
    .catch((err) => {
      message.error(`${err.message} Somthing went wrong please try again!`);
    });
};
