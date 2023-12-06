import { Divider, Empty, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import SinglePost from "../HomePage/SinglePost";
import { useUserAuth } from "../../context/AuthContext";
import { getBookmarkPosts } from "./getBookmarkPosts";
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

const Bookmark: React.FC<IProps> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  bookmarkedPostId,
  likedPostsId,
}) => {
  const [userPost, setUserPost] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currUser }: any = useUserAuth();
  const localStore = localStorage.getItem("userId");

  const handleRemoveBookmarkPosts = (
    id: string,
    removeBookmark: () => void
  ) => {
    setUserPost((prevState) =>
      prevState.filter((post: IPost) => post.postId !== id)
    );
    removeBookmark();
  };

  useEffect(() => {
    getBookmarkPosts(bookmarkPost, setError, setLoading, setUserPost);
  }, [currUser]);

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
          data-testid="bookmark-posts-title"
        >
          Bookmarks
        </Divider>
        {error ? (
          <p
            className="no-comments-text"
            data-error-fetching-posts="error-fetching-posts"
          >
            Error Please try Again!
          </p>
        ) : null}

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {loading ? (
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <div data-testid="bookmark-posts-present">
              {userPost?.length === 0 ? (
                <div
                  style={{ marginTop: "100px" }}
                  data-bookmark-posts="empty-bookmark-page"
                >
                  <Empty />
                </div>
              ) : (
                <div>
                  {userPost.map((newPost: IPost, index: number) => {
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

          {!localStore ? (
            <p className="no-comments-text" data-postid="login-text">
              Please login to see bookmarked posts
            </p>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Bookmark;
