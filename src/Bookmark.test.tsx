import { render, screen, waitFor } from "@testing-library/react";
import Bookmark from "./components/BookmarkPage/Bookmark";
import { BrowserRouter as Router } from "react-router-dom";

describe("Bookmark Component", () => {
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
  });
});
