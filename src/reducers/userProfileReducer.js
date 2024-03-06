import { FETCH_PROFILE_START, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE } from '../actions/userProfileActions';

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userProfileReducer;
