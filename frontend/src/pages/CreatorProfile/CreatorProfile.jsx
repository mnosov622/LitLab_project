import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./CreatorProfile.scss";

const CreatorProfile = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Profile</p>
      </div>
      <div className="profile-container">
        <div className="profile-header">
          {profileData.image ? (
            <img
              className="profile-header__avatar rounded-circle"
              src="https://i.pravatar.cc/150?img=5"
              alt="avatar"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="106"
                height="106"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              <div className="">
                <p className="text-info">Upload an image</p>
                <input type="file" />
              </div>
            </>
          )}

          <h1 className="profile-header__name mt-5">{profileData.name}</h1>
        </div>
        <div className="profile-body">
          <textarea
            className="profile-body__bio form-control mb-5"
            type="text"
            placeholder="Your Bio..."
            resize="none"
            rows="5"
          ></textarea>

          <ul className="profile-body__contact-list">
            <li>
              <span className="profile-body__contact-list__label">
                Email: &nbsp;
              </span>
              {profileData.email}
            </li>
            <li>
              <span className="profile-body__contact-list__label fw-bold">
                Education: &nbsp;
              </span>
              {profileData.education}
            </li>
            <li>
              <input type="text" placeholder="Link to your socials" />
            </li>
          </ul>
        </div>
      </div>
      <div className="button-wrapper text-center">
        <button className="btn btn-primary btn-lg w-25">Save Changes</button>
      </div>
    </div>
  );
};

export default CreatorProfile;
