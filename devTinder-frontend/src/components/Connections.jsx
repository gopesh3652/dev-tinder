import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center m-10">
        <h1>No connection found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white my-7">Connections</h1>
      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
          age,
          gender,
        } = connection;

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

export default Connections;
