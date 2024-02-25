import React, { useState } from 'react';

const EditProfile = () => {
  // State hooks for user information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(null);
//   const [profilePicUrl, setProfilePicUrl] = useState('');
  const [livesIn, setLivesIn] = useState('');
  const [userHometown, setUserHometown] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');

  // Function to handle profile update
  const handleProfileUpdate = async () => {
    // const userDTO = {
    //   firstname: firstName,
    //   lastname: lastName,
    //   birthday,
    //   gender,
    //   profilePicUrl,
    //   livesIn,
    //   userHometown,
    //   relationshipStatus,
    // };

    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('livesIn', livesIn);
    formData.append('userHometown', userHometown);
    formData.append('relationshipStatus', relationshipStatus);
    
    if (profilePicUrl) {
        formData.append('profilePicUrl', profilePicUrl);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateProfile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json',
        },
        // body: JSON.stringify(userDTO),
        body: formData,
      });

      if (response.ok) {
        alert("Profile updated successfully")
      }
      else {throw new Error('Profile update failed');}

      const result = await response.json();
    //   console.log('Profile updated successfully:', result);
      // Handle success (e.g., show success message, update UI)
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleProfileUpdate();
      }}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* <input type="text" placeholder="Profile Picture URL" value={profilePicUrl} onChange={(e) => setProfilePicUrl(e.target.value)} /> */}
        <input type="file" placeholder="Profile Picture URL" accept="image/*" onChange={(e) => setProfilePicUrl(e.target.files[0])} />
        <input type="text" placeholder="Lives In" value={livesIn} onChange={(e) => setLivesIn(e.target.value)} />
        <input type="text" placeholder="Hometown" value={userHometown} onChange={(e) => setUserHometown(e.target.value)} />
        <select value={relationshipStatus} onChange={(e) => setRelationshipStatus(e.target.value)}>
          <option value="">Select Relationship Status</option>
          <option value="single">Single</option>
          <option value="in_a_relationship">In a Relationship</option>
          <option value="married">Married</option>
          <option value="complicated">It's Complicated</option>
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
