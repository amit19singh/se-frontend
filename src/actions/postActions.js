// postActions.js
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const POST_OPERATION_FAILURE = 'POST_OPERATION_FAILURE';



export const likePost = (postId) => async (dispatch, getState) => {
        try {
          // Assuming you have a function to get the current user's token
          const token = getState().auth.token;
      
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/like/${postId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            dispatch({
              type: 'LIKE_POST_SUCCESS',
              payload: { postId },
            });
          } else {
            throw new Error('Failed to like the post');
          }
        } catch (error) {
          dispatch({
            type: 'POST_OPERATION_FAILURE',
            payload: error.message,
          });
        }
      };
      

// postActions.js
export const unlikePost = (postId) => async (dispatch, getState) => {
        try {
          const token = getState().auth.token;
      
          const response = await fetch(`[YOUR_BACKEND_API]/api/user-posts/unlike/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            dispatch({
              type: 'UNLIKE_POST_SUCCESS',
              payload: { postId },
            });
          } else {
            throw new Error('Failed to unlike the post');
          }
        } catch (error) {
          dispatch({
            type: 'POST_OPERATION_FAILURE',
            payload: error.message,
          });
        }
      };
      