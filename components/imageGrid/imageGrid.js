import React from 'react';
import Image from '../Image';
import styles from './imageGrid.module.css';

export default function ImageGrid({ images }) {
  return (
    <div className={styles.imageGrid}>
      {images.map((image) => (
        <Image key={image.id} src={image.urls.regular} />
      ))}
    </div>
  );
}
