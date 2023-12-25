import { getPosts } from "./getPosts";

describe("Get Liked posts function", () => {
  test("calling function", async () => {
    const setPosts = jest.fn();
    const setLoading = jest.fn();
    const limit = jest.fn();
    const scroll = 0;

    getPosts(limit, scroll, setPosts, setLoading);
  });
});
