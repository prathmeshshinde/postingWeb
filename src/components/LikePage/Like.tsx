import { Divider, Empty, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import SinglePost from "../HomePage/SinglePost";
import { useUserAuth } from "../../context/AuthContext";
import { getLikedPosts } from "./getLikedPosts";

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
  const localStore = localStorage.getItem("userId");

  const handleRemoveLike = (id: any) => {
    setUserPost((prevState) =>
      prevState.filter((post: any) => post.postId !== id)
    );
  };

  useEffect(() => {
    getLikedPosts(setUserPost, setError, setLoading, likedPosts, currUser);
  }, [currUser]);

  return (
    <Layout>
      <Layout className="site-layout scroll-app">
        <Header />
        <Divider
          style={{
            fontSize: "22px",
            color: "#3087ff",
            fontWeight: "700",
          }}
        >
          Liked Posts
        </Divider>

        {error && currUser ? (
          <p className="no-comments-text">Error Please try Again!</p>
        ) : null}

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {loading ? (
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <div>
              <div>
                {userPost?.length !== 0 ? (
                  <div>
                    {userPost.map((newPost: any, index: number) => {
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
                ) : (
                  <div style={{ marginTop: "100px" }}>
                    <Empty />
                  </div>
                )}
              </div>
            </div>
          )}

          {!localStore ? (
            <div>
              <p className="no-comments-text">
                Please login to see liked posts
              </p>
            </div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Like;
