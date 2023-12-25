import { updateCommentsTable } from "./updateCommentsTable";

describe("update comments from table function", () => {
  test("calling function", async () => {
    const data = {
      date: { seconds: 1702914103, nanoseconds: 663000000 },
      id: "hLp7YVMDz0xRCidZGLNz",
      index: 0,
      parentPostId: "aLqGn3zratGI2iPqCiee",
      post: "hii",
      postId: "hLp7YVMDz0xRCidZGLNz",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
      visibleDate: "Invalid Date",
    };
    updateCommentsTable(data);
  });
});
