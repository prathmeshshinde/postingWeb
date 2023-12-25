import { updateTable } from "./updateTable";

describe("update table function", () => {
  test("calling function", async () => {
    const data = {
      bookmarks: 0,
      comment: 1,
      date: 1702914772383,
      id: "W1juFU4LHJxnMPsz3auD",
      index: 0,
      likes: 0,
      post: "hey",
      postId: "W1juFU4LHJxnMPsz3auD",
      profile:
        "https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg",
      userId: "HWagV2HNOXbQKwc1MnwwGeJ6ESo2",
      username: "Newton",
    };
    updateTable(data);
  });
});
