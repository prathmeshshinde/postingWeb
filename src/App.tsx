import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { config } from "./firebase_config";
import AuthContext from "./context/AuthContext";
import SignUp from "./components/SignUp";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";
import Profile from "./components/ProfilePage/Profile";
import Comment from "./components/CommentsPage/Comment";
import Like from "./components/LikePage/Like";
import Bookmark from "./components/BookmarkPage/Bookmark";
import SideBar from "./components/SideBar";
import { Layout } from "antd";

initializeApp(config.firebaseConfig);
export const db = getFirestore();

function App() {
  const [posts, setPosts] = useState<any>([]);
  const colRef = collection(db, "posts");
  const [loading, setLoading] = useState<boolean>(true);
  const [scroll, setScroll] = useState(10);
  const q = query(colRef, limit(scroll));
  const [likedPosts, setLikedPosts] = useState<any>([]);
  const [deleteLikePost, SetDeleteLikePost] = useState<any>([]);
  const [bookmarkPost, setBookmarkPost] = useState<any>();
  const [removeBookmarkPosts, setRemoveBookmarkPosts] = useState<any>();
  const location = useLocation();
  const [infinteLoader, setInfinteLoader] = useState(true);
  const [likedPostId, setLikedPostId] = useState<any>();
  const [bookmarkPostId, setBookmarkPostId] = useState<any>();

  const getPosts = () => {
    getDocs(q)
      .then((snapshot) => {
        let postDocs: any = [];
        snapshot?.docs?.forEach((doc) => {
          postDocs.push({ ...doc.data(), id: doc.id });
        });

        setPosts(postDocs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message, "app");
      });
  };

  const getLikedPosts = () => {
    const likedposts = query(collection(db, "likes"));
    getDocs(likedposts)
      .then((snapshot) => {
        let likedPosts: any = [];
        let toDeleteLike: any = [];
        let likedPostsId: any = [];
        snapshot?.docs.forEach((doc) => {
          likedPosts.push(doc.data());
          toDeleteLike.push({ ...doc.data(), likedId: doc.id });
          likedPostsId.push(doc.data().postId);
        });
        SetDeleteLikePost(toDeleteLike);
        setLikedPosts(likedPosts);
        setLikedPostId(likedPostsId);
      })
      .catch((err) => {
        console.log(err.message, "app");
      });
  };

  const getBookmarkedPosts = () => {
    const bookmarkposts = query(collection(db, "bookmarks"));
    getDocs(bookmarkposts)
      .then((snapshot) => {
        let bookmarkPosts: any = [];
        let toRemoveBookmark: any = [];
        let bookmarkPostId: any = [];
        snapshot?.docs.forEach((doc) => {
          bookmarkPosts.push(doc.data());
          toRemoveBookmark.push({ ...doc.data(), bookmarkedId: doc.id });
          bookmarkPostId.push(doc.data().postId);
        });
        setRemoveBookmarkPosts(toRemoveBookmark);
        setBookmarkPost(bookmarkPosts);
        setBookmarkPostId(bookmarkPostId);
      })
      .catch((err) => {
        console.log(err.message, "app");
      });
  };

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
    getLikedPosts();
    getBookmarkedPosts();
    getPosts();
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
                  posts={posts}
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
