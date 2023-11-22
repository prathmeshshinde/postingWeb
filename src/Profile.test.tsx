import { render, screen, waitFor } from "@testing-library/react";
import Profile from "./components/ProfilePage/Profile";
import { BrowserRouter as Router } from "react-router-dom";

describe("Profile Component", () => {
  test("renders loading spin while fetching posts", async () => {
    // Mock the useUserAuth hook response

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
});
