// Actions Types
export const FETCH_PROFILE_START = 'FETCH_PROFILE_START';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

// Action Creators
export const fetchProfileStart = () => ({
  type: FETCH_PROFILE_START,
});

export const fetchProfileSuccess = (profileData) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profileData,
});

export const fetchProfileFailure = (errorMessage) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: errorMessage,
});

// Async Action Creator to Fetch User Profile
export const fetchUserProfile = (ownerUsername, token) => {
  return async (dispatch) => {
    dispatch(fetchProfileStart());
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${ownerUsername}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      dispatch(fetchProfileSuccess(data));
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };
};
