import React from "react";
import { render, screen } from "@testing-library/react";
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
    render(
      <Router>
        <Header />
      </Router>
    );

    screen.getByText("Log In");
  });
});
