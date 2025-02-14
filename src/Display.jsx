import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Display.css'

const Display = () => {
    let [data, setData] = useState([]);
    let [search, setSearch] = useState("");  // State for search input
    let navigate = useNavigate();

    useEffect(() => {
        let fetchdata = async () => {
            try {
                let response = await axios.get("http://localhost:8979/query/display"); // Fix API path
                console.log("API Response:", response.data); // Debugging

                if (response.data.Info) {
                    setData(response.data.Info); // Extract the "Info" array
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchdata();
    }, []);

    // Update the filteredData constant to include firstName and lastName
    const filteredData = data.filter(user =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div id='main1'>


            {/* Search Bar */}
            <input
                id="searchInput"
                type="text"
                placeholder="Search by Username, Email, First Name, Last Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />


{filteredData.length === 0 ? (
    <p>No matching data found</p>
) : (
    <table id="displayTable">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {filteredData.map((x, index) => (
                <tr key={index}>
                    <td>{x.firstName}</td>
                    <td>{x.lastName}</td>
                    <td>{x.userName}</td>
                    <td>{x.email}</td>
                </tr>
            ))}
        </tbody>
    </table>
)}
            {/* Centered "Add New User" Button */}
            <button id="addUserBtn" onClick={() => navigate('/add')}>
                Add New User
            </button>
        </div>
    );
}

export default Display;
