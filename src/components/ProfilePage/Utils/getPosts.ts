import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";

export const getPosts = (currUser: any, setUserPost: any, setLoading: any) => {
  const colRef = collection(db, "posts");
  getDocs(colRef)
    .then((snapshot) => {
      let postDocs: any = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });

      const newposts = postDocs.filter((ele: any) => {
        return ele?.userId === currUser?.userId;
      });

      setUserPost(newposts);
      setLoading(false);
    })
    .catch((err) => {
      console.log("error", err.message);
    });
};
