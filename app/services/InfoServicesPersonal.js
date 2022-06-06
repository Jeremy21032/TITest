import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  collectionGroup,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const getPersonalRol = async (email) => {
  const q = doc(global.dbCon, "/Roles", email);
  const docSnap = await getDoc(q);
  let tempRol = docSnap.data();

  // console.log("DOC SNAP", docSnap);
  console.log("TEMP ROL", tempRol);
  return tempRol;
};

export const savePersonal = async (person) => {
  console.log("----------- ENTRA AL GUARDAR LOS DATOS ---------------------");
  console.log(person);
  await setDoc(doc(global.dbCon, "/Personas", person.id), person);
};

export const savePersonalRol = async (person) => {
  await setDoc(doc(global.dbCon, "/Roles", person.email), person);
};

export const getPersonalInfomation = async (refreshFn) => {
  const q = doc(global.dbCon, "/Personas/" + global.email);
  const docSnap = await getDoc(q);
  let person = docSnap.data();
  console.log("------- TRAE LA INFORMACION ---------");
  console.log(person);
  refreshFn(person);
};

export const getPlaces = async (refreshFN) => {
  const q = doc(global.dbCon, "/Mapa/Direcciones");
  const docSnap = await getDoc(q);
  let places = docSnap.data();
  console.log(places.lugares);
  return places.lugares;
};
export const getDireccionBase = async (refreshFn, continueFn) => {
  const q = doc(global.dbCon, "/Personas/" + global.email);
  const docSnap = await getDoc(q);
  let person = docSnap.data();
  console.log("------- TRAE LA INFORMACION ---------");
  console.log(person.direccionBase);
  refreshFn(person.direccionBase);
};

export const aniadirDireccionBase = async (direccion, birthdate) => {
  const docRef = doc(global.dbCon, "/Personas/" + global.email);

  const docSnapresult = await getDoc(docRef);

  let docResultData = docSnapresult.data();

  await updateDoc(docRef, {
    direccionBase: direccion,
    birthdate: birthdate,
  });
};
