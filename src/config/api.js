import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

export const onFindAll = async (collectionStr) => {
  const result = await getDocs(query(collection(db, collectionStr)));
  console.log(result);

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
};

export const onFindById = async (collectionStr, paramId) => {
  const result = await getDoc(doc(db, collectionStr, paramId));

  let item = {
    id: result.id,
    task: result.data().task,
    deadline: result.data().deadline,
    completed: result.data().completed,
  };

  return item;
};

export const onInsert = async (collectionStr, document) => {
  delete document.id;
  await addDoc(collection(db, collectionStr), document);
};

export const onUpdate = async (collectionStr, paramId, newDocument) => {
  delete newDocument.id;
  await updateDoc(doc(db, collectionStr, paramId), newDocument);
};

export const onDelete = async (collectionStr, paramId) => {
  await deleteDoc(doc(db, collectionStr, paramId));
};
