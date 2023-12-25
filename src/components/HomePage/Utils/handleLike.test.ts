import { handleLike } from "./handleLike";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("handling Like function", () => {
  it("calling function", async () => {
    const post_id = "No0dfcBL2ClJSsUkc9sL";
    const openNotificationWithIcon = jest.fn();
    const callback = jest.fn();

    handleLike(post_id, openNotificationWithIcon, callback);
  });
});
