import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";

export const getLikedPosts = async (
  setUserPost: any,
  setError: any,
  setLoading: any,
  likedPosts: any,
  currUser: any
) => {
  const colRef = collection(db, "posts");
  await getDocs(colRef)
    .then((snapshot) => {
      let postDocs: any = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data() });
      });

      let newLikedPosts: any = [];
      postDocs.map((post: any) => {
        likedPosts.map((postDetail: any) => {
          if (
            post.postId === postDetail.postId &&
            postDetail.userId === currUser.userId
          ) {
            newLikedPosts.push(post);
          }
        });
      });

      setUserPost(newLikedPosts);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
    });
};
