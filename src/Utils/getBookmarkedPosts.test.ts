import { act } from "@testing-library/react";
import { getBookmarkedPosts } from "./getBookmarkedPosts"; // Update the import path accordingly
import { collection, getDocs, query } from "firebase/firestore";
import { message } from "antd";
// import { mocked } from "ts-jest/utils";
// import { getDocs } from "firebase/firestore";

// Mocking Firebase functions
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));

// // Mocking React setState

jest.mock("antd", () => ({
  message: {
    error: jest.fn(),
  },
}));

// // Mocking your interfaces
jest.mock("../Interface/ILikedAndBookmarkPosts", () => ({
  IBookmarkPosts: jest.fn(),
  IRemoveBookmarkPosts: jest.fn(),
}));

describe("getBookmarkedPosts", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  // test("render", () => {});

  test("fetches bookmarked posts successfully", async () => {
    const mockSnapshot = {
      docs: [
        { data: () => ({ postId: "1" }), id: "bookmarkId1" },
        { data: () => ({ postId: "2" }), id: "bookmarkId2" },
      ],
    };

    const docData = { data: "MOCK_DATA" };
    const docResult = {
      // simulate firestore get doc.data() function
      data: () => docData,
    };

    jest.fn(() => Promise.resolve(docResult));

    const setRemoveBookmarkPostsMock = jest.fn();
    const setBookmarkPostMock = jest.fn();
    const setBookmarkPostIdMock = jest.fn();
  });

  test("handles errors and shows message", async () => {
    // Mock Firestore functions to simulate an error
    // getDocs.mockRejectedValueOnce(new Error("Firebase error"));
    jest.fn(() => Promise.reject());
    // await act(async () => {
    //   getBookmarkedPosts(jest.fn(), jest.fn(), jest.fn());
    // });
    // Assertion: Ensure the error message is shown
    // expect(message.error).toHaveBeenCalledWith("Firebase error");
  });
});
