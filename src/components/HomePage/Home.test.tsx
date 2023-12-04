import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

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
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </Router>
    );
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
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </Router>
    );

    const postInput = screen.getByPlaceholderText("Write Post");
    const postButton = screen.getByText("Post");

    act(() => {
      fireEvent.change(postInput, { target: { value: "Send a mail to Dad" } });
      fireEvent.click(postButton);
    });
  });
});
