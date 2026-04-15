import React from 'react';

const cards = [
  {
    title: 'Creative Layouts',
    desc: 'Modern digital designs emphasizing contrast and structural layouts built natively.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
    img: '/Screenshot 2026-04-15 201525.png',
    link: 'https://myshopify.vercel.app/'
  },
  {
    title: 'UI/UX Dashboards',
    desc: 'Experimental dashboard and interface designs with glassmorphism interactions.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
    img: '/Screenshot 2026-04-15 201616.png',
    link: 'https://styesence-315b719et-sanjaykumars-projects-283b7c45.vercel.app/'
  },
  {
    title: 'Visual Branding',
    desc: 'Bold branding identity concepts featuring striking typography and color theory.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
    img: '/Screenshot 2026-04-15 201625.png',
    link: 'https://startupsim-new.vercel.app/'
  },
];

export default function GradientCards() {
  return (
    <div className="gc-container">
      {cards.map(({ title, desc, gradientFrom, gradientTo, img, link }, idx) => (
        <div key={idx} className="gc-card">
          {/* Skewed gradient panels */}
          <span
            className="gc-panel"
            style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
          />
          <span
            className="gc-blur"
            style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
          />

          {/* Animated blurs */}
          <span className="gc-blobs">
            <span className="gc-blob top-blob" />
            <span className="gc-blob bottom-blob" />
          </span>

          {/* Content */}
          <div className="gc-content">
            <div className="gc-img-wrapper">
               <img src={img} alt={title} />
            </div>
            <h2>{title}</h2>
            <p>{desc}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        </div>
      ))}
    </div>
  );
}
