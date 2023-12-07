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
const { Content } = Layout;

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
  const postItem = location?.state?.postItem;
  const [comment, setComment] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [date, setDate] = useState<any>();
  const [limit, setLimit] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, username, currUser }: any = useUserAuth();
  const [comments, setComments] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mainPost, setMainPost] = useState<any>([]);
  const [error, setError] = useState<string>("");
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
    const current = new Date();
    setDate(current);

    if (e.target.value.length >= 100) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  };

  useEffect(() => {
    if (postItem) {
      getComments(setError, setComments, setLoading, postItem?.id);
      getPost();
    }
  }, [toUpdateComments]);

  return (
    <>
      <Layout className="profile-payout-div margin-top">
        <Layout className="site-layout scroll-app ">
          {!postItem || !location ? (
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
                    data-comment-page-title="comment-page-title"
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
                          data-post-comment-input="data-post-comment-input"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ height: "40px" }}
                          data-submit-comment="data-submit-comment"
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
                  <div className="show-comments">
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
