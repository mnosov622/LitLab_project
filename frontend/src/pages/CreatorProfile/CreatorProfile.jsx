import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./CreatorProfile.scss";
import { useAlert, positions } from "react-alert";

const CreatorProfile = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [instructorDescription, setInstructorDescription] = useState("");
  const [education, setEducation] = useState("");

  const [socialLink, setSocialLink] = useState("");
  const [description, setDescription] = useState("");
  const alert = useAlert();

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  useEffect(() => {
    fetch(`https://litlab-backend-v2.vercel.app/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setBio(data.bio);
        setSocialLink(data.social);
        setInstructorDescription(data.description);
        setEmail(data.email);
        setName(data.name);
        setEducation(data.education);
      });
  }, [decoded.id]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("bio", bio);
    formData.append("description", instructorDescription);
    formData.append("name", name);
    formData.append("instructor", name);
    formData.append("email", email);
    formData.append("education", education);

    fetch(`https://litlab-backend-v2.vercel.app/creator/${decoded.id}`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 200) {
        alert.success("Profile is successfully updated", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000,
        });
      }
    });

    fetch(`https://litlab-backend-v2.vercel.app/creator/courses/${profileData.email}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Profile</p>
      </div>
      <h3 className="profile-header__name mt-5 text-center">{profileData.name}</h3>
      <div className="profile-container">
        <div className="profile-header">
          {profileData.profileImage && !imagePreview ? (
            <>
              <img
                className="profile-header__avatar rounded w-25"
                src={`https://litlab-backend-v2.vercel.app/images/${profileData.profileImage}`}
                alt="avatar"
              />
              {!imagePreview && (
                <div className="">
                  <p className="text-primary">Upload new image</p>
                  <input type="file" onChange={(e) => handleImageChange(e)} />
                </div>
              )}

              {imagePreview && (
                <>
                  <div className="mb-3 text-center" style={{ marginTop: "-5%" }}>
                    <p className="text-primary fs-1">Preview image</p>
                    <img src={imagePreview} className="image-preview" alt="preview" />
                  </div>
                  <button className="btn btn-danger" onClick={() => setImagePreview(null)}>
                    Remove
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {!imagePreview && (
                <>
                  {" "}
                  <div className="mx-auto text-center">
                    <div class="input-container d-flex text-center mx-auto  justify-content-center align-items-center file-input">
                      <p className="fs-4">
                        <i className="bi bi-upload fs-1"></i>
                      </p>
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                        required
                        id="photo"
                        className="input-file"
                      />
                    </div>
                  </div>
                </>
              )}

              {imagePreview && (
                <>
                  <div className="mb-3 text-center" style={{ marginTop: "-5%" }}>
                    <p className="text-primary fs-1">Preview image</p>
                    <img src={imagePreview} className="image-preview" alt="preview" />
                  </div>

                  <button className="btn btn-danger" onClick={() => setImagePreview(null)}>
                    Remove
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div className="profile-body">
          <p className="fs-3 mt-5 mb-5">Your description</p>
          <input
            className="profile-body__bio form-control mb-5"
            type="text"
            placeholder="Your Bio..."
            resize="none"
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></input>

          <p className="fs-3 mt-5 mb-2">About you and career</p>
          <textarea
            className="profile-body__bio form-control mb-3"
            type="text"
            placeholder="Your Bio..."
            resize="none"
            rows="5"
            value={instructorDescription}
            onChange={(e) => setInstructorDescription(e.target.value)}
          ></textarea>

          <ul className="profile-body__contact-list">
            <li>
              <p className="fs-3">Email</p>
              <input
                className="profile-body__bio form-control w-50 mx-auto"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <p className="fs-3">Name</p>
              <input
                className="profile-body__bio form-control w-50 mx-auto"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <p className="fs-3">Education</p>
              <input
                className="profile-body__bio form-control w-50 mx-auto"
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              ></input>
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
