import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGermanClock } from "../hooks/useGermanClock";
import { reportEntry, reportExit } from "../services/userService";
import {getTimeGermany} from "../services/apiTimeGermany"

const UserPage: React.FC = () => {
  const { logout, role, token, userName } = useAuth();
  const navigate = useNavigate();

  const time = useGermanClock();

  const handleEntry = async () => {
    try {
      if (!userName || !token) 
        return;
      await reportEntry(userName, token);
      alert("Entry recorded");
    } catch (err) {
      console.error("Entry failed", err);
      alert("Failed to record entry");
    }
  };

  const handleExit = async () => {
    try {
      if (!userName || !time || !token) return;

      // const today = await getTimeGermany()
      // console.log("tody :", today.date);
      await reportExit(userName, token);

      alert("Exit recorded");
    } catch (err) {
      console.error("Exit failed", err);
      alert("Failed to record exit");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>Welcome, {userName}</h1>
      <div>{time ? time.toLocaleTimeString("de-DE") : "Loading..."}</div>
      <p>
        You are logged in as <strong>{role}</strong>.
      </p>
      <div>
        <button onClick={handleEntry} style={{ margin: "10px" }}>
          Report Entry
        </button>
        <button onClick={handleExit} style={{ margin: "10px" }}>
          Report Exit
        </button>
      </div>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserPage;
