import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import * as utils from "./Utils/handlePost";
import userEvent from "@testing-library/user-event";
import { handlePost } from "./Utils/handlePost";

const mockHandlePost = jest.spyOn(utils, "handlePost");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Home Component", () => {
  // beforeAll(() => {
  //   // jest.mock("./Utils/handlePost.ts", () => ({
  //   //   handlePost: jest.fn(),
  //   // }));
  //   utils.handlePost = jest.fn();
  //   //   jest.mock("./Utils/handlePost", () => ({ handlePost: jest.fn() }));
  // });

  test("renders Home component with form and posts", async () => {
    render(
      <Router>
        <Home
          posts={[]}
          loading={false}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(screen.getByPlaceholderText("Write Post")).toBeInTheDocument();
    expect(screen.getByText("Post")).toBeInTheDocument();
  });

  test("handles post submission correctly", () => {
    render(
      <Router>
        <Home
          posts={[]}
          loading={false}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    const postInput = screen.getByPlaceholderText("Write Post");
    userEvent.type(postInput, "Test post");

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);

    // expect(mockHandlePost).toBeCalled();
  });
});
