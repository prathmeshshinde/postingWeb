import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

import { BrowserRouter as Router } from "react-router-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Login Component", () => {
  test("renders login form", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByText("Log in")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  test("submits login form successfully", async () => {
    const mockNav = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNav,
    }));

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(getByText("Log in"));
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
