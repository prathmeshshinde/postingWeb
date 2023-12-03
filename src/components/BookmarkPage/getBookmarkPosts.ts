import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { IBookmarkPosts } from "../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../Interface/IPost";

export const getBookmarkPosts = (
  bookmarkPost: IBookmarkPosts[],
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setUserPost: React.Dispatch<React.SetStateAction<IPost[]>>
) => {
  const localStore = localStorage.getItem("userId");

  if (!localStore) {
    setLoading(false);
    return;
  }
  const colRef = collection(db, "posts");
  getDocs(colRef)
    .then((snapshot) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const postDocs: any[] = [];
      snapshot.docs.forEach((doc) => {
        postDocs.push({ ...doc.data() });
      });

      const newBookmarkedPosts: IPost[] = [];

      postDocs.map((post: IPost) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
