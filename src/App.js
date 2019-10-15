import React, { useState, useEffect } from 'react';
import { requestImages } from './packages/requesters/images';

function App() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    requestImages().then((imgs) => setImages(imgs.data));
  }, []);

  return (
    <div className="App">
      <h1>Images</h1>
      {
        (images === null) ? <div>Loading...</div>
          : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Group</th>
                  <th scope="col">Name</th>
                  <th scope="col">Version</th>
                </tr>
              </thead>
              <tbody>
                {images.map((img) => (
                  <tr key={img.id}>
                    <td>{img.group}</td>
                    <td>{img.name}</td>
                    <td>{img.version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }

    </div>
  );
}

export default App;
