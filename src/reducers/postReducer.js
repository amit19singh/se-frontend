import { LIKE_POST_SUCCESS, UNLIKE_POST_SUCCESS, POST_OPERATION_FAILURE } from '../actions/postActions';


const initialState = {
        posts: [],
        error: null,
        };

export default function postReducer(state = initialState, action) {
        switch (action.type) {
                case LIKE_POST_SUCCESS:
                return {
                        ...state,
                        posts: state.posts.map(post =>
                        post.id === action.payload.postId ? { ...post, likedByCurrentUser: true } : post
                        ),
                };
                case UNLIKE_POST_SUCCESS:
                return {
                        ...state,
                        posts: state.posts.map(post =>
                        post.id === action.payload.postId ? { ...post, likedByCurrentUser: false } : post
                        ),
                };
                case POST_OPERATION_FAILURE:
                return {
                        ...state,
                        error: action.payload,
                        };
                default:
                return state;
        }
}
