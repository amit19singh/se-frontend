import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../actions/userProfileActions';
import { useAuth } from './AuthContext';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { profile, isLoading, error } = useSelector((state) => state.userProfile);
  const { token } = useAuth();

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username, token));
    }
  }, [dispatch, username]);

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("PROFILE: ", profile);

  return (
    <div>
      <h1>{profile?.firstname} {profile?.lastname}</h1>
    </div>
  );
};

export default ProfilePage;
