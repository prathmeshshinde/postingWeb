import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

describe("Profile Component", () => {
  test("renders loading spin while fetching posts", async () => {
    render(
      <Router>
        <Profile
          posts={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
        />
      </Router>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("loading-spin")).toBeNull()
    );
  });

  test("render all posts by user", async () => {
    render(
      <Router>
        <AuthContext>
          <Profile
            posts={[]}
            likedPosts={[]}
            deleteLikePost={[]}
            bookmarkPost={[]}
            removeBookmarkPosts={[]}
          />
        </AuthContext>
      </Router>
    );
  });
});
