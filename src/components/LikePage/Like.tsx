import { Empty, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import SinglePost from "../HomePage/SinglePost";
import { useUserAuth } from "../../context/AuthContext";

const Like: React.FC<any> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  likedPostsId,
  bookmarkedPostId,
}) => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const { currUser }: any = useUserAuth();

  const colRef = collection(db, "posts");

  const getLikedPosts = async () => {
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

  const handleRemoveLike = (id: any) => {
    setUserPost((prevState) =>
      prevState.filter((post: any) => post.postId !== id)
    );
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <Layout>
      <Layout className="site-layout scroll-app">
        <Header />
        <h1 className="like-title">Liked Posts</h1>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {error ? (
            <p className="no-comments-text">Error Please try Again!</p>
          ) : null}
          {loading ? (
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <div>
              {userPost?.length === 0 ? (
                <div style={{ marginTop: "100px" }}>
                  <Empty />
                </div>
              ) : (
                <div>
                  {userPost.map((newPost: any, index: any) => {
                    return (
                      <SinglePost
                        key={index}
                        postItem={newPost}
                        likedPosts={likedPosts}
                        deleteLikePost={deleteLikePost}
                        bookmarkPost={bookmarkPost}
                        removeBookmarkPosts={removeBookmarkPosts}
                        userPost={userPost}
                        handleRemoveLike={handleRemoveLike}
                        likedPostsId={likedPostsId}
                        bookmarkedPostId={bookmarkedPostId}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Like;
