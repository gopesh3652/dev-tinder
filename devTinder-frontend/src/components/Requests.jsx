import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div>
        <h1>No request found</h1>
      </div>
    );
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white my-7">Requests</h1>
      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          age,
          gender,
        } = request.fromUserId;

        return (
          <div key={_id} className="flex bg-base-300 p-4 my-4 w-1/2 mx-auto">
            <div>
              <img
                alt="profilePhoto"
                className="w-24 h-24 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-5">
              <p>{firstName + " " + lastName}</p>
              <p>{about}</p>
              {age && <span>{age}</span>}
              {gender && <span>{gender}</span>}
              {skills && <p>{skills}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
