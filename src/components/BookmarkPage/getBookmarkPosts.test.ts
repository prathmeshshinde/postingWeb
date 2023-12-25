import { getBookmarkPosts } from "./getBookmarkPosts";

describe("Get Bookmarked posts function", () => {
  test("calling function", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    const setError = jest.fn();
    const setLoading = jest.fn();
    const setUserPost = jest.fn();
    const bookmarkPost = [
      {
        postId: "YeoOz1kFV3NCYxpkN0Zs",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        postId: "YeoOz1kFV3NCYxpkN0Zs",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        postId: "YeoOz1kFV3NCYxpkN0Zs",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
      {
        postId: "YeoOz1kFV3NCYxpkN0Zs",
        userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
      },
    ];

    getBookmarkPosts(bookmarkPost, setError, setLoading, setUserPost);
  });
});
