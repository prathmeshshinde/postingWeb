import { getLikedPosts } from "./getLikedPosts";

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

    const setUserPost = jest.fn();
    const setError = jest.fn();
    const setLoading = jest.fn();

    getLikedPosts(setUserPost, setError, setLoading, likedPosts);
  });
});
