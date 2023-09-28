import { Button, Empty, Image, Layout, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import { useUserAuth } from "../../context/AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import Posts from "../HomePage/Posts";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { Link } from "react-router-dom";

type NotificationType = "success" | "info" | "warning" | "error";

const Profile: React.FC<any> = ({
  posts,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const { user, currUser, userDoc }: any = useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const onFinish = async (values: any) => {
    try {
      const updateProfile = doc(db, "users", userDoc);
      const obj = {
        username: values.username.username,
        profile: values.profile.profile,
        bio: values.bio.bio,
      };
      await updateDoc(updateProfile, obj);
      setUserProfile(obj);
      setIsModalOpen(false);
      openNotificationWithIcon("success", "Successfully updated profile");
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Something went wrong please try again!"
      );
    }
  };

  const colRef = collection(db, "posts");

  const getPosts = () => {
    getDocs(colRef)
      .then((snapshot) => {
        let postDocs: any = [];
        snapshot.docs.forEach((doc) => {
          postDocs.push({ ...doc.data(), id: doc.id });
        });

        const newposts = postDocs.filter((ele: any) => {
          return ele?.userId === currUser?.userId;
        });
        setUserPost(newposts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message, "Profile");
      });
  };

  useEffect(() => {
    getPosts();
    setUserProfile(currUser);
  }, [currUser, posts]);

  return (
    <>
      {contextHolder}
      {!userProfile || currUser === undefined ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "250px",
              height: "100vh",
              width: "100vw",
            }}
          >
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
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <div className="loading-spin">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <Layout className="profile-payout-div">
              <Layout className="site-layout scroll-app profile-layout">
                <Header />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
                                {userProfile?.username}{" "}
                              </p>
                              <p className="email-profile">{user?.email}</p>
                              <p className="bio-profile">{userProfile?.bio}</p>
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
                      <p className="user-posts">User not posted Anything</p>
                    </div>
                  ) : (
                    <Posts
                      posts={userPost}
                      likedPosts={likedPosts}
                      deleteLikePost={deleteLikePost}
                      bookmarkPost={bookmarkPost}
                      removeBookmarkPosts={removeBookmarkPosts}
                    />
                  )}
                </Content>
              </Layout>
            </Layout>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
