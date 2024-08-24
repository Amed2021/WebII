import  { useState } from 'react';
import { Button,  Collection, CollectionItem } from 'react-materialize';

export const Notificaciones = () => {
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, user: 'Murphy_300', image: 'https://plus.unsplash.com/premium_photo-1707932495000-5748b915e4f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 2, user: 'Mcgregor', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 3, user: 'Luisito-Comunica', image: 'https://images.unsplash.com/photo-1525199078165-69ce4f553361?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0d2VhcnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 4, user: 'Ronaldo_CR7', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 5, user: '_0Shakira', image: 'https://images.unsplash.com/photo-1531722596216-1fb4fbace9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R5bGV8ZW58MHx8MHx8fDA%3D' }
  ]);

  const handleAccept = (id) => {
    setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    console.log(`Friend request from user ${id} accepted`);
  };

  const handleDecline = (id) => {
    setFriendRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    console.log(`Friend request from user ${id} declined`);
  };

  return (
    <div className="container" style={{ width: '80%' }}>
      <h4>Friend Requests</h4>
      <Collection>
        {friendRequests.map(request => (
          <CollectionItem key={request.id} className="avatar">
            <img src={request.image} alt={request.user} className="circle" style={{ objectFit: 'cover', height: '50px', width: '50px' }} />
            <span className="title">{request.user}</span>
            <p> wants to be your friend.</p>
            <div>
              <Button className="green" onClick={() => handleAccept(request.id)} small style={{ marginRight: '10px' }}>Accept</Button>
              <Button className="red" onClick={() => handleDecline(request.id)} small>Decline</Button>
            </div>
          </CollectionItem>
        ))}
      </Collection>
    </div>
  );
};

