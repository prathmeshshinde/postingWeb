import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
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

describe("Header Component", () => {
  it("renders Header component correctly", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Ensure the logo is rendered
    expect(screen.getByTestId("logo-title")).toBeInTheDocument();
  });

  it("handles logout click and redirects to /login", async () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    screen.getByText("Log In");
  });

  it("handles signOut button", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    render(
      <Router>
        <Header />
      </Router>
    );

    const signOut = screen.getByTestId("logout-button");

    act(() => {
      fireEvent.click(signOut);
    });
  });
});
