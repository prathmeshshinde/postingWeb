import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";

export const getBookmarkPosts = (
  bookmarkPost: any,
  currUser: any,
  setError: any,
  setLoading: any,
  setUserPost: any
) => {
  if (!currUser?.userId) {
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
            postDetail.userId === currUser.userId
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
