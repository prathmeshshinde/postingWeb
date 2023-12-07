import { Divider, Empty, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import SinglePost from "../HomePage/SinglePost";
import { useUserAuth } from "../../context/AuthContext";
import { getLikedPosts } from "./getLikedPosts";
import {
  IBookmarkPosts,
  IDeleteLikedPosts,
  ILikedPosts,
  IRemoveBookmarkPosts,
} from "../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../Interface/IPost";
const { Content } = Layout;

interface IProps {
  likedPosts: ILikedPosts[];
  deleteLikePost: IDeleteLikedPosts[];
  bookmarkPost: IBookmarkPosts[];
  removeBookmarkPosts: IRemoveBookmarkPosts[];
  likedPostsId: string[];
  bookmarkedPostId: string[];
}

const Like: React.FC<IProps> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  likedPostsId,
  bookmarkedPostId,
}) => {
  const [userPost, setUserPost] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currUser }: any = useUserAuth();
  const localStore = localStorage.getItem("userId");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRemoveLike = (id: string, deleteLikes: any) => {
    setUserPost((prevState) =>
      prevState.filter((post: IPost) => post.postId !== id)
    );

    deleteLikes();
  };

  useEffect(() => {
    getLikedPosts(setUserPost, setError, setLoading, likedPosts);
  }, [currUser, likedPostsId]);

  return (
    <Layout className="margin-top">
      <Layout className="site-layout scroll-app">
        <Header />
        <Divider
          style={{
            fontSize: "22px",
            color: "#3087ff",
            fontWeight: "700",
          }}
          data-testid="liked-posts-title"
        >
          My Likes
        </Divider>

        {error && currUser ? (
          <p
            className="no-comments-text"
            data-error-fetching-posts="error-fetching-posts"
          >
            Error Please try Again!
          </p>
        ) : null}

        <Content
          style={{ margin: "24px 16px 0", overflow: "initial" }}
          data-testid="loading-spin"
        >
          {loading ? (
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <div data-testid="liked-posts-present">
              <div className="like-page-container">
                {userPost?.length !== 0 && !loading ? (
                  <div className="post-id">
                    {userPost.map((newPost: IPost, index: number) => {
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
                  <div
                    style={{ marginTop: "100px" }}
                    data-liked-posts="empty-like-page"
                  >
                    <Empty />
                  </div>
                )}
              </div>
            </div>
          )}

          {!localStore ? (
            <div>
              <p className="no-comments-text" data-postid="login-text">
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
