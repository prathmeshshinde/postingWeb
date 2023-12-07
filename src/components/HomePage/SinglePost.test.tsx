import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SinglePost from "./SinglePost";

describe("Header Component", () => {
  const samplePost = {
    id: "postId123",
    userId: "qrg5YbUH8JUji08ZLDywHqcsVUP2",
    username: "john_doe",
    post: "This is a test post",
    date: new Date().toISOString(),
    likes: 0,
    bookmarks: 0,
    comment: 0,
  };

  it("renders Header component correctly", () => {
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

  it("renders Header component correctly", async () => {
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

    expect(screen.getByText("john_doe")).toBeInTheDocument();
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
});
