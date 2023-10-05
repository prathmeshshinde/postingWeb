import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { IBookmarkPosts } from "../../Interface/ILikedAndBookmarkPosts";

export const getBookmarkPosts = (
  bookmarkPost: IBookmarkPosts[],
  setError: any,
  setLoading: any,
  setUserPost: any
) => {
  const localStore = localStorage.getItem("userId");

  if (!localStore) {
    setLoading(false);
    return;
  }
  const colRef = collection(db, "posts");
  getDocs(colRef)
    .then((snapshot) => {
      let postDocs: any = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data() });
      });

      let newBookmarkedPosts: any = [];

      postDocs.map((post: any) => {
        bookmarkPost.map((postDetail: any) => {
          if (
            post.postId === postDetail.postId &&
            postDetail.userId === localStore
          ) {
            newBookmarkedPosts.push(post);
          }
        });
      });
      setUserPost(newBookmarkedPosts);

      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
    });
};
