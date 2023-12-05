import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Myposts from "./Myposts";
import * as utils from "../../Utils/getPostsForTable";

const mockHandleLikes = jest.spyOn(utils, "getPostsForTable");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("My posts Component", () => {
  jest.mock("../../Utils/getPostsForTable.ts");
  test("renders Table component", () => {
    render(
      <Router>
        <Myposts />
      </Router>
    );
  });

  test("renders Posts in table", () => {
    render(
      <Router>
        <Myposts />
      </Router>
    );

    expect(mockHandleLikes).toBeCalled();
  });
});
