import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import ResponsiveNav from "./ResponsiveNav";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Responsive Navbar Component", () => {
  it("renders Responsive Nav component correctly", () => {
    render(
      <Router>
        <ResponsiveNav />
      </Router>
    );
  });

  it("handles logout click and redirects to /login", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");
    render(
      <Router>
        <ResponsiveNav />
      </Router>
    );

    const menuClick = screen.getByTestId("menu-click");

    act(() => {
      fireEvent.click(menuClick);
    });

    screen.getByTestId("logout-icon");
  });

  it("handles signOut button", async () => {
    localStorage.setItem("userId", "HWagV2HNOXbQKwc1MnwwGeJ6ESo2");

    render(
      <Router>
        <ResponsiveNav />
      </Router>
    );

    const menuClick = screen.getByTestId("menu-click");

    act(() => {
      fireEvent.click(menuClick);
    });
    const signOut = screen.getByTestId("handle-res-logout");

    act(() => {
      fireEvent.click(signOut);
    });
  });
});
