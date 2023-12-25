import { getComments } from "./getComments";

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
    const id = "postId";

    const setUserPost = jest.fn();
    const setError = jest.fn();
    const setLoading = jest.fn();

    getComments(setUserPost, setError, setLoading, id);
  });
});
