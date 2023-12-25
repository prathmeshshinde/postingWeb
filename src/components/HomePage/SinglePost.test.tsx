import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SinglePost from "./SinglePost";
import { AuthProvider } from "../../context/AuthContext";
import { act } from "react-dom/test-utils";
import * as utils from "./Utils/handleLike";
import * as utilsBook from "./Utils/handleBookmark";
const mockhandleLike = jest.spyOn(utils, "handleLike");
const mockhandleBookmark = jest.spyOn(utilsBook, "handleBookmark");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Single Post Component", () => {
  jest.mock("./Utils/handleLike.ts");
  jest.mock("./Utils/handleBookmark.ts");
  const samplePost = {
    id: "RdscsnHkpKhQ8nA2cO6G",
    userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
    username: "Newton",
    post: "This is a test post",
    date: new Date().toISOString(),
    likes: 0,
    bookmarks: 0,
    comment: 0,
    postId: "RdscsnHkpKhQ8nA2cO6G",
    profile: "",
  };

  // const currUser = {
  //   bio: "Backend Developer",
  //   docId: "No0dfcBL2ClJSsUkc9sL",
  //   profile:
  //     "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
  //   userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
  //   username: "Newton",
  // };

  it("renders SinglePost component correctly", () => {
    render(
      <Router>
        <SinglePost
          postItem={samplePost}
          compare={() => {}}
          postCommentDeleltId={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          handleRemoveLike={() => {}}
          handleRemoveBookmarkPosts={() => {}}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setToUpdateComments={() => {}}
          toUpdateComments={false}
          parentPost={[]}
        />
      </Router>
    );

    expect(screen.getByTestId("posts")).toBeInTheDocument();
  });

  it("shows posts data correctly", async () => {
    render(
      <Router>
        <SinglePost
          postItem={samplePost}
          compare={() => {}}
          postCommentDeleltId={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          handleRemoveLike={() => {}}
          handleRemoveBookmarkPosts={() => {}}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setToUpdateComments={() => {}}
          toUpdateComments={false}
          parentPost={[]}
        />
      </Router>
    );

    expect(screen.getByText("Newton")).toBeInTheDocument();
    expect(screen.getByText("This is a test post")).toBeInTheDocument();
  });

  it("handles modal", async () => {
    render(
      <Router>
        <SinglePost
          postItem={samplePost}
          compare={"qrg5YbUH8JUji08ZLDywHqcsVUP2"}
          postCommentDeleltId={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          handleRemoveLike={() => {}}
          handleRemoveBookmarkPosts={() => {}}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setToUpdateComments={() => {}}
          toUpdateComments={false}
          parentPost={[]}
        />
      </Router>
    );

    expect(screen.queryByTestId("three-dot")).toBeNull();
  });

  it("handle update modal", async () => {
    const contextValues = {
      bio: "Backend Developer",
      docId: "No0dfcBL2ClJSsUkc9sL",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };

    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    render(
      <Router>
        <AuthProvider.Provider
          value={{
            contextValues,
          }}
        >
          <SinglePost
            postItem={samplePost}
            compare={"HWagV2HNOXbQKwc1MnwwGeJ6ESo2"}
            postCommentDeleltId={[]}
            likedPosts={[]}
            deleteLikePost={[]}
            bookmarkPost={[]}
            removeBookmarkPosts={[]}
            handleRemoveLike={() => {}}
            handleRemoveBookmarkPosts={() => {}}
            likedPostsId={[]}
            bookmarkedPostId={[]}
            setToUpdateComments={() => {}}
            toUpdateComments={false}
            parentPost={[]}
          />
        </AuthProvider.Provider>
      </Router>
    );

    // if (location.pathname !== "/like" && location.pathname !== "/bookmark") {
    //   expect(screen.getByTestId("div-main"));
    // }

    // act(() => {
    // fireEvent.mouseEnter(hoverDots);
    // });
  });

  it("handle profile image, like and bookmark", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    render(
      <Router>
        <SinglePost
          postItem={samplePost}
          compare={"HWagV2HNOXbQKwc1MnwwGeJ6ESo2"}
          postCommentDeleltId={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          handleRemoveLike={() => {}}
          handleRemoveBookmarkPosts={() => {}}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setToUpdateComments={() => {}}
          toUpdateComments={false}
          parentPost={[]}
        />
      </Router>
    );

    expect(screen.getByTestId("text-profile")).toBeInTheDocument();

    expect(screen.getByTestId("like-button-page")).toBeInTheDocument();
    expect(screen.getByTestId("bookmark-button-page")).toBeInTheDocument();

    const outlinedHeart = screen.getByTestId("outline-like-icon-post");
    const outlinedBook = screen.getByTestId("outline-bookmark-icon-post");

    act(() => {
      fireEvent.click(outlinedHeart);
      fireEvent.click(outlinedBook);
    });

    expect(mockhandleLike).toBeCalled();
    expect(mockhandleBookmark).toBeCalled();
  });

  it("handle profile image, like and bookmark", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    render(
      <Router>
        <SinglePost
          postItem={samplePost}
          compare={"HWagV2HNOXbQKwc1MnwwGeJ6ESo2"}
          postCommentDeleltId={[]}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          handleRemoveLike={() => {}}
          handleRemoveBookmarkPosts={() => {}}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setToUpdateComments={() => {}}
          toUpdateComments={false}
          parentPost={[]}
        />
      </Router>
    );

    expect(screen.getByTestId("div-main")).toBeInTheDocument();

    const outlinedHeart = screen.getByTestId("three-dot-test");

    // expect(screen.getByTestId("like-button-page")).toBeInTheDocument();
    // expect(screen.getByTestId("bookmark-button-page")).toBeInTheDocument();

    // const outlinedHeart = screen.getByTestId("outline-like-icon-post");
    // const outlinedBook = screen.getByTestId("outline-bookmark-icon-post");

    act(() => {
      fireEvent.mouseEnter(outlinedHeart);
      //   fireEvent.click(outlinedBook);
    });

    // expect(screen.getByText("Update the post")).toBeInTheDocument();

    // expect(mockhandleLike).toBeCalled();
    // expect(mockhandleBookmark).toBeCalled();
  });
});
