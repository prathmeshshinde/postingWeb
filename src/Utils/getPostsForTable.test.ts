import { getPostsForTable } from "./getPostsForTable";

describe("Get posts for table function", () => {
  test("calling function", async () => {
    const setPosts = jest.fn();
    const setLoading = jest.fn();

    getPostsForTable(setPosts, setLoading);
  });
});
