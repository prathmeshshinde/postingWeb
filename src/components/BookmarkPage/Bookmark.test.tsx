import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Bookmark from "./Bookmark";
import { BrowserRouter as Router } from "react-router-dom";
import * as utils from "./getBookmarkPosts";
const mockGetBookmarks = jest.spyOn(utils, "getBookmarkPosts");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Bookmark Component", () => {
  jest.mock("./getBookmarkPosts.ts");
  test("renders loading spin while fetching bookmarked posts", async () => {
    render(
      <Router>
        <Bookmark
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(screen.queryByTestId("loading-spin")).toBeNull();
  });

  test("renders bookmarked posts", async () => {
    render(
      <Router>
        <Bookmark
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(mockGetBookmarks).toBeCalled();

    await waitFor(() => {
      expect(screen.queryByText("loading-spin")).toBeNull();
    });

    expect(screen.getByTestId("login-tet")).toBeInTheDocument();

    // const removeBookmarkButton = screen.getByTestId("remove-bookmark-button-1");
  });

  test("renders bookmarked posts", async () => {
    const userPost = "My Initial State";
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [userPost, () => null]);
    // .mockImplementationOnce(() => [loading, () => false]);

    render(
      <Router>
        <Bookmark
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[
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
          ]}
          removeBookmarkPosts={[]}
          likedPostsId={[]}
          bookmarkedPostId={[]}
        />
      </Router>
    );

    expect(mockGetBookmarks).toBeCalled();

    await waitFor(() => {
      expect(screen.queryByText("loading-spin")).toBeNull();
      // expect(screen.getByTestId("posts")).toBeInTheDocument();
    });

    // const removeBookmarkButton = screen.getByTestId("remove-bookmark-button-1");
  });
});
