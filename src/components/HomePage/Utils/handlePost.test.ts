import { handlePost } from "./handlePost";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("handling posts function", () => {
  it("calling function", async () => {
    const currUser = {
      bio: "Backend Developer",
      docId: "No0dfcBL2ClJSsUkc9sL",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    const user = jest.fn();
    const openNotificationWithIcon = jest.fn();
    const setPost = jest.fn();
    const post = "string";
    const date = "1703020544630";
    const limit = false;
    const username = "Newton";

    handlePost(
      currUser,
      user,
      openNotificationWithIcon,
      setPost,
      post,
      date,
      limit,
      username
    );
  });

  it("calling function for post validation", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");
    const currUser = {
      bio: "Backend Developer",
      docId: "No0dfcBL2ClJSsUkc9sL",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    const user = jest.fn();
    const openNotificationWithIcon = jest.fn();
    const setPost = jest.fn();
    const post = "   ";
    const date = "1703020544630";
    const limit = false;
    const username = "Newton";

    handlePost(
      currUser,
      user,
      openNotificationWithIcon,
      setPost,
      post,
      date,
      limit,
      username
    );

    expect(openNotificationWithIcon).toHaveBeenCalledWith(
      "error",
      "Please enter valid post!"
    );
  });
});
