import { getBookmarkedPosts } from "./getBookmarkedPosts";

describe("Get Bookmarked posts function", () => {
  test("calling function", async () => {
    const setRemoveBookmarkPosts = jest.fn();
    const setBookmarkPost = jest.fn();
    const setBookmarkPostId = jest.fn();

    getBookmarkedPosts(
      setBookmarkPost,
      setBookmarkPostId,
      setRemoveBookmarkPosts
    );

    // expect(setBookmarkPost).toHaveBeenCalledWith(/* expected value */);
    // expect(setBookmarkPostId).toHaveBeenCalledWith(/* expected value */);
    // setRemoveBookmarkPosts
    //   setBookmarkPost
    //   setBookmarkPostId
    //   render(
    //     <Router>
    //       <Bookmark
    //         likedPosts={[]}
    //         deleteLikePost={[]}
    //         bookmarkPost={[]}
    //         removeBookmarkPosts={[]}
    //         likedPostsId={[]}
    //         bookmarkedPostId={[]}
    //       />
    //     </Router>
    //   );
    //   expect(screen.queryByTestId("loading-spin")).toBeNull();
  });
});
