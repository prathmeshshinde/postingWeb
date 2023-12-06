import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../App";
import { ICurrUser } from "../../../Interface/ICurrUser";
import { IPost } from "../../../Interface/IPost";

export const getPosts = (
  currUser: ICurrUser,
  setUserPost: React.Dispatch<React.SetStateAction<IPost[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const localStore = localStorage.getItem("userId");
  const colRef = collection(db, "posts");
  getDocs(colRef)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postDocs: any = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data(), id: doc.id });
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
