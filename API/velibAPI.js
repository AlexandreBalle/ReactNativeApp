import {AsyncStorage} from 'react-native';

const API_URL         = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel";
const STORAGE_KEY     = 'VELIB_LIST';

export const getVelib = async (currentLocation) => {
  try {
    const url = (currentLocation.latitude && currentLocation.longitude) ? API_URL + "&geofilter.distance=" + currentLocation.latitude + "," + + currentLocation.longitude + ",5000&rows=70" : API_URL;

    return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson) {
              AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJson));
              return responseJson;
            }
          })
          .catch((error) => {
            console.log(error)
          });
  } catch (error) {
    return AsyncStorage.getItem(STORAGE_KEY);
  }
}
