import React, { useEffect, useState } from "react";
import { fetchDummyData } from "./api";
import "./home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDummyData()
      .then((responseData) => {
        console.log("Fetched Data:", responseData); // Log the fetched data
        setData(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message); // Log the error message
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredData = data.filter((user) => {
      return (
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.age.toString().includes(searchQuery)
      );
    });
    setDisplayedData(filteredData.slice(0, displayCount));
  }, [data, displayCount, searchQuery]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight === scrollHeight) {
      setDisplayCount((prevCount) => prevCount + 5);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      setIsLoading(true);
      const filteredData = data.filter((user) => {
        return (
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.age.toString().includes(searchQuery)
        );
      });
      setDisplayedData(filteredData.slice(0, displayCount));
      setIsLoading(false);
    } else {
      setDisplayedData(data.slice(0, displayCount));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="container search-bar mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div
        className="table-container mt-5"
        onScroll={handleScroll}
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
