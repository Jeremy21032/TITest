import { collection, getDocs } from "firebase/firestore";

export const getLocation = async (direccion, refreshFn) => {
  global.coordenas = null;
  const queryData = collection(global.dbCon, "/Mapa/Direcciones/", direccion);
  const queryLocation = await getDocs(queryData);
  let tmpMapa = [];
  queryLocation.forEach((document) => {
    tmpMapa.push(document.data());
  });
  if (tmpMapa.length > 0) {
    global.coordenadas = tmpMapa;
    console.log(tmpMapa);
    refreshFn(tmpMapa);
  }
};

export const getLocationR = async (direccion) => {
  global.coordenas = null;
  const queryData = collection(global.dbCon, "/Mapa/Direcciones/", direccion);
  const queryLocation = await getDocs(queryData);
  let tmpMapa = [];
  queryLocation.forEach((document) => {
    tmpMapa.push(document.data());
  });
  if (tmpMapa.length > 0) {
    global.coordenadas = tmpMapa;
    console.log(tmpMapa);
    return tmpMapa;
  }
};
export const getLocation2 = async (location) => {
  const queryLocation = collection(global.dbCon, "/Mapa/Direcciones", location);
  const querySnapshot = await getDocs(queryLocation);
  let locationTmp = [];
  querySnapshot.forEach((document) => {
    locationTmp.push(document.data());
  });
  return locationTmp;
};
