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
  serverTimestamp,
  arrayUnion,
  increment,
} from "firebase/firestore";

// Función para obtener todos los documentos de una colección
export const onFindAll = async (collectionStr) => {
  const result = await getDocs(query(collection(db, collectionStr)));
  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return items;
};

// Función para obtener un documento por su ID
export const onFindById = async (collectionStr, paramId) => {
  try {
    const docRef = doc(db, collectionStr, paramId);
    const result = await getDoc(docRef);
    if (result.exists()) {
      return {
        id: result.id,
        ...result.data(),
      };
    }
    return null; // Devuelve null si el documento no existe
  } catch (error) {
    console.error('Error al obtener el documento:', error);
    throw error; // Lanza el error para que pueda ser capturado en el componente
  }
};

export const onFindByQuery = async (collectionStr, field, operator, value) => {
  const q = query(collection(db, collectionStr), where(field, operator, value));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
}

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
  console.log('Buscando usuarios con el nombre:', userName);
  try {
    const q = query(
      collection(db, 'perfiles'),
      where('name', '>=', userName),
      where('name', '<=', userName + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
  
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
   
    return users;
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    return [];
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

export const onUpdateArrayField = async (collectionStr, paramId, field, value) => {
  await updateDoc(doc(db, collectionStr, paramId), {
    [field]: arrayUnion(value),
  });
}

export const onUpdateIntFieldBy = async (collectionStr, paramId, field, value) => {
  await updateDoc(doc(db, collectionStr, paramId), {
    [field]: increment(value),
  });
}

// Función para bloquear un contacto
export const onBlockContact = async (contactId) => {
  try {
    const contactRef = doc(db, 'perfiles', contactId);
    await updateDoc(contactRef, { isBlocked: true });
    console.log('Contacto bloqueado exitosamente');
  } catch (error) {
    console.error('Error al bloquear el contacto:', error);
    throw new Error('No se pudo bloquear el contacto');
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

 // Función para enviar una solicitud de amistad
export const onSendFriendRequest = async (friendRequestData) => {
  try {
    await addDoc(collection(db, "friendRequests"), friendRequestData);
    console.log("Solicitud de amistad enviada con éxito");
  } catch (error) {
    console.error("Error al enviar la solicitud de amistad:", error);
    throw error;
  }
};

// Función para cancelar una solicitud de amistad
export const onCancelFriendRequest = async (friendRequestId) => {
  try {
    const docRef = doc(db, "friendRequests", friendRequestId);
    await deleteDoc(docRef);
    console.log("Solicitud de amistad cancelada con éxito");
  } catch (error) {
    console.error("Error al cancelar la solicitud de amistad:", error);
    throw error;
  }
};

// Función para verificar si una solicitud de amistad ya existe
export const checkFriendRequestExists = async (fromUserId, toUserId) => {
  try {
    const q = query(
      collection(db, "friendRequests"),
      where("from", "==", fromUserId),
      where("to", "==", toUserId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error al verificar la existencia de la solicitud de amistad:", error);
    throw error;
  }
};

// Función para agregar una nueva noticia a la colección 'news'
export const onAddNews = async (newsData) => {
  try {
    await addDoc(collection(db, "news"), {
      ...newsData,
      timestamp: serverTimestamp(),
    });
    console.log("Noticia agregada exitosamente");
  } catch (error) {
    console.error("Error al agregar la noticia: ", error);
    throw new Error("No se pudo agregar la noticia");
  }
};

// Función para obtener todas las noticias de la colección 'news'
export const onGetAllNews = async () => {
  return await onFindAll('news');
};
