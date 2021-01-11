import React from 'react';
import PropTypes from 'prop-types';
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

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        full: PropTypes.string.isRequired,
        raw: PropTypes.string.isRequired,
        regular: PropTypes.string.isRequired,
        small: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
