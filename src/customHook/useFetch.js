import React from "react";

const initialState = {
  data:null,
  loading:true,
}

const api = {
  key:"L95kIEalGWzrlz48dL5eRnSxivBkz8unf1p2OC0pCOqhw2KMfkqlBJ9U",
}

const useFetch = (query) => {
  const [state,setState] = React.useState(initialState);

  React.useEffect(()=>{
    setState({data:null,loading:true})
    fetch(`https://api.pexels.com/v1/search${query}`,{
      method:'GET',
      headers:{
        Accept:"application/json",
        Authorization:api.key,
      }
    })
      .then((res)=>res.json())
      .then((data)=>{
        setState({data:data,loading:false})
      })
  },[query]);

  return state;
}

export default useFetch;