import React from "react";
import Api from "../api/Api";
import getRandomNumberBetween from "../utils/getRandomNumber";

export const useAlbums = () => {
 
  const [albumSize, setAlbumSize] = React.useState(0);
  const [pageTracker, setPageTracker] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [rowPressing,setRowPressing]=React.useState(0)
  const [clickedOutside, setClickedOutside] = React.useState(false);
  const [randomId, setRandomId] = React.useState(0);
  const [randomAlbumId, setRandomAlbumId] = React.useState(0);
  const wrapperRef = React.useRef(null);


  const getData = () => {
    Api.get("/photos?_limit=100")
      .then((response) => {
        setData(response.data);
        setAlbumSize(Math.round(response.data.length / 8));
        let updateAlbums = response.data;
        updateAlbums.forEach((album) => {
          album["isEditToggle"] = false;
          album["isDeleteToggle"] = false;
          album["titleInput"] = false;
          album["rowClicked"] = false;
        });
        setData(updateAlbums);
      })
      .catch((error) => {
        console.log("The error is :" + JSON.stringify(error));
      });
  };
  const EditTitle = (titleText, albumId) => {
    let prevAlbums = [...data];
    let album = prevAlbums.find((a) => a.id === albumId);
    album.title = titleText;
    album.isEditToggle = !album.isEditToggle;
    album.titleInput = "";
    setData(prevAlbums);
  };

  const onChangeTitle = (titleText, albumId) => {
    let prevAlbums = [...data];
    let album = prevAlbums.find((a) => a.id === albumId);
    album.titleInput = titleText;
    setData(prevAlbums);
  };
  const toggleEdit = (albumId) => {
    let prevAlbums = [...data];
    let album = prevAlbums.find((a) => a.id === albumId);
    album.isEditToggle = !album.isEditToggle;

    setData(prevAlbums);
  };
 const handleClickOutside = e => {
    if (!wrapperRef.current.contains(e.target)) {
        setClickedOutside(true);
    }
};
  const rowClicked = (id) => {
    let prevAlbums = [...data];
    let album = prevAlbums.find((a) => a.id === id);
    if( album.rowClicked===false){
        setRowPressing(album.id)
    }
    album.rowClicked = !album.rowClicked;
    setData(prevAlbums);
    console.log(JSON.stringify(prevAlbums));
  };

  const deleteAlbum = (albumId) => {
    let prevAlbums = [...data];
    let nextAlbums = [];
    prevAlbums.map((a) => {
      if (a.id !== albumId) {
        nextAlbums.push(a);
      }
    });
    setData(nextAlbums);
  };

  const updateRandomId=()=>{
    setRandomId(getRandomNumberBetween(1, 1000000))
  }
  const updateRandomAlbumId=()=>{
    setRandomAlbumId(getRandomNumberBetween(1, 1000000))
  }

  const updatePageTraker = (number) => {
    setPageTracker(number);
  };
  const handleClickInside = () => setClickedOutside(false);

  React.useEffect(() => {
    getData();
    document.addEventListener("mousedown", handleClickOutside);
    let interval = setInterval(() => {
      updateRandomAlbumId();
      updateRandomId();
    }, 2000);

    if (clickedOutside) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickedOutside]);

  return {
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

  };
};
