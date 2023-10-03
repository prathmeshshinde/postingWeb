import { Button, Divider, Empty, Form, Input, Layout, Space, Spin } from "antd";
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

const Comment: React.FC<any> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const location = useLocation();
  const { postItem } = location?.state;
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(false);
  const { user, username, currUser }: any = useUserAuth();
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPost, setMainPost] = useState<any>();
  const [error, setError] = useState<any>();

  const getPost = async () => {
    const docRef = doc(db, "posts", postItem?.id);
    const document = await getDoc(docRef);
    const post = { ...document.data(), id: postItem?.id };
    setMainPost(post);
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
    getComments(setError, setComments, setLoading, postItem);
    getPost();
  }, []);

  return (
    <>
      <Layout className="profile-payout-div">
        <Layout className="site-layout scroll-app ">
          {!postItem && !location ? (
            <p className="no-comments-text">You can not access this page</p>
          ) : (
            <Content style={{ margin: "0px 0px 0", overflow: "initial" }}>
              <Header />
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

              <SinglePost
                postItem={mainPost}
                likedPosts={likedPosts}
                deleteLikePost={deleteLikePost}
                bookmarkPost={bookmarkPost}
                removeBookmarkPosts={removeBookmarkPosts}
              />

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
                      {/* <p className="no-comments-text">No Comments</p> */}
                    </div>
                  ) : (
                    comments?.map((postItem: any, index: number) => {
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
                        />
                      );
                    })
                  )}
                </div>
              )}
            </Content>
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default Comment;
