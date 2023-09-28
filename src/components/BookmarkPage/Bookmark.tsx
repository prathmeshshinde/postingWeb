import { Empty, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import SinglePost from "../HomePage/SinglePost";
import { useUserAuth } from "../../context/AuthContext";
import { getBookmarkPosts } from "./getBookmarkPosts";

const Bookmark: React.FC<any> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  bookmarkedPostId,
  likedPostsId,
}) => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  const { currUser }: any = useUserAuth();

  const handleRemoveBookmarkPosts = (id: any) => {
    setUserPost((prevState) =>
      prevState.filter((post: any) => post.postId !== id)
    );
  };

  useEffect(() => {
    getBookmarkPosts(bookmarkPost, currUser, setError, setLoading, setUserPost);
  }, []);

  return (
    <Layout>
      <Layout className="site-layout scroll-app">
        <Header />
        <h1 className="like-title">Bookmarks</h1>

        {!currUser?.userId ? (
          <p className="no-comments-text">
            Please login to see bookmarked posts
          </p>
        ) : (
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
                          handleRemoveBookmarkPosts={handleRemoveBookmarkPosts}
                          bookmarkedPostId={bookmarkedPostId}
                          likedPostsId={likedPostsId}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

export default Bookmark;
