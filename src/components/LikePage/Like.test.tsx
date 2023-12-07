import React from "react";
import { render, screen } from "@testing-library/react";
import Like from "./Like";
import { BrowserRouter as Router } from "react-router-dom";
import * as utils from "./getLikedPosts";

const mockHandleLikes = jest.spyOn(utils, "getLikedPosts");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Like Component", () => {
  jest.mock("./getLikedPosts.ts");
  test("renders Like component", () => {
    render(
      <Router>
        <Like
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(screen.getByText("My Likes")).toBeInTheDocument();
  });

  test("renders loading spin while fetching liked posts", async () => {
    render(
      <Router>
        <Like
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );
  });

  test("renders liked posts", () => {
    render(
      <Router>
        <Like
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(mockHandleLikes).toBeCalled();
  });

  test("renders liked posts", async () => {
    render(
      <Router>
        <Like
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    screen.getByText("Please login to see liked posts");

    expect(mockHandleLikes).toBeCalled();

    screen.getByText("Log In").click();
  });
});
