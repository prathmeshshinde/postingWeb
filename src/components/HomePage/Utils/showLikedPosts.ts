import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../App";
import { ILikedPosts } from "../../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../../Interface/IPost";
import { ICurrUser } from "../../../Interface/ICurrUser";

export const showLikedPosts = (
  likedPosts: ILikedPosts[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any,
  postItem: IPost,
  likedPostsId: string[] | undefined,
  currUser: ICurrUser,
  setLikedPostId: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const localStore = localStorage.getItem("userId");
  if (
    likedPosts?.length !== 0 &&
    location.pathname !== "/comment" &&
    location.pathname !== "/profile"
  ) {
    getDocs(
      query(
        collection(db, "posts"),
        where("userId", "==", postItem?.userId),
        where("postId", "in", likedPostsId)
      )
    )
      .then((snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const postDocs: any[] = [];
        const postUserId: string[] = [];
        snapshot?.docs?.forEach((doc) => {
          postDocs.push(doc?.data());
          postUserId.push(doc.data().userId);
        });

        const newLikedPosts: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        postDocs.map((post: IPost | any) => {
          likedPosts.map((postDetail: ILikedPosts) => {
            if (
              post.postId === postDetail.postId &&
              postDetail.userId === localStore
            ) {
              newLikedPosts.push(post.postId);
            }
          });
        });
        setLikedPostId(newLikedPosts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};
