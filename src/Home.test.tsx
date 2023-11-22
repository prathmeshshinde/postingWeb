import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router } from "react-router-dom";

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

  test("handles post submission correctly", async () => {
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
    fireEvent.change(postInput, { target: { value: "Test post" } });

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);
  });
});
