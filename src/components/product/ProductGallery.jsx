import { useState } from 'react';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="product-gallery">
      <div className="main-product-image"><img src={active} alt={name} /></div>
      <div className="thumb-row">
        {images.map((image) => <button className={active === image ? 'active' : ''} onClick={() => setActive(image)} key={image}><img src={image} alt={name} /></button>)}
      </div>
    </div>
  );
}
