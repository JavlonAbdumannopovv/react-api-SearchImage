import React from "react";

const initialState = {
  defdata:null,
  defloading:true,
}

const api = {
  key:"L95kIEalGWzrlz48dL5eRnSxivBkz8unf1p2OC0pCOqhw2KMfkqlBJ9U",
}

const useDefaultFetch = (count) => {
  const [state,setState] = React.useState(initialState);

  React.useEffect(()=>{
    setState({defdata:null,defloading:true})
    fetch(`https://api.pexels.com/v1/curated/?page=${count}&per_page=15`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        Authorization:api.key,
      }
    })
      .then((res)=>res.json())
      .then((defdata)=>{
        setState({defdata:defdata,defloading:false})
      })
  },[count]);

  return state;
}

export default useDefaultFetch;