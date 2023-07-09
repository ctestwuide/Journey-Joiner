import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from "../components/Dashboard";
import defaultProfileImage from "../assets/blank-profile.png";

export default function Profile() {
    const { email } = useParams();
    const [previewImage, setPreviewImage] = useState(null);
    
    const [profileData, setProfileData] = useState({
        profile_picture: null,
        first_name: '',
        last_name: '',
        age: '',
        bio: '',
        budget: '',
        interest_beach_bum: false,
        interest_foodie: false,
        interest_adventurer: false,
        interest_museum_magnet: false,
        email: '',
        password: '',
    });

    const handleInterestClick = (interest) => {
        setProfileData(prevState => ({ ...prevState, [interest]: !prevState[interest] }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData({ ...profileData, profile_picture: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value || '' });
    };
  
    const handleDataSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { ...profileData };
        delete dataToSend.profile_picture; 
    
        fetch(`http://127.0.0.1:8000/api/updateUser/${profileData.email}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    };
    
    const handlePictureSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('profile_picture', profileData.profile_picture);
        console.log(formData.get('profile_picture')); // Debugging line
        
        fetch(`http://127.0.0.1:8000/api/updateUserPicture/${profileData.email}/`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleUpdate = (e) => {
        handleDataSubmit(e);
        handlePictureSubmit(e);
    }    

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/getUser/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setProfileData(data);
            setPreviewImage(data.profile_picture); // Set the existing image URL as the preview image
        })
        .catch(error => {
            console.error(error);
        });
    }, [email]);

  return (
    <>
    <Header email={email}/>
    <main className="main-background">
    <Dashboard email={email}/>
    <div className="profile-container">
        <div className="profile-section-left">
            <div className="profile-picture">
                <img src={previewImage || defaultProfileImage} alt="Profile" />
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
            <div className="profile-data-left">
                <input
                    type="text"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    type="number"
                    name="age"
                    value={profileData.age}
                    onChange={handleChange}
                    placeholder="Age"
                />
            </div>
        </div>

        <div className="profile-section-right">
            <div className="bio-section">
                <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Bio"
                />
            </div>

            <div className="budget-section">
                <label>Budget/Day:</label>
                <select
                name="budget"
                value={profileData.budget}
                onChange={handleChange}
                >
                    <option value="">Select Budget</option>
                    <option value="$100">$100</option>
                    <option value="$200">$200</option>
                    <option value="$300">$300</option>
                    <option value="$500">$500</option>
                    <option value="$1000">$1000</option>
                </select>
            </div>

            <div className="interests-section">
                <label>Interests:</label>
                <div className="interests-buttons">
                    <button
                    type="button"
                    className={profileData.interest_beach_bum ? 'selected' : ''}
                    onClick={() => handleInterestClick('interest_beach_bum')}
                    >
                    Beach Bum
                    </button>
                    <button
                    type="button"
                    className={profileData.interest_foodie ? 'selected' : ''}
                    onClick={() => handleInterestClick('interest_foodie')}
                    >
                    Foodie
                    </button>
                    <button
                    type="button"
                    className={profileData.interest_adventurer ? 'selected' : ''}
                    onClick={() => handleInterestClick('interest_adventurer')}
                    >
                    Adventurer
                    </button>
                    <button
                    type="button"
                    className={profileData.interest_museum_magnet ? 'selected' : ''}
                    onClick={() => handleInterestClick('interest_museum_magnet')}
                    >
                    Museum Magnet
                    </button>

                </div>
            </div>
        </div>
    </div> 

    </main>

    <section className="black-area">

        <div className="profile-credentials">
            <div className="email-password-section">
                <div>

                    <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    // onChange={handleChange}
                    placeholder="Email"
                    disabled
                    />
                </div>
                <div>

                    <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button type="submit" onClick={handleUpdate}>
                Update My Travel Card
                </button>
            </div>

        </div>

    </section>
    </>
  );
}
