import { message } from "antd";
import { handleBookmark } from "./handleBookmark";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("handling bookmark function", () => {
  it("calling function", async () => {
    const post_id = "No0dfcBL2ClJSsUkc9sL";
    const openNotificationWithIcon = jest.fn();
    const callback = jest.fn();

    handleBookmark(post_id, openNotificationWithIcon, callback);
  });

  it("calling function for bookmarking post", async () => {
    const localStore = localStorage.getItem("userId");

    const post_id = "No0dfcBL2ClJSsUkc9sL";
    const openNotificationWithIcon = jest.fn();
    const callback = jest.fn();

    handleBookmark(post_id, openNotificationWithIcon, callback);

    if (!localStore) {
      message.error("Please Login to Bookmark");
    }
  });

  it("calling function for bookmarking post failed", async () => {
    const post_id = "";
    const openNotificationWithIcon = jest.fn();
    const callback = jest.fn();

    handleBookmark(post_id, openNotificationWithIcon, callback);
  });
});
