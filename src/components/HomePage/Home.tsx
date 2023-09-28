import React, { useMemo, useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import {
  Layout,
  Space,
  Input,
  Button,
  Form,
  notification,
  Empty,
  Spin,
} from "antd";
import Header from "./Header";
import SinglePost from "./SinglePost";
import { handlePost } from "./Utils/handlePost";

type NotificationType = "success" | "info" | "warning" | "error";

const { Content } = Layout;

const Context = React.createContext({ name: "Default" });

const Home: React.FC<any> = ({
  posts,
  loading,
  forInfiniteScroll,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  infinteLoader,
  likedPostsId,
  bookmarkedPostId,
}) => {
  const [post, setPost] = useState("");
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(false);
  const { user, username, currUser }: any = useUserAuth();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
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

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Layout>
        <Layout
          className="site-layout scroll-app"
          onScroll={(e) => forInfiniteScroll(e)}
        >
          <Header />

          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div className="post-div">
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
                    handlePost(
                      currUser,
                      user,
                      openNotificationWithIcon,
                      setPost,
                      post,
                      date,
                      limit,
                      username
                    )
                  }
                >
                  <Form.Item>
                    <Input
                      className="post-input"
                      placeholder="Write Post"
                      value={post}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ height: "40px" }}
                    >
                      Post
                    </Button>
                  </Form.Item>
                </Form>
              </Space.Compact>
            </div>
            {limit ? (
              <p className="limit-text">Please enter only 100 characters</p>
            ) : null}

            {loading ? (
              <div className="loading-spin">
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </div>
            ) : (
              <div>
                {posts.length === 0 ? (
                  <div style={{ marginTop: "100px" }}>
                    <Empty />
                  </div>
                ) : (
                  <div style={{ marginTop: "20px" }}>
                    {posts?.map((postItem: any, index: number) => {
                      return (
                        <SinglePost
                          postItem={postItem}
                          key={index}
                          likedPosts={likedPosts}
                          deleteLikePost={deleteLikePost}
                          bookmarkPost={bookmarkPost}
                          removeBookmarkPosts={removeBookmarkPosts}
                          likedPostsId={likedPostsId}
                          bookmarkedPostId={bookmarkedPostId}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {infinteLoader && !loading ? (
              <div className="loading-spin-infinte">
                <Spin tip="Loading" size="large">
                  <div className="content" />
                </Spin>
              </div>
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </Context.Provider>
  );
};

export default Home;
