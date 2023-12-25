import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Home Component", () => {
  const mockposts = [
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098084",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098086",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098088",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098084",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098086",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098088",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098084",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098086",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098088",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098084",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098086",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
    {
      length: 0,
      bookmarks: 0,
      comment: 1,
      date: "1702989098088",
      edited: "Edited",
      id: "W1juFU4LHJxnMPsz3auD",
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    },
  ];

  const mockForInfiniteScroll = jest.fn();

  test("renders Home component with form and posts", async () => {
    render(
      <MemoryRouter>
        <Home
          posts={[]}
          loading={false}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );
  });

  test("handles post submission correctly", () => {
    render(
      <MemoryRouter>
        <Home
          posts={[]}
          loading={false}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );

    const postInput = screen.getByPlaceholderText("Write Post");
    const postButton = screen.getByText("Post");

    act(() => {
      fireEvent.change(postInput, { target: { value: "Send a mail to Dad" } });
      fireEvent.click(postButton);
    });
  });

  test("handles post text limit", () => {
    render(
      <MemoryRouter>
        <Home
          posts={[]}
          loading={false}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );

    const postInput = screen.getByPlaceholderText("Write Post");

    act(() => {
      fireEvent.change(postInput, {
        target: {
          value:
            "Send a mail to Dad Send a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to DadSend a mail to Dad",
        },
      });
    });

    expect(screen.getByTestId("text-limit-on-post")).toBeInTheDocument();
  });

  test("loading", () => {
    render(
      <MemoryRouter>
        <Home
          posts={[]}
          loading={true}
          forInfiniteScroll={() => {}}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("loading-spin")).toBeNull();
  });

  test("posts are present in the data", () => {
    render(
      <MemoryRouter>
        <Home
          posts={mockposts}
          loading={false}
          forInfiniteScroll={jest.fn()}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );
  });

  test("checking infinite loader", () => {
    render(
      <MemoryRouter>
        <Home
          posts={mockposts}
          loading={false}
          forInfiniteScroll={jest.fn()}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={true}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("infinite-loader")).toBeInTheDocument();
  });

  test("checking infinite loader function", () => {
    render(
      <MemoryRouter>
        <Home
          posts={mockposts}
          loading={true}
          forInfiniteScroll={mockForInfiniteScroll}
          likedPosts={[]}
          deleteLikePost={[]}
          bookmarkPost={[]}
          removeBookmarkPosts={[]}
          infinteLoader={false}
          likedPostsId={[]}
          bookmarkedPostId={[]}
          setUpdatelikes={() => {}}
          updatelikes={false}
        />
      </MemoryRouter>
    );

    const container = screen.getByTestId("scroll-test");

    act(() => {
      fireEvent.scroll(container, { target: { scrollY: 1000 } });
    });

    expect(mockForInfiniteScroll).toHaveBeenCalledTimes(1);
  });
});
