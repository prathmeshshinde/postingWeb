import { getLikedPosts } from "./getLikedPosts";

describe("Get Liked posts function", () => {
  test("calling function", async () => {
    const SetDeleteLikePost = jest.fn();
    const setLikedPostId = jest.fn();
    const setLikedPosts = jest.fn();

    getLikedPosts(SetDeleteLikePost, setLikedPostId, setLikedPosts);
  });
});
