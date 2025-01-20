import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center m-10">
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
          <div
            key={_id}
            className="flex justify-between items-center bg-base-300 p-4 my-4 w-2/3 mx-auto"
          >
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
            <div>
              <button
                className="btn btn-active btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                {" "}
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
