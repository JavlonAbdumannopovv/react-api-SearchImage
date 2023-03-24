import React from "react";
import useDefaultFetch from "../customHook/useDefaultFetch";
import "./Pexels.css";
import useFetch from "../customHook/useFetch";
import { BiSearch } from "react-icons/bi";

function Pexels() {
  const [query, setQuery] = React.useState("nature");
  const [count, setCount] = React.useState(3);
  const { data, loading } = useFetch(`/?page=${count}&per_page=15&query=${query}`);
  const { defdata, defloading } = useDefaultFetch(count);

  //NOTE - default photo
  React.useEffect(() => {
    setCount(count => count + 1);
  }, []);

  if (count === 15) {
    setCount(1);
  }

  //NOTE - searchHandler
  const input = document.querySelector(".search input");
  const searchHandler = (e) => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        setQuery(e.target.value);
        document.querySelector(".pexels_default_photos").style.display = "none";
        document.querySelector(".pexels_search_photos").style.display = "flex";
        document.querySelector(".search_disc").style.opacity = "0";
        setCount(count => count + 1);
      } else {
        document.querySelector(".search_disc").style.opacity = "1";
      }
    }
  }

  const searchIconHandler = (e) => {
      if (e.value !== "") {
        setQuery(e.value);
        document.querySelector(".pexels_default_photos").style.display = "none";
        document.querySelector(".pexels_search_photos").style.display = "flex";
        document.querySelector(".search_disc").style.opacity = "0";
        setCount(count => count + 1);
      } else {
        document.querySelector(".search_disc").style.opacity = "1";
      }
  }

  //NOTE - category Arr 
  let category = [
    "Nature",
    "Space",
    "Sport",
    "Monochrome",
    "Autumn",
    "Mountain",
    "Dark",
    "City",
    "Bridge",
  ];

  //NOTE - category item clicked
  const categoryItemClick = (e) => {
    setQuery(e.target.textContent);
    document.querySelector(".pexels_default_photos").style.display = "none";
    document.querySelector(".pexels_search_photos").style.display = "flex";
    setCount(count => count + 1);
  }



  return (
    <div className="pexels">
      <header>
        <div className="back"></div>
      </header>
      <div className="search_input">
        <a href="https://pexels.com/" target="_blank" rel="noreferrer">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAYFBMVEUFoIH///9Xu6QAnX0AmHew3dP2/PtMsZii1MhPtJyHybj8//664Nc3qo9Us5wAm3nR6+SAyLXl9PGp2c12xbImq47Z7+tvwKyb0sVkuaRCrZOQzb7D5Nsbo4bu+fcupYn4hhqcAAACNUlEQVRoge3b2ZKqMBAG4I6NcRCQRTYF5P3fckSNzqJOx2mSmnP6r/JK5asmCZUEAHWMXuYLl2m2xcTC8bOt0HVgrU/2OkVwHlzoo71N3csTXirQlYeqT8lg6YvGHHJfNlSw8GaD2GKLLbbYYosttthiiy22pf3DinpWOwkfZ5VAGlj7ZDuI1bPoIm7SYC57+dQ++W1itZHAaSt1aAeLM89rK1Wv6KVz2yrakXF2W6mS2uVmsFVDrNzajtr1t3RtXEc3W+9pB7W29T5I7wQ2y5uezWWv7n+PuM+ueEdq8hfsR/9A7K9nndTijPbH625HwVltQHPaCw/2xnQ4SlfntSE1Td4SCme2cXexe/c2DIfzz2rCIblt09v04N42wyyq3Nto7OTnA3PbpqN7qbv2196jvvRzD9eW5jK+Y/fjOzUX9M553WjKVoRuzmvjWFzomjJ54LQRrjMX0m03RjtNa0Mf3M5bMNhpQ6uGdNRf2+dpKo75baZIGmAMdhJP6bNbzccJ0zjbHPmzrb7l8PzKx2hHX2lNXgyy25q+/ue2e6Av/nntmroE5bZ11lgUzWjrvgvR8pERLjsO7B+TYbNf2FkU+y/Y+0/7x6NTuww3H7JzaT+I2GL/D3Y/p43l9u1JyjltwHvbx9e8coPsb9wXFFtsscUWW2yxxRZbbLH/ZfuVdRRPBnjzZWMDhScasAe19lM4hgqU9tLbsCqmdzR1abfjziFjWJ/fTVVZTnhAgDFD00+7ke8GGyOMujncswAAAABJRU5ErkJggg==" alt="logo" />
        </a>
        <h1>The best free stock photos, royalty free images & videos shared by creators.</h1>
        <div className="search">
          <input type="search" placeholder="search for free photos" onKeyPress={searchHandler} />
          <span><BiSearch onClick={()=> searchIconHandler(input)}/></span>
        </div>
        <p className="search_disc">Search input is empty, please complete and resubmit!</p>
      </div>

      <div className="category">
        {
          category.map((item) => {
            return (
              <p key={`category${count}${item}`} onClick={categoryItemClick}>{item}</p>
            )
          })
        }
      </div>

      <div className="pexels_default_photos">
        {defloading ? "loading" :
          defdata.photos.map((photo) => {
            return (
              <div className="default_photo" key={photo.url}>
                <a href={photo.src.original} target="_blank" rel="noreferrer">
                  <img key={photo.id} src={photo.src.large} alt={photo.alt}></img>
                </a>
                <p>{photo.photographer}</p>
              </div>
            )
          })
        }
      </div>

      <div className="pexels_search_photos">
        {loading ? "loading" :
          data.photos.map((photo) => {
            return (
              <div className="default_photo" key={photo.url}>
                <a href={photo.src.original} target="_blank" rel="noreferrer">
                  <img key={photo.id} src={photo.src.large} alt={photo.alt}></img>
                </a>
                <p>{photo.photographer}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pexels;