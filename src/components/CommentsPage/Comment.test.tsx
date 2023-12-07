// Comment.test.jsx
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this to use the toBeInTheDocument matcher
import Comment from "./Comment";
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

describe("Comment Component", () => {
  it("renders without crashing", async () => {
    render(
      <Router>
        <Comment
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
        />
      </Router>
    );
  });
});
