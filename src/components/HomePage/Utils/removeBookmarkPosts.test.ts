import { handleRemoveBookmark } from "./removeBookmarkPosts";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("handling Like function", () => {
  it("calling function", async () => {
    const removeBookmarkPosts = [
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
    const handleRemoveBookmarkPosts = jest.fn();
    const callback = jest.fn();

    handleRemoveBookmark(
      removeBookmarkPosts,
      postItem,
      location,
      handleRemoveBookmarkPosts,
      callback
    );
  });
});
