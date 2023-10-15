import React, { useState } from 'react';
import API from './API';

function EditProfileForm({ username, currentBio, onCancel, onUpdate }) {
  const [bio, setBio] = useState(currentBio);

  const handleUpdateProfile = () => {
    // Implement a function to update the user's profile using the API
    const updatedProfileData = {
      bio,
      // other profile data...
    };

    API.editUserProfile(username, updatedProfileData)
      .then((response) => {
        // Handle success
        console.log('Profile updated successfully', response);
        onUpdate(response); // Notify the parent component that the profile was updated
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating profile', error);
      });
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <textarea
        placeholder="Edit bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditProfileForm;

