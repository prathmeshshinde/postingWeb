import { message } from "antd";
import { handleComment } from "./handleComment";

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
    const currUser = {
      bio: "Backend Developer",
      docId: "No0dfcBL2ClJSsUkc9sL",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    const setError = jest.fn();

    const comment = "comment";

    const postItem = {
      id: "RdscsnHkpKhQ8nA2cO6G",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
      post: "This is a test post",
      date: new Date().toISOString(),
      likes: 0,
      bookmarks: 0,
      comment: 0,
      postId: "RdscsnHkpKhQ8nA2cO6G",
      profile: "",
    };

    const username = "Newton";
    const setComments = jest.fn();
    const setComment = jest.fn();
    const date = "918721921";
    const user = jest.fn();

    handleComment(
      currUser,
      setError,
      comment,
      postItem,
      username,
      setComments,
      setComment,
      date,
      user
    );
  });

  it("if not login", async () => {
    const local = localStorage.getItem("userId");

    const currUser = {};
    const setError = jest.fn();

    const comment = "comment";

    const postItem = {
      id: "RdscsnHkpKhQ8nA2cO6G",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
      post: "This is a test post",
      date: new Date().toISOString(),
      likes: 0,
      bookmarks: 0,
      comment: 0,
      postId: "RdscsnHkpKhQ8nA2cO6G",
      profile: "",
    };

    const username = "Newton";
    const setComments = jest.fn();
    const setComment = jest.fn();
    const date = "918721921";
    const user = jest.fn();
    const messageSpy = jest.spyOn(message, "error");

    handleComment(
      currUser,
      setError,
      comment,
      postItem,
      username,
      setComments,
      setComment,
      date,
      user
    );

    if (!local) {
      expect(messageSpy).toHaveBeenCalledWith("Please login first");
    }
  });

  it("check if comment is valid or not", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");
    const currUser = {};
    const setError = jest.fn();

    const comment = "  ";

    const postItem = {
      id: "RdscsnHkpKhQ8nA2cO6G",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
      post: "this is new post",
      date: new Date().toISOString(),
      likes: 0,
      bookmarks: 0,
      comment: 0,
      postId: "RdscsnHkpKhQ8nA2cO6G",
      profile: "",
    };

    const username = "Newton";
    const setComments = jest.fn();
    const setComment = jest.fn();
    const date = "918721921";
    const user = jest.fn();
    const messageSpy = jest.spyOn(message, "error");

    handleComment(
      currUser,
      setError,
      comment,
      postItem,
      username,
      setComments,
      setComment,
      date,
      user
    );

    if (comment.trim().length !== 0) {
      expect(messageSpy).toHaveBeenCalledWith("Please enter valid comment");
    }
  });

  it("check if comment is valid or not", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");
    const currUser = {};
    const setError = jest.fn();

    const comment = "comment";

    const postItem = {
      id: "RdscsnHkpKhQ8nA2cO6G",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
      post: "  ",
      date: new Date().toISOString(),
      likes: 0,
      bookmarks: 0,
      comment: 0,
      postId: "RdscsnHkpKhQ8nA2cO6G",
      profile: "",
    };

    const username = "Newton";
    const setComments = jest.fn();
    const setComment = jest.fn();
    const date = "918721921";
    const user = jest.fn();

    handleComment(
      currUser,
      setError,
      comment,
      postItem,
      username,
      setComments,
      setComment,
      date,
      user
    );
  });
});
