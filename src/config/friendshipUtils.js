
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

export const sendFriendRequest = async (toUserId, fromUserId) => {
  try {
    await addDoc(collection(db, "friend_requests"), {
      fromUserId,
      toUserId,
      status: 'pending',
      timestamp: new Date(),
    });
    console.log("Solicitud de amistad enviada");
  } catch (e) {
    console.error("Error al enviar la solicitud de amistad: ", e);
  }
};

export const handleFriendRequest = async (requestId, isAccepted, userId) => {
  try {
    if (isAccepted) {
      // Actualizar estado de la solicitud
      await updateDoc(doc(db, 'friend_requests', requestId), { status: 'accepted' });

      // Añadir a ambos usuarios como amigos
      await updateDoc(doc(db, 'friends', userId), { friends: firebase.firestore.FieldValue.arrayUnion(requestId) });
      await updateDoc(doc(db, 'friends', requestId), { friends: firebase.firestore.FieldValue.arrayUnion(userId) });

      console.log('Amistad Aceptada');
    } else {
      // Actualizar estado de la solicitud
      await updateDoc(doc(db, 'friend_requests', requestId), { status: 'declined' });

      console.log('Solicitud Rechazada');
    }
  } catch (error) {
    console.error("Error al manejar la solicitud de amistad: ", error);
  }
};

export const Requests = async () => {
  const result = await getDocs(collection(db, "friend_requests"));
  let requests = result.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return requests;
};
