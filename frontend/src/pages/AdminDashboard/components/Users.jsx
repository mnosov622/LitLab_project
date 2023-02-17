import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsersData(data));
  }, []);

  return (
    <div>
      <h3 className="text-center mb-4">All Users</h3>
      <table className="table  table-light fs-5">
        <thead className="border">
          <tr className="text-dark">
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td className="text-dark">{user.name}</td>
              <td className="text-dark">{user.email}</td>
              <td className="text-dark">
                <a href={`mailto:${user.email}`} className="btn btn-primary">
                  Contact
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
