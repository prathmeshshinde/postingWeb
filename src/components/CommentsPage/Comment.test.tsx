// Comment.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this to use the toBeInTheDocument matcher
import Comment from "./Comment";
import { MemoryRouter } from "react-router-dom";

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
  jest.mock("./Utils/getComments");
  it("renders without crashing", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Comment
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("not-accessible")).toBeInTheDocument();

    // expect(mockGetComments).toBeInTheDocument();

    // const postItem = {
    //   bookmarks: 0,
    //   comment: 1,
    //   date: "Dec 18, 2023",
    //   edited: "Edited",
    //   id: "W1juFU4LHJxnMPsz3auD",
    //   likes: 0,
    //   post: "hey",
    //   postId: "W1juFU4LHJxnMPsz3auD",
    //   profile:
    //     "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
    //   userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
    //   username: "Newton",
    // };

    // if (postItem) {

    // }
  });
});
