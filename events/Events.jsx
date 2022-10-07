import React, { useState, useEffect } from "react";
import eventsService from "../../services/eventsService";
import toastr from "toastr";
import EventsRightCard from "./EventsRightCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import EventsLeftCard from "./EventsLeftCard";
import EventsModal from "./EventsModal";
import MapArray from "./MapArray";

function Events() {
  const [pageData, setPageData] = useState({
    arrayOfEvents: [],
    eventComponent: [],
  });

  const [leftPage, setLeftPage] = useState({
    arrayOfEvents: [],
    eventComponent: [],
  });

  const [mapper, setmapper] = useState([]);

  const [searchDate, setSearchDate] = useState({ dateStart: {}, dateEnd: {} });

  function toggleModal(job) {
    setModal((pState) => {
      let modal = { ...pState };
      modal = job;
      modal.isOpen = !pState.isOpen;
      modal.toggle = { toggleModal };
      return modal;
    });
  }

  function addToggleModal() {
    setModal((pState) => {
      let myModal = { ...pState };
      myModal.isOpen = !pState.isOpen;
      myModal.toggle = { addToggleModal };
      return myModal;
    });
  }

  function flipVisibility() {
    setModal((pState) => {
      let closeModal = { ...pState };
      closeModal.isOpen = !pState.isOpen;
      modal.toggle = { toggleModal };
      return closeModal;
    });
  }

  const [modal, setModal] = useState({
    isOpen: false,
    toggle: { toggleModal },
    id: 0,
    dateStart: "",
    dateEnd: "",
    latitude: 0,
    longitude: 0,
    zipCode: "",
    address: "",
    name: "",
    headline: "",
    description: "",
    summary: "",
    slug: "",
    statusId: "Active",
  });

  const [eventPagination, setEventPagination] = useState({
    totalCount: 3,
    pageSize: 2,
    currentPage: 1,
    pageIndex: 0,
  });

  useEffect(() => {
    eventsService
      .GetPaginated(eventPagination.pageIndex, eventPagination.pageSize)
      .then(getEventsSuccess)
      .catch(getEventsError);
  }, [eventPagination.pageIndex]);

  function getEventsSuccess(response) {
    let eventArr = response.pagedItems;

    toastr.success("getEventsSuccess");
    setPageData((pState) => {
      const pageData = { ...pState };
      pageData.arrayOfEvents = eventArr;
      pageData.eventComponent = eventArr.map(mapRightEvent); // so for every friend we are mapping it here
      return pageData;
    });
    setEventPagination((pState) => {
      let eventPagination = { ...pState };
      eventPagination.totalCount = response.totalCount;
      eventPagination.pageSize = 2;
      return eventPagination;
    });
  }

  function getEventsError(error) {
    console.log("getEventsError", error);
    toastr.error("getEventsError");
  }

  function OnPaginationChange(page) {
    setEventPagination((pState) => {
      let nextPagi = { ...pState };
      nextPagi.currentPage = page;
      nextPagi.pageIndex = page - 1;
      return nextPagi;
    });
  }

  function eventOnViewMore(aEvent) {
    setLeftPage((pState) => {
      let newLeftState = { ...pState };
      newLeftState.arrayOfEvents = [aEvent];
      console.log("newLeftState.arrayOfEvents ", newLeftState.arrayOfEvents);
      newLeftState.eventComponent =
        newLeftState.arrayOfEvents.map(mapLeftEvent); // why is this not a map function ?
      return newLeftState;
    });
  }

  const mapLeftEvent = (aEvent) => {
    aEvent.dateStart = new Date(aEvent.dateStart).toDateString();
    aEvent.dateEnd = new Date(aEvent.dateEnd).toDateString();
    return (
      <EventsLeftCard
        event={aEvent} //this is how we are passing props to the Events card component
        key={Math.random() * 12376}
      />
    );
  };

  const mapRightEvent = (aEvent) => {
    console.log("mapRightEvent", aEvent);
    aEvent.dateStart = new Date(aEvent.dateStart).toDateString();
    aEvent.dateEnd = new Date(aEvent.dateEnd).toDateString();
    return (
      <EventsRightCard
        event={aEvent} //this is how we are passing props to the Events card component
        key={aEvent.id}
        onEventClicked={toggleModal} // x2 data from on local friend clicked passed here and called click handler with this information
        onViewMoreClicked={eventOnViewMore}
      />
    );
  };

  const remapRightEvent = (aEvent) => {
    console.log("remapRightEvent", aEvent);
    aEvent.dateStart = new Date(aEvent.dateStart).toDateString();
    aEvent.dateEnd = new Date(aEvent.dateEnd).toDateString();

    return (
      <EventsRightCard
        event={aEvent} //this is how we are passing props to the Events card component
        key={aEvent.id}
        onEventClicked={toggleModal} // x2 data from on local friend clicked passed here and called click handler with this information
        onViewMoreClicked={eventOnViewMore}
      />
    );
  };

  function handleDateChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setModal((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value
      return SearchData;
    });
  }

  function handleModalChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setModal((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value
      return SearchData;
    });
  }

  function handleMyDateChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setSearchDate((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value
      return SearchData;
    });
  }
  function handleAddressChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setModal((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value
      return SearchData;
    });
  }

  function onSearchClicked(e) {
    e.preventDefault();
    eventsService
      .GETDATE(searchDate.dateStart, searchDate.dateEnd)
      .then(onEventByDateSuccess)
      .catch(onEventByDateError);
  }

  function onEventByDateSuccess(response) {
    console.log("onEventByDateSuccess", response);
    setPageData((pState) => {
      let searchData = { ...pState };
      searchData.arrayOfEvents = response;
      searchData.eventComponent = searchData.arrayOfEvents.map(remapRightEvent);
      return searchData;
    });
    setEventPagination((pState) => {
      let eventPagination = { ...pState };
      eventPagination.totalCount = response.totalCount;
      return eventPagination;
    });
  }
  function onEventByDateError(err) {
    console.log("onEventByDateError", err);
  }
  function onPostEvent() {
    console.log("onPostEvent");
    if (!modal.id) {
      eventsService.ADD(modal).then(onAddEventSuccess).catch(onAddEventError);
    } else {
      eventsService.ByID(modal).then(onPostByIdSuccess).catch(onPostByIdError);
    }
  }

  function onPostByIdSuccess(response) {
    console.log("onPostByIdSuccess", response);
  }

  function onPostByIdError(error) {
    console.log("onPostByIdSuccess", error);
  }

  function onAddEventSuccess(response) {
    console.log("onPostByIdSuccess", response);
  }

  function onAddEventError(error) {
    console.log("onPostByIdSuccess", error);
  }
  const [mapState, setmapState] = useState({ isShown: false });

  function toggleMainMap() {
    eventsService.GET().then(onGetAllEvSuccess).catch(onGetAllEvError);
    console.log("hi");
    setmapState((pState) => {
      let map = { ...pState };
      map.isShown = true;
      return map;
    });
  }

  function onGetAllEvSuccess(response) {
    console.log("onPostByIdSuccess", response.pagedItems);
    setmapper((pState) => {
      let mapper = { ...pState };
      mapper = response.pagedItems;
      return mapper;
    });
  }

  console.log(mapper);

  function onGetAllEvError(error) {
    console.log("onPostByIdSuccess", error);
  }

  return (
    <React.Fragment>
      <div className="containerRight d-flex ">
        <div className="containerLeft w-50  float-left text-primary">
          {mapState.isShown && <MapArray mapArray={mapper} />}
          {!mapState.isShown && leftPage.eventComponent}
        </div>
        <div className="datePick text-white ">
          <div className=" p-3 w-75   ">
            <h2>Search Dates From:</h2>

            <h4>From:</h4>
            <form action="">
              <input
                type="date"
                id="rightSideDate1"
                className="form-control"
                name="dateStart"
                value={searchDate.dateStart}
                onChange={handleMyDateChange}
              />

              <h4>To:</h4>
              <input
                type="date"
                id="rightSideDate2"
                className="form-control"
                placeholder="select Date"
                name="dateEnd"
                value={searchDate.dateEnd}
                onChange={handleMyDateChange}
              />
              <button
                onClick={onSearchClicked}
                className="btn btn-outline-warning m-4 searchButtonDate mx-2 "
              >
                Search
              </button>
            </form>

            <div className=" card-deck border-warning text-dark">
              <span className="pagination  float-right">
                <Pagination
                  onChange={OnPaginationChange}
                  current={eventPagination.currentPage}
                  total={eventPagination.totalCount}
                  locale={locale}
                  pageSize={eventPagination.pageSize}
                />
                <button onClick={toggleMainMap} className="m-2 btn btn-warning">
                  View All On Map
                </button>
                <button
                  className="m-2 btn btn-success"
                  onClick={addToggleModal}
                >
                  Add Event
                </button>
              </span>

              {pageData.eventComponent}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {modal.isOpen && (
        <EventsModal
          {...modal}
          onpostEventClicked={onPostEvent}
          modalChange={handleModalChange}
          modalStaadt={setModal}
          addressModal={handleAddressChange}
          dateModal={handleDateChange}
          closeMyModal={flipVisibility}
        />
      )}
    </React.Fragment>
  );
}

export default Events;
