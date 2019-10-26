import React, { useState } from 'react';
import { requestImages } from './packages/requesters/images';
import { useDataApi } from './hooks/useDataApi/useDataApi';

function App() {
  const [count, setCount] = useState(0);
  const { data: images, isLoading, isError } = useDataApi(requestImages, count);

  return (
    <div className="App">
      <h1>Images</h1>
      <button type="button" className="btn btn-primary" onClick={() => setCount(count + 1)}>Refresh</button>
      { isError && <div>Something went wrong ...</div> }
      {
        (isLoading)
          ? <div>Loading...</div>
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
