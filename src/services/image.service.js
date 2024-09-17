import axios from "axios";
import { db, storage } from "../configs/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export const generateImageSvc = async (/** @type {string} */ prompt) => {
  const localUrl = "http://localhost:3000/api/v1/generate/sdxl";
  //...v1/generate/sdxl , wuerstchen_v2 , kandinsky_v2 👈
  const serverUrl =
    "http://imagination-station-production.up.railway.app/api/v1/generate/wuerstchen_v2";
  try {
    const options = {
      method: "POST",
      url: serverUrl,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        prompt: prompt,
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getImagesSvc = async () => {
  const q = query(collection(db, "images"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const result = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    url: doc.data().image,
  }));
  return result;
};

export const deleteImageSvc = async (
  /** @type {string} */ docId,
  /** @type {string} */ url,
) => {
  try {
    await deleteDoc(doc(db, "images", docId));
    //
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const fileRef = ref(storage, "images/" + fileName);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const downloadImageSvc = async (/** @type {any} */ url) => {
  console.log(
    `https://a838-197-158-81-251.ngrok-free.app/api/v1/download?url=${encodeURIComponent(
      url,
    )}`,
  );
  // const options = {
  //   method: "POST",
  //   url: `https://a838-197-158-81-251.ngrok-free.app/api/v1/download?url=${encodeURIComponent(
  //     url,
  //   )}`,
  //   headers: {
  //     accept: "application/json",
  //     "content-type": "application/json",
  //   },
  // };

  // const response = await axios.request(options);
  // return new Blob([response.data]);
  return "";
};
