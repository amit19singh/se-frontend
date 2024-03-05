const CreatePost = ({ caption, postText, handleUpload, handleFileChange }) => {
        return (
          <div>
            <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
            <textarea placeholder="What's on your mind?" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
            <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
          </div>
        );
      };
      