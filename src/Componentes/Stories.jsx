import React, { useEffect } from 'react';

import '../Stories.css';

function Stories() {
  useEffect(() => {
    // Or with jQuery
    $(document).ready(function(){
        $('.carousel').carousel();
    });

    $(document).ready(function(){
        $('.materialboxed').materialbox();
    });

  }, []);

  const friends = [
    { src: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/78928/snow-covered-mountain-iphone-wallpaper-ilikewallpaper_com.jpg' },
    { src: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/75499/Matterhorn-Zermatt-Switzerland-iphone-wallpaper-ilikewallpaper_com.jpg' },
    { src: 'https://r1.ilikewallpaper.net/iphone-11-pro-wallpapers/download/27124/Paris-Night-France-City-Dark-Eiffel-Tower-iphone-wallpaper-ilikewallpaper_com.jpg' },
    { src: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/22418/Plain-Croissant-iphone-wallpaper-ilikewallpaper_com.jpg' },
    { src: 'https://r1.ilikewallpaper.net/iphone-wallpapers/download/7741/Surfer-Riding-A-Wave-iphone-wallpaper-ilikewallpaper_com.jpg' },
  ];

  return (
<div className='carouselBox'>
<div className="carousel">
    {friends.map((friend, index) => (
         
           <a key={index} className="carousel-item" href="#one!"><img className="carousel-img materialboxed" src={friend.src}/></a>
          
        ))}
</div>
</div>

  );
}

export default Stories;