import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const [userName, setUserName] = useState('');
  const [isTwoFactorEnabled, setisTwoFactorEnabled] = useState('');
  const [caption, setCaption] = useState('');
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/'); // Redirect to login if no token found
        return;
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userDetail`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserName(data.username);
        setisTwoFactorEnabled(data.twoFactorEnabled);
        console.log(`2FA: ${data.twoFactorEnabled}`);
        if (isTwoFactorEnabled) {
          navigate('/verify2FA', { state: { username: userName } });
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (name === 'image') {
      setImage(files[0]);
    } else if (name === 'video') {
      setVideo(files[0]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('post', postText);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);
    setCaption(caption);
    setPostText(postText);

    console.log(`formData: ${formData}`);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user-posts/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Your Dashboard, {userName || 'User'}!</h2>
      <p>This is your personalized user home page. From here, you can:</p>
      <ul>
        <li>View your profile</li>
        <li>Access your settings</li>
        <li>Explore available features</li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
      <button onClick={() => navigate('/2FA', { state: { username: userName , isTwoFactorEnabled: isTwoFactorEnabled} })}>2 Factor Authentication</button> 
      <div style={{ padding: '20px' }}>
      {/* Existing UI elements */}
      <div>
        <label>
          Caption:
          <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
        </label>
        <label>
          Post Text:
          <textarea value={postText} onChange={(e) => setPostText(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </label>
        <label>
          Video:
          <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
        </label>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
    </div>
  );
};

export default UserHome;

