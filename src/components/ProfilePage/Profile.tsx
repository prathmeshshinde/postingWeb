import { Button, Empty, Image, Layout, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { useUserAuth } from "../../context/AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { Link } from "react-router-dom";
import SinglePost from "../HomePage/SinglePost";
import { getPosts } from "./Utils/getPosts";
import {
  IBookmarkPosts,
  IDeleteLikedPosts,
  ILikedPosts,
  IRemoveBookmarkPosts,
} from "../../Interface/ILikedAndBookmarkPosts";
import { IPost } from "../../Interface/IPost";
const { Content } = Layout;

type NotificationType = "success" | "info" | "warning" | "error";

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any;
  likedPosts: ILikedPosts[];
  deleteLikePost: IDeleteLikedPosts[];
  bookmarkPost: IBookmarkPosts[];
  removeBookmarkPosts: IRemoveBookmarkPosts[];
}

const Profile: React.FC<IProps> = ({
  posts,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, currUser, userDoc, setUpdateCurrUser, updateCurrUser }: any =
    useUserAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userPost, setUserPost] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userProfile, setUserProfile] = useState<any>(currUser);
  const [api, contextHolder] = notification.useNotification();
  const localStore = localStorage.getItem("userId");

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAllComments = async (obj: any) => {
    for (let i = 0; i < posts.length; i++) {
      const colRef = collection(db, "posts", posts[i]?.postId, "comments");

      await getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach(async (docs) => {
          if (docs.data().userId === localStore) {
            const updateComments = doc(
              db,
              "posts",
              posts[i].postId,
              "comments",
              docs.data().postId
            );

            await updateDoc(updateComments, obj);
          }
        });
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateAllPosts = async (obj: any) => {
    for (let i = 0; i < userPost?.length; i++) {
      const updateAllPosts = doc(db, "posts", userPost[i].postId);
      await updateDoc(updateAllPosts, obj);
    }
    setUserPost(userPost);
    setUserProfile(obj);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    try {
      const updateProfile = doc(db, "users", userDoc);
      const obj = {
        username: values.username.username,
        profile: values.profile.profile,
        bio: values.bio.bio,
      };
      setUpdateCurrUser(!updateCurrUser);
      await updateDoc(updateProfile, obj);
      updateAllPosts(obj);
      getAllComments(obj);
      setIsModalOpen(false);
      openNotificationWithIcon("success", "Successfully updated profile");
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Something went wrong please try again!"
      );
    }
  };

  useEffect(() => {
    setUserProfile(currUser);
  }, [currUser]);

  useEffect(() => {
    getPosts(currUser, setUserPost, setLoading);
  }, [posts, currUser, userProfile]);

  return (
    <>
      {contextHolder}
      {loading ? (
        <Layout className="profile-payout-div ">
          <Layout className="site-layout scroll-app profile-layout">
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          </Layout>
        </Layout>
      ) : (
        <>
          {localStore === null ? (
            <Layout className="profile-payout-div">
              <Layout className="site-layout scroll-app profile-layout">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "underline",
                    textAlign: "center",
                    fontSize: "25px",
                    marginTop: "30px",
                    fontWeight: "600",
                  }}
                >
                  Login here
                </Link>
              </Layout>
            </Layout>
          ) : (
            <>
              <Layout className="profile-payout-div margin-top">
                <Layout className="site-layout scroll-app profile-layout">
                  <Header />
                  <Content
                    style={{ margin: "24px 16px 0", overflow: "initial" }}
                  >
                    <div className="profile-main" data-test="profile-test">
                      <div className="profile-head">
                        <div>
                          {currUser?.profile === "" ? (
                            <div>
                              <div className="profile-image-conatainer">
                                <p className="profile-image-circle">
                                  {userProfile.username.charAt(0)}
                                </p>
                              </div>
                              <div style={{ marginTop: "10px" }}>
                                <p className="username-profile">
                                  {userProfile?.username}
                                </p>
                                <p className="email-profile">{user?.email}</p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="image-circle">
                                <Image
                                  className="image-circle"
                                  src={userProfile?.profile}
                                  alt="profile"
                                />
                              </div>
                              <div>
                                <p className="username-profile">
                                  {userProfile?.username}
                                </p>
                                <p className="email-profile">{user?.email}</p>
                                <p className="bio-profile">
                                  {userProfile?.bio}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <Button
                            type="primary"
                            onClick={showModal}
                            data-edit-button="edit-button"
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </div>

                    <ProfileUpdateModal
                      isModalOpen={isModalOpen}
                      handleCancel={handleCancel}
                      onFinish={onFinish}
                      currUser={userProfile}
                      data-show-modal="show-modal"
                    />

                    <div data-user-posts="all-user-posts">
                      {userPost.length === 0 ? (
                        <div
                          style={{ marginTop: "100px" }}
                          data-show-empty-posts="empty-posts"
                        >
                          <Empty />
                        </div>
                      ) : (
                        <div style={{ marginTop: "20px" }}>
                          {userPost?.map((postItem: IPost, index: number) => {
                            return (
                              <SinglePost
                                key={index}
                                postItem={postItem}
                                likedPosts={likedPosts}
                                deleteLikePost={deleteLikePost}
                                bookmarkPost={bookmarkPost}
                                removeBookmarkPosts={removeBookmarkPosts}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
