import { useState } from 'react';
import { X } from 'lucide-react';
import './EventGallery.css';

const photos = [
  '0a57b67b-45be-43ea-b7f4-03b15e278f3a.jpg',
  '2b23e345-4553-458a-a051-f38e57432492.jpg',
  '459a9013-112f-4c26-a8c3-0031321133d8.jpg',
  '4f5d9909-1457-49a5-a837-5f1d6c81e4fb.jpg',
  '6e028693-7f05-4469-9090-7b3d9de90ee3.jpg',
  '893ff658-8e06-4c23-ba00-a20b2674c580.jpg',
  '921e5e7b-866e-4070-bd87-5271ecafaecc.jpg',
  '9e4f762c-da98-4c63-b9d0-94d7a1926afa.jpg',
  'a0db33f7-b61a-442d-bd7f-3044ccc8eca6.jpg',
  'a3f95f02-a1e1-4db4-b2e6-4badf577a1d7.jpg',
  'af357e5c-8848-41a4-aa4a-adc6d63917f2.jpg',
  'b1c79578-5925-4592-9d30-22181187ee5a.jpg',
  'bf1f3180-47eb-42a2-99c4-74eccb725efc.jpg'
];

export default function EventGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="section event-gallery-section">
      <div className="container">
        <div className="event-gallery-header animate-on-scroll">
          <h2 className="events-section-title">
            <span className="dot dot-teal" style={{ background: 'var(--brand-primary)' }} /> Our Community Gallery
          </h2>
          <p className="event-gallery-desc">
            Real moments from past meetups, networking nights, and founder mixers across Hyderabad. This is what building together looks like.
          </p>
        </div>
        
        <div className="bento-gallery">
          {photos.map((photo, i) => (
            <div 
              key={i} 
              className={`bento-item bento-item-${i + 1} animate-on-scroll delay-${(i % 5) + 1}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={`/images/${photo}`} alt={`EBC Event Moment ${i + 1}`} loading="lazy" />
              <div className="bento-overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <div 
        className={`gallery-modal ${selectedPhoto ? 'is-open' : ''}`}
        onClick={() => setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedPhoto(null)}>
              <X size={32} />
            </button>
            <img src={`/images/${selectedPhoto}`} alt="Enlarged EBC Event Moment" className="gallery-modal-img" />
          </div>
        )}
      </div>
    </section>
  );
}
