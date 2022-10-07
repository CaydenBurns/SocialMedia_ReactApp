import React from "react";

function Person(props) {
  const aFriend = props.friend;
  console.log(props.friend, "Looking fo rhte array of SKILLS");

  const onLocalFriendClicked = (e) => {
    props.onPersonClicked(props.friend, e); // x1 access click handler on the other page with these args
  };

  const onLocalEditFriendClicked = (e) => {
    props.onEditFriendClicked(props.friend, e);
  };

  return (
    <div className="card  border border-white border-2 m-4 booster bg-white ">
      <img
        src={aFriend.primaryImage.imageUrl}
        className="card-img-top Atrey"
        alt="..."
      ></img>
      <div className="card-body ">
        <h5 className="card-title">{aFriend.title}</h5>
        <p>{aFriend.bio}</p>
        <p className="card-text">{aFriend.summary}</p>
        <p className="card-text ">{aFriend.headline}</p>
        <p className="card-text">{aFriend.statusId}</p>
        <p className="card-text">{aFriend.skills.name}</p>
      </div>
      <button className="btn btn-danger" onClick={onLocalFriendClicked}>
        Remove Friend
      </button>
      <button
        className="btn btn-warning mt-3"
        onClick={onLocalEditFriendClicked}
      >
        Edit Friend
      </button>
    </div>
  );
}

export default React.memo(Person);
