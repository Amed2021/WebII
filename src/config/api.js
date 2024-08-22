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
      ...result.data(),  
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

// Función para obtener documentos por email en la colección 'perfiles'
export const onFindByUserEmail = async (email) => {
  const result = await getDocs(
    query(collection(db, 'perfiles'), where("email", "==", email))
  );

  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
}

// Función para buscar un usuario por su nombre en la colección 'perfiles'
export const onFindByUserName = async (userName) => {
  try {
    const result = await getDocs(
      query(collection(db, 'perfiles'), where("name", "==", userName))
    );

    // Verifica los resultados en la consola
    console.log('Resultados de la búsqueda:', result);

    let items = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Verifica los ítems antes de devolverlos
    console.log('Ítems obtenidos:', items);

    return items;
  } catch (error) {
    console.error('Error al buscar usuarios por nombre:', error);
    return []; // Devuelve una lista vacía en caso de error
  }
};
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

// Función para bloquear un usuario actualizando su estado en la colección 'perfiles'
export const blockUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'perfiles', userId), { isActive: false });
    console.log('Usuario bloqueado exitosamente');
  } catch (error) {
    console.error('Error al bloquear el usuario:', error);
    throw new Error('No se pudo bloquear al usuario');
  }
};

// Función para eliminar un documento de la colección
export const onDelete = async (collectionStr, paramId) => {
  await deleteDoc(doc(db, collectionStr, paramId));
};

// Función para insertar un nuevo reporte de abuso
export const onInsertReport = async (report) => {
  try {
    await addDoc(collection(db, "reports"), report);
    console.log("Reporte enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    throw new Error("No se pudo enviar el reporte");
  }
};

// Función para obtener todas las denuncias de la colección 'reports'
export const onFindAllReports = async () => {
  const result = await getDocs(collection(db, "reports"));
  
  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return items;
};
