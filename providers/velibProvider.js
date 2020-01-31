import React, { useState } from "react";
import { getVelib } from '../API/velibAPI';
import VelibContext from '../contexts/velibContext';

const VelibProvider = ({ children }) => {
  const [velibsList, setVelibsList]           = useState([]);
  const [favList, setFavList]                 = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);

  const getVelibData   = async () => {
    const currentPos = await getPositionData();
    getVelib(currentPos).then(data => {
      const velibData  = (typeof data === "string") ? JSON.parse(data) : data;
      const recordData = velibData.records ? velibData.records : [];

      setVelibsList(recordData);
    }).catch(error => {
      console.log(error);
    });
  }

  const addToFav = (velib) => {
    setFavList([...favList, velib]);
  }

  const getPositionData = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
           setCurrentLocation({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
           });
           resolve(position.coords);
         },
         (error) => console.log(error.message),
         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
       );
     });
   }

  return (
    <VelibContext.Provider value={{ velibsList, currentLocation, getVelibData, getPositionData, favList, addToFav }}>
      {children}
    </VelibContext.Provider>
  );
};

export default VelibProvider;
