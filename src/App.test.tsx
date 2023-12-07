import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as utils from "./Utils/getBookmarkedPosts";
import * as likedPost from "./Utils/getLikedPosts";
import * as getPosts from "./Utils/getPosts";

const mockGetBookmarkedPosts = jest.spyOn(utils, "getBookmarkedPosts");
const mockGetLikedPosts = jest.spyOn(likedPost, "getLikedPosts");
const mockGetPosts = jest.spyOn(getPosts, "getPosts");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("App Component", () => {
  jest.mock("./Utils/getBookmarkedPosts.ts");
  jest.mock("./Utils/getPosts.ts");

  test("renders App component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(mockGetBookmarkedPosts).toBeCalled();
    expect(mockGetLikedPosts).toBeCalled();
    expect(mockGetPosts).toBeCalled();
  });

  test("infinite scroll test", () => {
    const { container } = render(
      <Router>
        <App />
      </Router>
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scrollContainer: any = container.querySelector('[data-foo="bar"]');

    scrollContainer.scrollTop =
      scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

    act(() => {
      fireEvent.click(scrollContainer);
    });
  });
});
