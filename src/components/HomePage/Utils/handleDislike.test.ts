import { handleDislike } from "./handleDislike";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("handling bookmark function", () => {
  it("calling function", async () => {
    const deleteLikePost = [
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
    ];
    const postItem = {
      bookmarks: 0,
      comment: 0,
      date: 1703020544630,
      id: "23WCddvxqnijAOqP3dp5",
      likes: 0,
      post: "hi",
      postId: "23WCddvxqnijAOqP3dp5",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    const location = {
      hash: "",
      key: "default",
      pathname: "/",
      search: "",
      state: null,
    };
    const handleRemoveLike = jest.fn();
    const callback = jest.fn();

    handleDislike(
      deleteLikePost,
      postItem,
      handleRemoveLike,
      location,
      callback
    );
  });

  it("calling function on like page", async () => {
    const deleteLikePost = [
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        likedId: "2ejW4JIb8mNmYVfgCeuW",
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
    ];
    const postItem = {
      bookmarks: 0,
      comment: 0,
      date: 1703020544630,
      id: "23WCddvxqnijAOqP3dp5",
      likes: 0,
      post: "hi",
      postId: "23WCddvxqnijAOqP3dp5",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    const location = {
      hash: "",
      key: "default",
      pathname: "/like",
      search: "",
      state: null,
    };
    const handleRemoveLike = jest.fn();
    const callback = jest.fn();

    handleDislike(
      deleteLikePost,
      postItem,
      handleRemoveLike,
      location,
      callback
    );
  });

  // it("calling function for bookmarking post", async () => {
  //   const localStore = localStorage.getItem("userId");

  //   const post_id = "No0dfcBL2ClJSsUkc9sL";
  //   const openNotificationWithIcon = jest.fn();
  //   const callback = jest.fn();

  //   handleBookmark(post_id, openNotificationWithIcon, callback);

  //   if (!localStore) {
  //     message.error("Please Login to Bookmark");
  //   }
  // });

  // it("calling function for bookmarking post failed", async () => {
  //   const post_id = "";
  //   const openNotificationWithIcon = jest.fn();
  //   const callback = jest.fn();

  //   handleBookmark(post_id, openNotificationWithIcon, callback);
  // });
});
