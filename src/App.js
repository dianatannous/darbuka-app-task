import React from "react";

import { Button } from "./components/Button";
import { useAlbums } from "./hooks/useAlbums";

function App() {
  const {
    data,
    pageTracker,
    albumSize,
    getData,
    deleteAlbum,
    toggleEdit,
    EditTitle,
    onChangeTitle,
    updatePageTraker,
    rowClicked,
    rowPressing,
    wrapperRef,
    clickedOutside,
    handleClickInside, 
    randomId,
    randomAlbumId
  } = useAlbums();

  return (
    <div className="container" ref={wrapperRef}>
      <table className="table col-8" onClick={handleClickInside}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Album ID</th>
            <th>Title</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 &&
            data
              .slice((pageTracker - 1) * 8, pageTracker * 8)
              .map((album, index) => {
                return (
                  <tr key={index + ""} onClick={() => rowClicked(album.id)}>
                    <td>
                      {" "}
                      {randomId
                        ? clickedOutside
                          ? album.id
                          : rowPressing
                          ? rowPressing === album.id
                            ? randomId
                            : album.id
                          : randomId
                        : album.id}
                    </td>
                    <td>
                      {" "}
                      {randomAlbumId
                        ? clickedOutside
                          ? album.albumId
                          : rowPressing
                          ? rowPressing === album.id
                            ? randomAlbumId
                            : album.albumId
                          : randomAlbumId
                        : album.albumId}
                    </td>
                    <td>
                      {" "}
                      {album.isEditToggle ? (
                        <input
                          type="text"
                          value={album.titleInput || ""}
                          key={album.id + ""}
                          onChange={(e) => {
                            onChangeTitle(e.target.value, album.id);
                          }}
                        />
                      ) : (
                        album.title
                      )}
                    </td>
                    <td>
                      {" "}
                      <img
                        src={album.thumbnailUrl}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <div className="btn-group pull-right">
                        {album.isEditToggle ? (
                          <>
                            <Button
                              onClick={() =>
                                EditTitle(album.titleInput, album.id)
                              }
                              text="Done"
                              iconName="glyphicon glyphicon-ok"
                              bgColor="#0c223e"
                              txtColor="#fff"
                            />
                            <Button
                              onClick={() => toggleEdit(album.id)}
                              text="Cancel"
                              iconName="glyphicon glyphicon-remove"
                              bgColor="#ea1010"
                              txtColor="#fff"
                            />
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => toggleEdit(album.id)}
                              text="Edit"
                              iconName="glyphicon glyphicon-pencil"
                              bgColor="#ea1010"
                              txtColor="#fff"
                            />
                            <Button
                              onClick={() => deleteAlbum(album.id)}
                              text="Delete"
                              iconName="glyphicon glyphicon-trash"
                              bgColor="#0c223e"
                              txtColor="#fff"
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>

      {data.length > 0 && (
        <nav aria-label="Page navigation ">
          <ul className="pagination">
            <li
              className={pageTracker === 1 ? "disabled" : undefined}
              onClick={() => {
                updatePageTraker(pageTracker - 1);
              }}
            >
              <a>Previous</a>
            </li>
            {albumSize &&
              Array.from(Array(albumSize), (e, index) => {
                return (
                  <li
                    key={index + ""}
                    className={index + 1 === pageTracker ? "active" : undefined}
                    onClick={() => updatePageTraker(index + 1)}
                  >
                    <a>{index + 1}</a>
                  </li>
                );
              })}

            <li
              className={pageTracker === albumSize ? " disabled" : undefined}
              onClick={() => {
                updatePageTraker(pageTracker + 1);
              }}
            >
              <a>Next</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default App;
