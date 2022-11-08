import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Image, Modal } from "react-bootstrap";
import FeedContent from "./FeedContent";
import { db } from "./firebase-config";
import NavLoggedIn from "./NavLoggedIn";
import SideNavBar from "./SideNavBar";

import profile_image from "./../images/profile.jpg";
import { useCookies } from "react-cookie";
import SearchCard from "./SearchCard";

function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const searchQuery = window.location.pathname.split("/")[2];
  const [noResults, setNoResults] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const getSearchResults = async () => {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const nextLetter = (s) => {
      return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
        var c = a.charCodeAt(0);
        switch (c) {
          case 90:
            return "A";
          case 122:
            return "a";
          default:
            return String.fromCharCode(++c);
        }
      });
    };

    const getNext = (str) => {
      //abc -> abd
      var temp = str.split("").reverse().join("");
      var res = "";
      res += nextLetter(temp[0]);
      for (var i = 1; i < temp.length; i++) res += temp[i];
      return res.split("").reverse().join("");
    };

    const dbRef = collection(db, "users");
    const q = query(
      dbRef,
      where("fname", ">=", searchQuery),
      where("fname", "<", getNext(searchQuery))
    );
    const data = await getDocs(q);
    if (data.docs.length === 0) {
      setNoResults(true);
    } else {
      setSearchResults(
        data.docs.map((doc) => {
          if (doc.data) return { ...doc.data(), id: doc.id };
        })
      );
    }

    const temp = capitalizeFirstLetter(searchQuery);
    const q1 = query(
      dbRef,
      where("fname", ">=", temp),
      where("fname", "<", getNext(temp))
    );

    const newData = await getDocs(q1);
    if (newData.docs.length === 0 && noResults === false) {
      setNoResults(true);
    } else {
      setSearchResults(
        newData.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <div>
      <NavLoggedIn />
      <div className="d-flex">
        <div
          style={{ width: "25vw", paddingRight: "2%" }}
          className="side-bar-border"
        >
          <SideNavBar />
        </div>

        <div style={{ width: "50vw" }} className="p-3 side-bar-border nav-fix">
          {searchResults.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center nav-fix">
              <Alert>No Results Found.</Alert>
            </div>
          ) : (
            <div>
              <h3 className="text-primary mb-5">Search Results</h3>

              {searchResults.map((result, id) => {
                return (
                  <div className="mb-3">
                    <SearchCard props={result} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
