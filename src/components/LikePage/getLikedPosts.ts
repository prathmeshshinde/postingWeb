import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { IPost } from "../../Interface/IPost";
import { ILikedPosts } from "../../Interface/ILikedAndBookmarkPosts";
import { message } from "antd";

export const getLikedPosts = async (
  setUserPost: React.Dispatch<React.SetStateAction<IPost[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  likedPosts: ILikedPosts[]
) => {
  const localStore = localStorage.getItem("userId");
  if (!localStore) {
    setLoading(false);
    return;
  }

  const colRef = collection(db, "posts");
  await getDocs(colRef)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postDocs: any[] = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data() });
      });

      const newLikedPosts: IPost[] = [];
      postDocs.map((post: IPost) => {
        likedPosts.map((postDetail: ILikedPosts) => {
          if (
            post.postId === postDetail.postId &&
            postDetail.userId === localStore
          ) {
            newLikedPosts.push(post);
          }
        });
      });

      setUserPost(newLikedPosts);
      setLoading(false);
    })
    .catch((err) => {
      message.error("Something went wrong!");
      setError(err.message);
    });
};
