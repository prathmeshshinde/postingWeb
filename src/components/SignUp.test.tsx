import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./SignUp";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
}));

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders signup form", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
  });

  test("submits signup form successfully", async () => {
    const { getByPlaceholderText } = render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    const button = screen.getByTestId("signup-button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
