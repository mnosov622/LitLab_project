import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./CreatorProfile.scss";
import { useAlert, positions } from "react-alert";

const CreatorProfile = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [description, setDescription] = useState("");
  const alert = useAlert();

  useEffect(() => {
    fetch(`http://localhost:8000/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setBio(data.bio);
        setSocialLink(data.social);
        setDescription(data.description);
        console.log(data);
      });
  }, [decoded.id]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("bio", bio);
    formData.append("social", socialLink);
    formData.append("description", description);

    fetch(`http://localhost:8000/creator/${decoded.id}`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log("success");
        alert.success("Profile is successfully updated", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000,
        });
      }
    });

    fetch(`http://localhost:8000/creator/courses/${16}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Profile</p>
      </div>
      <h3 className="profile-header__name mt-5 text-center">
        {profileData.name}
      </h3>
      <div className="profile-container">
        <div className="profile-header">
          {profileData.profileImage ? (
            <>
              <img
                className="profile-header__avatar rounded w-25"
                src={`http://localhost:8000/images/${profileData.profileImage}`}
                alt="avatar"
              />
              <div className="">
                <p className="text-info">Upload an image</p>
                <input
                  type="file"
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                  }}
                />
              </div>
            </>
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
                <p className="text-primary">Upload an image</p>
                <div class="input-container d-flex  justify-content-center align-items-center file-input">
                  <p className="fs-4">
                    <i className="bi bi-upload fs-1"></i>
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      setProfileImage(e.target.files[0]);
                    }}
                    required
                    id="photo"
                    className="input-file"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="profile-body">
          <p className="fs-3 mt-5 mb-5">Your description</p>
          <textarea
            className="profile-body__bio form-control mb-5"
            type="text"
            placeholder="Your Bio..."
            resize="none"
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <ul className="profile-body__contact-list">
            <li>
              <span className="profile-body__contact-list__label fw-bold">
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
          </ul>
        </div>
      </div>
      <div className="button-wrapper text-center">
        <button className="btn btn-primary btn-lg" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CreatorProfile;
