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
  arrayRemove,
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

// Función para actualizar un documento en Firestore
export const onUpdate = async (collectionStr, paramId, newData) => {
  try {
    const docRef = doc(db, collectionStr, paramId);
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error('Error actualizando documento:', error);
    throw error;
  }
};

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

/// Función para enviar una solicitud de amistad
export const onSendFriendRequest = async ({ from, to }) => {
  try {
    const fromUserRef = doc(db, 'perfiles', from);
    const toUserRef = doc(db, 'perfiles', to);

    // Agrega el ID del usuario que envía la solicitud en el perfil del destinatario
    await updateDoc(toUserRef, {
      friendRequestsReceived: arrayUnion(from),
    });

    // Agrega el ID del destinatario en la lista de solicitudes enviadas del remitente
    await updateDoc(fromUserRef, {
      friendRequestsSent: arrayUnion(to),
    });

    // Guarda la solicitud de amistad en la colección "friendRequests"
    await addDoc(collection(db, 'friendRequests'), {
      from,
      to,
      timestamp: serverTimestamp(),
    });

    console.log('Solicitud de amistad enviada exitosamente');
  } catch (error) {
    console.error('Error al enviar la solicitud de amistad:', error);
    throw error;
  }
};

// Función para cancelar una solicitud de amistad
export const onCancelFriendRequest = async (from, to) => {
  try {
    const fromUserRef = doc(db, 'perfiles', from);
    const toUserRef = doc(db, 'perfiles', to);

    // Elimina el ID del usuario que envió la solicitud en el perfil del destinatario
    await updateDoc(toUserRef, {
      friendRequestsReceived: arrayRemove(from),
    });

    // Elimina el ID del destinatario en la lista de solicitudes enviadas del remitente
    await updateDoc(fromUserRef, {
      friendRequestsSent: arrayRemove(to),
    });

    // Elimina la solicitud de amistad de la colección "friendRequests"
    const querySnapshot = await getDocs(
      query(
        collection(db, 'friendRequests'),
        where("from", "==", from),
        where("to", "==", to)
      )
    );
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log('Solicitud de amistad cancelada exitosamente');
  } catch (error) {
    console.error('Error al cancelar la solicitud de amistad:', error);
    throw error;
  }
};

// Función para verificar si ya existe una solicitud de amistad
export const checkFriendRequestExists = async (from, to) => {
  try {
    const result = await getDocs(
      query(
        collection(db, 'friendRequests'),
        where("from", "==", from),
        where("to", "==", to)
      )
    );
    return !result.empty;
  } catch (error) {
    console.error('Error al verificar solicitud de amistad:', error);
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


// Función para obtener todas las denuncias de la colección 'reports'
export const onFindAllReports = async () => {
  const result = await getDocs(collection(db, "reports"));
  let items = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return items;
};