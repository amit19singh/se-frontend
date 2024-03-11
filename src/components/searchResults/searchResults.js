import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserActions } from '../../components/UserActionsContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery().get('query');
  const [searchResults, setSearchResults] = useState([]);
  
  const { handleSearch } = useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await handleSearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setSearchResults([]);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div>
        {searchResults.map((user, index) => (
            <div key={index} style={{ padding: '10px', margin: '5px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <p>{user.firstname} {user.lastname} (@{user.username})</p>
            {/* <button onClick={() => removeFriend(user.id)}>Remove Friend</button>
            <button onClick={() => blockUser(user.id)}>Block</button>
            <button onClick={() => navigate(`/user/${user.username}`)}>View Profile</button>
              {user.requestSent === "NONE" && <button onClick={() => onAddFriend(user.username)}>Add Friend</button>}
              {user.requestSent === "PENDING" && <button disabled>Pending</button>}
              {user.requestSent === "ACCEPTED" && <button disabled>Friends</button>}
              {user.requestSent === "BLOCKED" && <button onClick={() => unblockUser(user.id)}>Unblock</button>} */}
            <button>Remove Friend</button>
            <button>Block</button>
            <button onClick={() => navigate(`/user/${user.username}`)}>View Profile</button>
              {user.requestSent === "NONE" && <button>Add Friend</button>}
              {user.requestSent === "PENDING" && <button disabled>Pending</button>}
              {user.requestSent === "ACCEPTED" && <button disabled>Friends</button>}
              {user.requestSent === "BLOCKED" && <button>Unblock</button>}
            </div>
        ))}
     </div>

  );
};

export default SearchResultsPage;
