import React from "react";
import { render, screen } from "@testing-library/react";
import Like from "./components/LikePage/Like";
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

describe("Like Component", () => {
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

    expect(screen.getByText("Liked Posts")).toBeInTheDocument();
  });

  test("renders loading spinner when loading", () => {
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
});
