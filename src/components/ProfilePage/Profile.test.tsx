import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import { BrowserRouter as Router } from "react-router-dom";

// const mockUseUserAuth = jest.spyOn(utils, "useUserAuth");
// jest.mock("../../context/AuthContext", () => ({
//   useUserAuth: jest.fn(),
// }));

describe("Profile Component", () => {
  const mockUseUserAuth = jest.fn();
  jest.mock("../../context/AuthContext");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("../../context/AuthContext").useUserAuth.mockImplementation(
    mockUseUserAuth
  );

  // test("renders loading spin while fetching posts", async () => {
  //   render(
  //     <Router>
  //       <Profile
  //         posts={[]}
  //         likedPosts={[]}
  //         deleteLikePost={[]}
  //         bookmarkPost={[]}
  //         removeBookmarkPosts={[]}
  //       />
  //     </Router>
  //   );

  //   expect(screen.queryByTestId("loading-spin")).toBeNull();
  // });

  test("render all posts by user", async () => {
    const mockUserContextValues = {
      user: { email: "test@example.com" },
      currUser: {
        bio: "Frontend Developer",
        docId: "hwMh3xLETQ7Jbnj8kH5Q",
        profile:
          "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
        userId: "r7LYMgb29if8de7oqmfM7qwYLDU2",
        username: "Issac Newton",
      },
      userDoc: "r7LYMgb29if8de7oqmfM7qwYLDU2",
      setUpdateCurrUser: jest.fn(),
      updateCurrUser: false,
    };

    mockUseUserAuth.mockReturnValue(mockUserContextValues);

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

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("handles Edit Profile button click", async () => {
    // Mock the user context values
    const mockUserContextValues = {
      user: { email: "test@example.com" },
      currUser: {
        bio: "Frontend Developer",
        docId: "hwMh3xLETQ7Jbnj8kH5Q",
        profile:
          "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
        userId: "r7LYMgb29if8de7oqmfM7qwYLDU2",
        username: "Issac Newton",
      },
      userDoc: "r7LYMgb29if8de7oqmfM7qwYLDU2",
      setUpdateCurrUser: jest.fn(),
      updateCurrUser: false,
    };

    mockUseUserAuth.mockReturnValue(mockUserContextValues);

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

    // Wait for the loading to complete

    // Assert that the modal is opened
    // expect(screen.getByDataShowModal("show-modal")).toBeInTheDocument();
    // You can add more assertions for the modal content
  });
});
