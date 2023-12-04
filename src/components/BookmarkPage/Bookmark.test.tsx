import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Bookmark from "./Bookmark";
import { BrowserRouter as Router } from "react-router-dom";
import * as utils from "./getBookmarkPosts";

const mockHandleBookmarks = jest.spyOn(utils, "getBookmarkPosts");

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

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spin")).toBeNull()
    );
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

    expect(screen.queryByTestId("loading-spin")).toBeNull();

    expect(mockHandleBookmarks).toBeCalled();
  });
});
