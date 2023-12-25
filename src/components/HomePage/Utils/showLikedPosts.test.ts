import { showLikedPosts } from "./showLikedPosts";

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
    const likedPosts = [
      {
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        postId: "rTOisw2MZgygeATSyyoz",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
    ];

    const likedPostsId = [
      "rTOisw2MZgygeATSyyoz",
      "rTOisw2MZgygeATSyyoz",
      "rTOisw2MZgygeATSyyoz",
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
      length: 0,
    };
    const location = {
      hash: "",
      key: "default",
      pathname: "/",
      search: "",
      state: null,
    };
    const setLikedPostId = jest.fn();

    showLikedPosts(
      likedPosts,
      location,
      postItem,
      likedPostsId,
      setLikedPostId
    );
  });
});
