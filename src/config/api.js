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

// Función para obtener todos los documentos de una colección
export const onFindAll = async (collectionStr) => {
  const result = await getDocs(query(collection(db, collectionStr)));
  console.log(result);

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
};

// Función para obtener un documento por su ID
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

// Función para obtener documentos por el userId
export const onFindByUserId = async (collectionStr, paramId) => {
  const result = await getDocs(
    query(collection(db, collectionStr), where("userId", "==", paramId))
  );

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
}

// Nueva función: Función para obtener documentos por email
export const onFindByUserEmail = async (collectionStr, email) => {
  const result = await getDocs(
    query(collection(db, collectionStr), where("email", "==", email))
  );

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
}

// Función para insertar un nuevo documento en la colección
export const onInsert = async (collectionStr, document) => {
  delete document.id;
  await addDoc(collection(db, collectionStr), document);
};

// Función para actualizar un documento existente en la colección
export const onUpdate = async (collectionStr, paramId, newDocument) => {
  delete newDocument.id;
  await updateDoc(doc(db, collectionStr, paramId), newDocument);
};

// Nueva función: Bloquear un usuario actualizando su estado
export const blockUser = async (collectionStr, userId) => {
  await updateDoc(doc(db, collectionStr, userId), { isActive: false });
};

// Función para eliminar un documento de la colección
export const onDelete = async (collectionStr, paramId) => {
  await deleteDoc(doc(db, collectionStr, paramId));
};

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
