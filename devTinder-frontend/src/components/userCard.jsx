import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL, GUEST_IMAGE } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendrequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error in handleSendrequest:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl py-5 px-7">
      <figure className="">
        <img src={photoUrl || GUEST_IMAGE} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <span>Age: {age}</span>}
        {gender && <span>Gender: {gender}</span>}
        <p>{about || "No information provided."}</p>
        <p>{skills || "Add skills"}</p>
        <div className="card-actions flex justify-center gap-6">
          <button
            className="btn btn-primary"
            onClick={() => handleSendrequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendrequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
