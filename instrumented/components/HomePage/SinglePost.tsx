import React, { useEffect, useMemo, useState } from "react";
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  ReadFilled,
  ReadOutlined,
} from "@ant-design/icons";
import UpdatePostModal from "../ProfilePage/UpdatePostModal";
import { useUserAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Divider,
  Popconfirm,
  Popover,
  Tooltip,
  message,
  notification,
} from "antd";
import { showLikedPosts } from "./Utils/showLikedPosts";
import { showBookmarkedPosts } from "./Utils/showBookmarkedPosts";
import { handleLike } from "./Utils/handleLike";
import { handleDislike } from "./Utils/handleDislike";
import { handleBookmark } from "./Utils/handleBookmark";
import { handleRemoveBookmark } from "./Utils/removeBookmarkPosts";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { Typography } from "antd";
import { ISinglePost } from "../../Interface/ISinglePost";

const { Title } = Typography;

type NotificationType = "success" | "info" | "warning" | "error";

const Context = React.createContext({ name: "Default" });

const SinglePost: React.FC<ISinglePost> = ({
  postItem,
  compare,
  postCommentDeleltId,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  handleRemoveLike,
  handleRemoveBookmarkPosts,
  likedPostsId,
  bookmarkedPostId,
  setToUpdateComments,
  toUpdateComments,
  parentPost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [noOfBookmarks, setNoOfBookmarks] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currUser }: any = useUserAuth();
  const [likedPostId, setLikedPostId] = useState<string[]>([]);
  const [bookmarkPostId, setBookmarkPostId] = useState<string[]>([]);
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const updatePost = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    if (location.pathname === "/comment") {
      try {
        await deleteDoc(
          doc(db, "posts", postCommentDeleltId?.id, "comments", postItem?.id)
        );
        setToUpdateComments(!toUpdateComments);
        message.success("Comment Deleted");
        const parentComment = doc(db, "posts", postCommentDeleltId?.id);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getDoc(parentComment).then((res: any) => {
          const obj = { comment: res?.data().comment - 1 };
          if (postCommentDeleltId?.id === res.data().postId) {
            const updateLikeCount = doc(
              db,
              "posts",
              postCommentDeleltId?.postId
            );
            updateDoc(updateLikeCount, obj);
          }
        });
      } catch (err) {
        message.error("Something went wrong please try again");
      }
    } else {
      try {
        await deleteDoc(doc(db, "posts", postItem?.id));
        if (location.pathname === "/comment") {
          navigate("/");
        }

        message.success("Post Deleted");
      } catch (err) {
        message.error("Something went wrong please try again");
      }
    }
  };

  const content = (
    <div>
      <div>
        {currUser?.userId === compare &&
        currUser?.userId !== postItem?.userId ? null : (
          <p
            className="update-button"
            onClick={() => updatePost()}
            data-update-post="update-post"
          >
            Update the post
          </p>
        )}
        <Popconfirm
          title="Delete the post"
          description="Are you sure to delete this post?"
          onConfirm={handleOk}
          okText="Yes"
          cancelText="No"
          data-delete-post="delete-post"
        >
          <p className="delete-button" data-delete-post="delete-post">
            Delete
          </p>
        </Popconfirm>
      </div>
    </div>
  );

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  useEffect(() => {
    showLikedPosts(
      likedPosts,
      location,
      postItem,
      likedPostsId,
      currUser,
      setLikedPostId
    );
    showBookmarkedPosts(
      bookmarkedPostId,
      bookmarkPost,
      location,
      postItem,
      currUser,
      setBookmarkPostId
    );
    setNoOfLikes(postItem?.likes);
    setNoOfBookmarks(postItem?.bookmarks);
  }, [currUser, compare, deleteLikePost, removeBookmarkPosts]);

  const datePost = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(postItem.date).toLocaleString("en-GB", options);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <div className="posts-container" data-testid="posts">
        <Card
          style={{
            margin: "10px",
          }}
          className="card-div"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="post-user">
              <div>
                {postItem?.profile === "" ? (
                  <div className="text-conatainer">
                    <p className="text-profile">
                      {postItem?.username.charAt(0)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <img
                      className="image-container"
                      src={postItem?.profile}
                      alt="profile"
                    />
                  </div>
                )}
              </div>
              <div className="post-section">
                <p className="post-username">{postItem?.username}</p>
                <p className="post-date">{datePost()}</p>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div>
                {location.pathname !== "/like" &&
                location.pathname !== "/bookmark" &&
                currUser ? (
                  <Popover
                    placement="leftTop"
                    content={content}
                    trigger="hover"
                  >
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      {currUser?.userId === postItem?.userId ||
                      currUser?.userId === compare ? (
                        <MoreOutlined
                          style={{ fontSize: "20px", color: "#000" }}
                          data-three-dot="three-dot"
                        />
                      ) : null}
                    </div>
                  </Popover>
                ) : null}

                <div>
                  <p className="edited-text">{postItem?.edited}</p>
                </div>
              </div>
            </div>
          </div>

          <UpdatePostModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            post={postItem}
            setToUpdateComments={setToUpdateComments}
            parentPost={parentPost}
            setIsModalOpen={setIsModalOpen}
            toUpdateComments={false}
          />
          <p className="post-text">{postItem?.post}</p>

          {location.pathname !== "/comment" ? (
            <Divider style={{ margin: "20px 0px" }} />
          ) : null}

          {location.pathname !== `/comment` ? (
            <div className="post-feature-buttons">
              {location.pathname !== "/like" &&
              location.pathname !== "/bookmark" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/comment`}
                    className="link-style"
                    state={{
                      postItem: postItem,
                    }}
                    data-comment="data-comment-test"
                  >
                    <Tooltip title="Comment">
                      <CommentOutlined
                        style={{ fontSize: "20px", marginLeft: "0px" }}
                        className="handle-comment"
                      />
                    </Tooltip>
                  </Link>

                  <Title level={5} type="secondary" className="like-count-text">
                    {postItem.comment}
                  </Title>
                </div>
              ) : null}

              {location.pathname !== "/bookmark" ? (
                <div data-like-button="like-button-like-page">
                  {location.pathname !== "/profile" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {likedPostId?.includes(postItem?.postId) ? (
                        <Tooltip title="Dislike">
                          <HeartFilled
                            data-filled-like-icon="filled-like-icon"
                            onClick={async () => {
                              await handleDislike(
                                currUser,
                                deleteLikePost,
                                postItem,
                                handleRemoveLike,
                                location,
                                () => {
                                  setNoOfLikes((prev) => prev - 1);
                                  setLikedPostId((prevState: string[]) =>
                                    prevState?.filter(
                                      (id) => postItem?.postId !== id
                                    )
                                  );
                                }
                              );
                            }}
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#1677ff",
                            }}
                            className="handle-dislike"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Like">
                          <HeartOutlined
                            onClick={async () =>
                              await handleLike(
                                postItem?.id,
                                currUser,
                                openNotificationWithIcon,
                                () => {
                                  setNoOfLikes((prev) => prev + 1);
                                  setLikedPostId((prevState: string[]) => [
                                    ...prevState,
                                    postItem.postId,
                                  ]);
                                }
                              )
                            }
                            className="handle-like"
                            style={{ fontSize: "20px", cursor: "pointer" }}
                          />
                        </Tooltip>
                      )}
                      <Title
                        level={5}
                        type="secondary"
                        className="like-count-text"
                      >
                        {noOfLikes}
                      </Title>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {location.pathname !== "/like" ? (
                <div data-bookmark-button="bookmark-button-bookmark-page">
                  {location.pathname !== "/profile" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {bookmarkPostId?.includes(postItem?.postId) ? (
                        <Tooltip title="Remove Bookmark">
                          <ReadFilled
                            data-filled-bookmark-icon="filled-bookmark-icon"
                            onClick={() =>
                              handleRemoveBookmark(
                                currUser,
                                removeBookmarkPosts,
                                postItem,
                                location,
                                handleRemoveBookmarkPosts,
                                () => {
                                  setNoOfBookmarks((prev) => prev - 1);
                                  setBookmarkPostId((prevState: string[]) =>
                                    prevState?.filter(
                                      (id) => postItem?.postId !== id
                                    )
                                  );
                                }
                              )
                            }
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "#1677ff",
                            }}
                            className="handle-remove-bookmark"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Bookmark">
                          <ReadOutlined
                            onClick={() =>
                              handleBookmark(
                                postItem?.id,
                                currUser,
                                openNotificationWithIcon,
                                () => {
                                  setNoOfBookmarks((prev) => prev + 1);
                                  setBookmarkPostId((prevState: string[]) => [
                                    ...prevState,
                                    postItem.postId,
                                  ]);
                                }
                              )
                            }
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            className="handle-bookmark"
                          />
                        </Tooltip>
                      )}
                      <Title
                        level={5}
                        type="secondary"
                        className="like-count-text"
                      >
                        {noOfBookmarks}
                      </Title>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </Card>
      </div>
    </Context.Provider>
  );
};

export default SinglePost;
