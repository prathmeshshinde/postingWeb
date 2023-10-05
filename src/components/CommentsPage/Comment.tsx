import {
  Button,
  Divider,
  Empty,
  Form,
  Input,
  Layout,
  Skeleton,
  Space,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import SinglePost from "../HomePage/SinglePost";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../App";
import { useUserAuth } from "../../context/AuthContext";
import Header from "../HomePage/Header";
import { getComments } from "./Utils/getComments";
import { handleComment } from "./Utils/handleComment";
import { IPost } from "../../Interface/IPost";
import {
  IBookmarkPosts,
  IDeleteLikedPosts,
  ILikedPosts,
  IRemoveBookmarkPosts,
} from "../../Interface/ILikedAndBookmarkPosts";
import { IComment } from "../../Interface/IComment";

interface IProps {
  likedPosts: ILikedPosts[];
  deleteLikePost: IDeleteLikedPosts[];
  bookmarkPost: IBookmarkPosts[];
  removeBookmarkPosts: IRemoveBookmarkPosts[];
}

const Comment: React.FC<IProps> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const location = useLocation();
  const { postItem } = location?.state;
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [limit, setLimit] = useState<boolean>(false);
  const { user, username, currUser }: any = useUserAuth();
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPost, setMainPost] = useState<IPost>();
  const [error, setError] = useState<any>();
  const [toUpdateComments, setToUpdateComments] = useState<boolean>(false);
  const [parentPost, setParentPost] = useState<string>();
  const [postLoading, setPostLoading] = useState<boolean>(true);

  const getPost = async () => {
    const docRef = doc(db, "posts", postItem?.id);
    const document = await getDoc(docRef);
    const post = { ...document.data(), id: postItem?.id };
    setMainPost(post);
    setPostLoading(false);
    setParentPost(post?.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    var options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const current = new Date().toLocaleString("en-US", options);
    setDate(current);

    if (e.target.value.length >= 100) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  };

  useEffect(() => {
    getComments(setError, setComments, setLoading, postItem?.id);
    getPost();
  }, [toUpdateComments]);

  return (
    <>
      <Layout className="profile-payout-div">
        <Layout className="site-layout scroll-app ">
          {!postItem && !location ? (
            <p className="no-comments-text">You can not access this page</p>
          ) : (
            <>
              <Header />
              <Content style={{ margin: "0px 10px 0", overflow: "initial" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Divider
                    style={{
                      fontSize: "22px",
                      color: "#3087ff",
                      fontWeight: "700",
                    }}
                  >
                    Post
                  </Divider>
                </div>

                {error ? (
                  <p className="no-comments-text">Error Please try Again!</p>
                ) : null}

                {postLoading ? (
                  <div className="skeleton-div">
                    <Skeleton avatar active />
                  </div>
                ) : (
                  <SinglePost
                    postItem={mainPost}
                    likedPosts={likedPosts}
                    deleteLikePost={deleteLikePost}
                    bookmarkPost={bookmarkPost}
                    removeBookmarkPosts={removeBookmarkPosts}
                    setToUpdateComments={setToUpdateComments}
                    toUpdateComments={toUpdateComments}
                  />
                )}

                <Divider>Comments</Divider>
                {limit ? (
                  <p className="limit-text">Please enter only 100 characters</p>
                ) : null}
                <div className="post-div" style={{ margin: "20px 0px" }}>
                  <Space.Compact
                    style={{
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Form
                      style={{ display: "flex", justifyContent: "center" }}
                      onFinish={() =>
                        handleComment(
                          currUser,
                          setError,
                          comment,
                          postItem,
                          username,
                          setComments,
                          setComment,
                          date,
                          user
                        )
                      }
                    >
                      <Form.Item>
                        <Input
                          className="post-input"
                          placeholder="Comment on Post"
                          value={comment}
                          onChange={(e) => handleChange(e)}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ height: "40px" }}
                        >
                          Comment
                        </Button>
                      </Form.Item>
                    </Form>
                  </Space.Compact>
                </div>

                {loading ? (
                  <div className="loading-spin">
                    <Spin tip="Loading" size="large">
                      <div className="content" />
                    </Spin>
                  </div>
                ) : (
                  <div>
                    {comments?.length === 0 ? (
                      <div style={{ marginTop: "40px" }}>
                        <Empty />
                      </div>
                    ) : (
                      comments?.map((postItem: IPost, index: number) => {
                        return (
                          <SinglePost
                            compare={location?.state.postItem.userId}
                            deleteId={postItem?.id}
                            postItem={postItem}
                            key={index}
                            postCommentDeleltId={mainPost}
                            likedPosts={likedPosts}
                            deleteLikePost={deleteLikePost}
                            bookmarkPost={bookmarkPost}
                            removeBookmarkPosts={removeBookmarkPosts}
                            setToUpdateComments={setToUpdateComments}
                            toUpdateComments={toUpdateComments}
                            parentPost={parentPost}
                          />
                        );
                      })
                    )}
                  </div>
                )}
              </Content>
            </>
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default Comment;
