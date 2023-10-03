import { Button, Empty, Image, Layout, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import { useUserAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { Link } from "react-router-dom";
import SinglePost from "../HomePage/SinglePost";
import { getPosts } from "./Utils/getPosts";

type NotificationType = "success" | "info" | "warning" | "error";

const Profile: React.FC<any> = ({
  posts,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const { user, currUser, userDoc, setUpdateCurrUser, updateCurrUser }: any =
    useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [userPost, setUserPost] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(currUser);
  const [api, contextHolder] = notification.useNotification();

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

  const updateAllPosts = async (values: any, obj: any) => {
    for (let i = 0; i < userPost?.length; i++) {
      const updateAllPosts = doc(db, "posts", userPost[i].postId);
      await updateDoc(updateAllPosts, obj);
    }
    setUserPost(userPost);
    setUserProfile(obj);
  };

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
      updateAllPosts(values, obj);
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
        <Layout className="profile-payout-div">
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
          {currUser === undefined ? (
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
              <Layout className="profile-payout-div">
                <Layout className="site-layout scroll-app profile-layout">
                  <Header />
                  <Content
                    style={{ margin: "24px 16px 0", overflow: "initial" }}
                  >
                    <div className="profile-main">
                      <div className="profile-head">
                        <div>
                          {currUser?.profile === "" ? (
                            <div className="profile-image-conatainer">
                              <p className="profile-image-circle">
                                {userProfile.username.charAt(0)}
                              </p>
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
                          <Button type="primary" onClick={showModal}>
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
                    />

                    {userPost.length === 0 ? (
                      <div style={{ marginTop: "100px" }}>
                        <Empty />
                      </div>
                    ) : (
                      <div style={{ marginTop: "20px" }}>
                        {userPost?.map((postItem: any, index: number) => {
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
