import React, { useState, useEffect, useCallback } from "react";
import serviceFunctions from "../../services/friendService.js";
import { useNavigate } from "react-router-dom";
import Person from "./Person";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";

function Friends() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    arrayOfFriends: [],
    friendComponents: [],
  });
  const _logger = debug.extend("friendPage");

  const [query, setQuery] = useState("");

  const [toggle, setToggle] = useState({ show: false });

  const onOnDeleteRequested = useCallback((myPerson) => {
    // allows us to referenece the data that wa passed through this function.
    //x3 click handler called htis function and passed the e0bj and  my person arguments
    //use callback is like react.use memo , subsequent rendering uses hte same funtion and data , empty array allows the second map function to work
    console.log("Callback", myPerson.id);
    const handler = getDeleteSuccessHandler(myPerson.id);
    serviceFunctions.DELETE(myPerson.id).then(handler).catch(onDeleteError);
  }, []);

  const [myPagination, setPagination] = useState({
    totalCount: 15,
    pageSize: 3,
    currentPage: 1,
    pageIndex: 0,
  });

  function onEditFriendRequested(myFriend) {
    console.log("is firing onEditFriendRequested", myFriend);
    const payload = myFriend;
    payload.primaryImage = myFriend.primaryImage;
    payload.id = myFriend.id;
    payload.skills = payload.skills.map((skill) => skill.name);
    const state = { type: "edit_friend", payload };
    navigate(`/AddFriend/${myFriend.id}`, { state });
  }

  const mapFriend = (aFriend) => {
    //console.log("mapping", aFriend);
    return (
      <Person
        friend={aFriend}
        key={aFriend.id}
        onPersonClicked={onOnDeleteRequested} // x2 data from on local friend clicked passed here and called click handler with this information
        onEditFriendClicked={onEditFriendRequested}
      />
    );
  };

  useEffect(() => {
    _logger("logger from inside of my use effect function on freinds");
    console.log("firing useEffect for get people");
    serviceFunctions
      .GET(myPagination.pageIndex, myPagination.pageSize)
      .then(getFriendsSuccess)
      .catch(getFriendsError);
  }, [myPagination.pageIndex]);

  const onDeleteError = (response) => {
    console.error("deleting", response);
  };

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    // this is called in the firned card and we are passing that data back through props as a parameter for this entire function.
    // filtering inside of this function.
    console.log("getDeleteSuccessHandler", idToBeDeleted);
    return () => {
      console.log("ONDELSUCCESS", idToBeDeleted); // DEL STOPPING HERE FOR SOME RzEASON
      toastr.success("your task was completed");
      setPageData((pState) => {
        const pageData = { ...pState }; //copy over previous state
        pageData.arrayOfFriends = [...pageData.arrayOfFriends]; //we want to ensure this pointer is pointing to a brand new array
        const indexOf = pageData.arrayOfFriends.findIndex((person) => {
          // sending each friend through the index until it finds a match. It will loop over and over until it gets a match. this will return the index of . will find the index position in the array
          //index of is kindof like the filter, it will stop at the fiest id it matches or whatever we pass into it through pointer events
          let result = false; //default boolean of false
          if (person.id === idToBeDeleted) {
            //setting a condition to be met for resut to equal true
            result = true;
          }
          return result; //return true or false to to continue to the next statement
        });
        if (indexOf >= 0) {
          //if you found someone who does actually match, then splice him out below.
          //statement to check ourID
          pageData.arrayOfFriends.splice(indexOf, 1); //splice manipulates the data for us, and this is a copy so it is not the state array and update teh data based off of what we found. Below this line we will set the array equal to the same array to an array with that person spliced out
          pageData.friendComponents = pageData.arrayOfFriends.map(mapFriend); //generate a new array of friends based off of the one we just created
        }
        return pageData;
      });
    };
  };

  const getFriendsSuccess = (response) => {
    let friendArr = response.pagedItems; //doing this to grab the total value

    setPageData((pState) => {
      const pageData = { ...pState };
      pageData.arrayOfFriends = friendArr;
      pageData.friendComponents = friendArr.map(mapFriend); // so for every friend we are mapping it here
      return pageData;
    });
    setPagination((pState) => {
      let RPS = { ...pState };
      RPS.totalCount = response.totalCount;
      return RPS;
    });
  };

  const getFriendsError = (error) => {
    console.warn(error);
  };

  function onAddFriendClicked() {
    setPageData((pState) => {
      return { ...pState, isActive: true };
    });
  }

  function onToggleFriendClicked() {
    setToggle((pState) => {
      let newState = { ...pState };
      newState.show = !pState.show;
      return newState;
    });
  }

  //#region------------------------------------------------QUERY FREINDS-----------------------------------------------

  const handleSearchChange = (e) => {
    const target = e.target;

    const value = target.value;

    setQuery((pState) => {
      let queryString = { ...pState };
      queryString = value;
      return queryString;
    });
  };

  const handleQuerySubmit = () => {
    serviceFunctions
      .Query(query)
      .then(queryFriendSuccess)
      .catch(queryFriendError);
  };

  const queryFriendSuccess = (response) => {
    setPageData((pState) => {
      let queryPageData = { ...pState };
      queryPageData.arrayOfFriends = response; // you need to take the first array of frinds
      queryPageData.friendComponents =
        queryPageData.arrayOfFriends.map(mapFriend); // and you need to greab the jsx array so that you can map the friends to the jsx array
      return queryPageData;
    });
  };

  const queryFriendError = (error) => {
    console.log("queryFriendError", error);
    toastr.error("Please Try Again");
  };
  //#endregion

  //#region--------------------------------------------------  PAGINATION-------------------------------------------------

  function OnPaginationChange(page) {
    setPagination((pState) => {
      let nextPagi = { ...pState };
      nextPagi.currentPage = page;
      nextPagi.pageIndex = page - 1;
      return nextPagi;
    });
  }
  //#region PAGINATION LOGIC

  //#endregion

  //#endregion

  return (
    <React.Fragment>
      <div className="row g-3 align-items-center searchContainer">
        <div className="col-auto">
          <label htmlFor="query" className="col-form-label text-white">
            <button
              onClick={handleQuerySubmit}
              className="btn btn-outline-primary text-primary bg-white"
            >
              <strong>Search Friends </strong>
            </button>
          </label>
        </div>
        <div className="col-auto">
          <input
            onChange={handleSearchChange}
            type="text"
            id="query"
            name="query"
            className="form-control"
            //value={query} it will only have a value if you need to populate it
          ></input>
        </div>
      </div>

      <div className="toggleButton">
        {pageData.isActive && navigate("/AddFriend")}
      </div>

      <div>
        <button
          onClick={onToggleFriendClicked}
          className="btn btn-primary border border-white m-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Toggle Your Friends
        </button>
        <button className="btn btn-success w-4 " onClick={onAddFriendClicked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Friend
        </button>
      </div>

      <div className="pagNumbers">
        <Pagination
          onChange={OnPaginationChange}
          current={myPagination.currentPage}
          total={myPagination.totalCount}
          locale={locale}
          pageSize={myPagination.pageSize}
        />
      </div>

      <div className="flex-wrap d-flex card-deck justify-content-center">
        {toggle.show && pageData.friendComponents}{" "}
      </div>
    </React.Fragment>
  );
}

export default Friends;
