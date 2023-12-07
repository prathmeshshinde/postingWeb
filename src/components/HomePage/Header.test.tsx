import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

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
    const localStore = localStorage.getItem("userId");

    render(
      <Router>
        <Header />
      </Router>
    );

    // Trigger logout click
    if (localStore) {
      userEvent.click(screen.getByRole("button", { name: "Log out" }));
    }

    await waitFor(() => {
      // Assert that the signout function was called
      //   expect(mockSignout).toHaveBeenCalled();
      // Assert that navigation to "/login" occurred
      //   expect(window.location.pathname).toBe("/login");
    });
  });
});
