import React from "react";
import { GUEST_IMAGE } from "../utils/constants";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl py-5 px-7">
      <figure>
        <img src={photoUrl || GUEST_IMAGE} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <p>{skills || "Add skills"}</p>
        <div className="card-actions flex justify-center gap-6">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
