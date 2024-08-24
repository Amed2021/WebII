// Stories.js
import { useState } from 'react';
import '../css/Stories.css';
import { Carousel, Modal, Button, Icon } from 'react-materialize';

const stories = [
  { id: 1, name: 'Murphy_300', image: 'https://plus.unsplash.com/premium_photo-1707932495000-5748b915e4f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, name: 'Mcgregor', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 3, name: 'Luisito-Comunica', image: 'https://images.unsplash.com/photo-1525199078165-69ce4f553361?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0d2VhcnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 4, name: 'Ronaldo_CR7', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 5, name: '_0Shakira', image: 'https://images.unsplash.com/photo-1531722596216-1fb4fbace9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R5bGV8ZW58MHx8MHx8fDA%3D' },
];

const Stories = () => {
  const [currentStory, setCurrentStory] = useState(null);

  const openStory = (story) => {
    setCurrentStory(story);
  };

  const closeStory = () => {
    setCurrentStory(null);
  };

  const nextStory = () => {
    const currentIndex = stories.findIndex(story => story.id === currentStory.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentStory(stories[nextIndex]);
  };

  const prevStory = () => {
    const currentIndex = stories.findIndex(story => story.id === currentStory.id);
    const prevIndex = (currentIndex - 1 + stories.length) % stories.length;
    setCurrentStory(stories[prevIndex]);
  };

  return (
    <div className="stories-container">
      <Carousel
        options={{ fullWidth: false, indicators: false }}
        className="stories-carousel"
      >
        {stories.map(story => (
          <div key={story.id} onClick={() => openStory(story)} className="carousel-item story-item">
            <img src={story.image} alt={story.name} className=" responsive-img story-image" />
            <p className="story-name">{story.name}</p>
          </div>
        ))}
      </Carousel>

      {currentStory && (
        <Modal
          open={!!currentStory}
          options={{
            onCloseEnd: closeStory,
          }}
          className="story-modal"
        >
          <div className="story-content">
            <img src={currentStory.image} alt={currentStory.name} className="responsive-img modal-story-image" />
            <p>{currentStory.name}</p>
            <div className="story-navigation">
              <Button onClick={prevStory} className="blue">
                <Icon>chevron_left</Icon>
              </Button>
              <Button onClick={nextStory} className="blue">
                <Icon>chevron_right</Icon>
              </Button>
            </div>
            <Button onClick={closeStory} className="red">
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Stories;
