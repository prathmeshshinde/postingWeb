import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const getPosts = (
  currUser: ICurrUser,
  setUserPost: any,
  setLoading: any
) => {
  const localStore = localStorage.getItem("userId");
  const colRef = collection(db, "posts");
  getDocs(colRef)
    .then((snapshot) => {
      let postDocs: any = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });

      const newposts = postDocs.filter((ele: any) => {
        return ele?.userId === localStore;
      });

      setUserPost(newposts);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
