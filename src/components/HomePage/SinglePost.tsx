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
import DeletePostModal from "../ProfilePage/DeletePostModal";
import { Link, useLocation } from "react-router-dom";
import { Card, Divider, Popover, Tooltip, notification } from "antd";
import { showLikedPosts } from "./Utils/showLikedPosts";
import { showBookmarkedPosts } from "./Utils/showBookmarkedPosts";
import { handleLike } from "./Utils/handleLike";
import { handleDislike } from "./Utils/handleDislike";
import { handleBookmark } from "./Utils/handleBookmark";
import { handleRemoveBookmark } from "./Utils/removeBookmarkPosts";

type NotificationType = "success" | "info" | "warning" | "error";

const Context = React.createContext({ name: "Default" });

const SinglePost: React.FC<any> = ({
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
}) => {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [openPop, setOpenPop] = useState<any>(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState<any>(false);
  const { currUser }: any = useUserAuth();
  const [likedPostId, setLikedPostId] = useState<any>();
  const [bookmarkPostId, setBookmarkPostId] = useState<any>();
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();

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

  const showModal = () => {
    setDeleteIsModalOpen(true);
  };

  const content = (
    <div>
      <div>
        {currUser?.userId === compare ? null : (
          <p className="update-button" onClick={() => updatePost()}>
            Update the post
          </p>
        )}
        <p className="delete-button" onClick={showModal}>
          Delete
        </p>
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
  }, [currUser, compare, deleteLikePost, removeBookmarkPosts]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <div className="posts-container">
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
                  <img
                    className="image-container"
                    src={postItem?.profile}
                    alt="profile"
                  />
                )}
              </div>
              <div className="post-section">
                <p className="post-username">{postItem?.username}</p>
                <p className="post-date">{postItem?.date}</p>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div>
                {location.pathname !== "/like" &&
                location.pathname !== "/bookmark" &&
                currUser ? (
                  <Popover placement="leftTop" content={content}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      {currUser?.userId === postItem?.userId ||
                      currUser?.userId === compare ? (
                        <MoreOutlined
                          onClick={() => setOpenPop(!openPop)}
                          style={{ fontSize: "20px", color: "#000" }}
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

          <DeletePostModal
            isDeleteOpenModal={isDeleteModalOpen}
            setDeleteIsModalOpen={setDeleteIsModalOpen}
            postId={postItem?.id}
            setOpenPop={setOpenPop}
            postCommentDeleltId={postCommentDeleltId}
          />

          <UpdatePostModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            post={postItem}
            setOpenPop={setOpenPop}
          />
          <p className="post-text">{postItem?.post}</p>

          {location.pathname !== "/comment" ? (
            <Divider style={{ margin: "20px 0px" }} />
          ) : null}

          {location.pathname !== "/comment" ? (
            <div className="post-feature-buttons">
              {location.pathname !== "/like" &&
              location.pathname !== "/bookmark" ? (
                <Link
                  to="/comment"
                  className="link-style"
                  state={{
                    postItem: postItem,
                  }}
                >
                  <Tooltip title="Comment">
                    <CommentOutlined
                      style={{ fontSize: "20px", marginLeft: "20px" }}
                    />
                  </Tooltip>
                </Link>
              ) : null}

              {location.pathname !== "/profile" ? (
                <div>
                  {likedPostId?.includes(postItem?.postId) ? (
                    <Tooltip title="Dislike">
                      <HeartFilled
                        onClick={() =>
                          handleDislike(
                            currUser,
                            deleteLikePost,
                            postItem,
                            handleRemoveLike,
                            location
                          )
                        }
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          color: "#1677ff",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Like">
                      <HeartOutlined
                        onClick={() =>
                          handleLike(
                            postItem?.id,
                            currUser,
                            openNotificationWithIcon
                          )
                        }
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}
                </div>
              ) : null}

              {location.pathname !== "/profile" ? (
                <div>
                  {bookmarkPostId?.includes(postItem?.postId) ? (
                    <Tooltip title="Remove Bookmark">
                      <ReadFilled
                        onClick={() =>
                          handleRemoveBookmark(
                            currUser,
                            removeBookmarkPosts,
                            postItem,
                            location,
                            handleRemoveBookmarkPosts
                          )
                        }
                        style={{
                          fontSize: "20px",
                          marginRight: "20px",
                          cursor: "pointer",
                          color: "#1677ff",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Bookmark">
                      <ReadOutlined
                        onClick={() =>
                          handleBookmark(
                            postItem?.id,
                            currUser,
                            openNotificationWithIcon
                          )
                        }
                        style={{
                          fontSize: "20px",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  )}
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
