import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useGermanClock } from "../hooks/useGermanClock";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateReport } from "../services/userService";

interface AttendanceEntry {
  date: string;
  checkIn: string;
  checkOut: string;
  counterHour: number;
}

interface Employee {
  userName: string;
  attendance: AttendanceEntry[];
}

const AdminPage: React.FC = () => {
  const { userName, role, logout, token } = useAuth();
  const time = useGermanClock();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [editEntry, setEditEntry] = useState<{
    index: number;
    date: string;
    checkIn: string;
    checkOut: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    getAllUsers(token)
      .then((data) => setEmployees(data))
      .catch(() => {});
  }, [token]);

  const handleSave = async () => {
    if (!selected || editEntry === null) return;
    if (!token) return;
    await updateReport(
      selected.userName,
      editEntry.date,
      editEntry.checkIn,
      editEntry.checkOut,
      token
    );
    const dataArray: Employee[] = await getAllUsers(token);
    setEmployees(dataArray);
    const updatedEmployee =
      dataArray.find((e: Employee) => e.userName === selected.userName) ?? null;
    setSelected(updatedEmployee);
    setEditEntry(null);
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






      {!selected && (
        <div style={{ textAlign: "left", marginTop: "2rem" }}>
          <h2>Employees</h2>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {employees.map((emp) => (
              <li
                key={emp.userName}
                style={{
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => setSelected(emp)}
              >
                {emp.userName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected && (
        <div style={{ textAlign: "left", marginTop: "2rem" }}>
          <h2>{selected.userName}'s Attendance</h2>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {selected.attendance.length === 0 ? (
              <li>No records</li>
            ) : (
              selected.attendance.map((entry, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {entry.date}: {entry.checkIn}–{entry.checkOut} (
                  {entry.counterHour}h)
                  <button
                    onClick={() =>
                      setEditEntry({
                        index: idx,
                        date: entry.date,
                        checkIn: entry.checkIn,
                        checkOut: entry.checkOut,
                      })
                    }
                    style={{ marginLeft: "1rem" }}
                  >
                    Edit
                  </button>
                </li>
              ))
            )}
          </ul>

          {editEntry && (
            <div style={{ marginTop: "1rem", textAlign: "left" }}>
              <h3>
                Edit {selected.userName} – {editEntry.date}
              </h3>
              <input
                type="time"
                value={editEntry.checkIn}
                onChange={(e) =>
                  setEditEntry({ ...editEntry, checkIn: e.target.value })
                }
                style={{ marginLeft: "0.5rem" }}
              />
              <input
                type="time"
                value={editEntry.checkOut}
                onChange={(e) =>
                  setEditEntry({ ...editEntry, checkOut: e.target.value })
                }
                style={{ marginLeft: "0.5rem" }}
              />
              <button onClick={handleSave} style={{ marginLeft: "1rem" }}>
                Save
              </button>
              <button
                onClick={() => setEditEntry(null)}
                style={{ marginLeft: "0.5rem" }}
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={() => setSelected(null)}
            style={{ marginTop: "1rem" }}
          >
            Back to list
          </button>
        </div>
      )}

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

export default AdminPage;
