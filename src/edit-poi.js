import React from 'react';
import { Link } from 'react-router-dom';

let EditPoiDumb = () =>
    <div>
        <form>
            <textarea name="description" placeholder="Description" />
            <h4>Thumbnail</h4>
            <input type="file" name="poi-thumbnail"
                    accept=".png, .jpg, .jpeg, .gif" 
                    encType="multipart/form-data" />
            <h4>Video</h4>
            <input type="file" name="poi-video"
                    accept=".wmv, .avi, .mov, .mpeg, .mp4" 
                    encType="multipart/form-data" />
            <h4>Audio</h4>
            <input type="file" name="poi-audio"
                    accept=".mp3" 
                    encType="multipart/form-data" />
            <h4>Audio for Between POIs</h4>
            <input type="file" name="poi-between-audio"
                    accept=".mp3" 
                    encType="multipart/form-data" />
            <button type="submit">Submit POI</button>
        </form>
        <div>
            <Link to="/previewpoi">Preview Poi</Link>
            <Link to="/addpois">Return to Add Pois</Link>
        </div>
    </div>

export default EditPoiDumb;