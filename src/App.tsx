import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { config } from "./firebase_config";
import AuthContext from "./context/AuthContext";
import SignUp from "./components/SignUp";
import { getFirestore, limit } from "firebase/firestore";
import Profile from "./components/ProfilePage/Profile";
import Comment from "./components/CommentsPage/Comment";
import Like from "./components/LikePage/Like";
import Bookmark from "./components/BookmarkPage/Bookmark";
import SideBar from "./components/SideBar";
import { Layout } from "antd";
import { getPosts } from "./Utils/getPosts";
import { getLikedPosts } from "./Utils/getLikedPosts";
import { getBookmarkedPosts } from "./Utils/getBookmarkedPosts";
import { IPost } from "./Interface/IPost";
import {
  IBookmarkPosts,
  IDeleteLikedPosts,
  ILikedPosts,
  IRemoveBookmarkPosts,
} from "./Interface/ILikedAndBookmarkPosts";

initializeApp(config.firebaseConfig);
export const db = getFirestore();

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scroll, setScroll] = useState<number>(10);
  const [likedPosts, setLikedPosts] = useState<ILikedPosts[]>([]);
  const [deleteLikePost, SetDeleteLikePost] = useState<IDeleteLikedPosts[]>([]);
  const [bookmarkPost, setBookmarkPost] = useState<IBookmarkPosts[]>([]);
  const [removeBookmarkPosts, setRemoveBookmarkPosts] = useState<
    IRemoveBookmarkPosts[]
  >([]);
  const location = useLocation();
  const [infinteLoader, setInfinteLoader] = useState<boolean>(true);
  const [likedPostId, setLikedPostId] = useState<any>();
  const [bookmarkPostId, setBookmarkPostId] = useState<any>();

  const forInfiniteScroll = (e: any) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 10
    ) {
      setScroll((prevState) => prevState + 10);
      setInfinteLoader(false);
    }
  };

  useEffect(() => {
    getLikedPosts(SetDeleteLikePost, setLikedPostId, setLikedPosts);
    getBookmarkedPosts(
      setRemoveBookmarkPosts,
      setBookmarkPost,
      setBookmarkPostId
    );
    getPosts(limit, scroll, setPosts, setLoading);
  }, [scroll]);

  return (
    <div className="App" onClick={(e) => forInfiniteScroll(e)}>
      <AuthContext>
        <Layout hasSider>
          {location.pathname !== "/login" && location.pathname !== "/signup" ? (
            <SideBar />
          ) : null}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <Home
                  posts={posts}
                  loading={loading}
                  forInfiniteScroll={forInfiniteScroll}
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                  infinteLoader={infinteLoader}
                  likedPostsId={likedPostId}
                  bookmarkedPostId={bookmarkPostId}
                />
              }
            />

            <Route
              path="/comment"
              element={
                <Comment
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                />
              }
            />
            <Route
              path="/like"
              element={
                <Like
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                  likedPostsId={likedPostId}
                  bookmarkedPostId={bookmarkPostId}
                />
              }
            />
            <Route
              path="/bookmark"
              element={
                <Bookmark
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                  bookmarkedPostId={bookmarkPostId}
                  likedPostsId={likedPostId}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  posts={posts}
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                />
              }
            />
          </Routes>
        </Layout>
      </AuthContext>
    </div>
  );
}

export default App;
