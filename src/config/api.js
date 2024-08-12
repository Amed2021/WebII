import { db } from "./firebase";
import {
  addDoc,
  collection,
  where,
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

  if (result.data()) {
    let item = {
      id: result.id,
      task: result.data().task,
      deadline: result.data().deadline,
      completed: result.data().completed,
    };
  
    return item;
  }

  return null;
};

export const onFindByUserId = async (collectionStr, paramId) => {
  const result = await getDocs(
    query(collection(db, collectionStr), where("userId", "==", paramId))
  );

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
}

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

// Nueva función para obtener datos del usuario actual
export const getUserData = async (userId) => {
  const docRef = doc(db, 'users', userId); // Asume que la colección se llama 'users'
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};
