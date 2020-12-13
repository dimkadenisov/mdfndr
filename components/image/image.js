import React from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.css';

export default function Image({ src }) {
  const [source, setSource] = React.useState(src);
  const handleButtonClick = React.useCallback(async () => {
    try {
      const res = await fetch('/api/randomPictures');
      const { urls } = await res.json();
      setSource(urls.regular);
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <div className={styles.image}>
      <img className={styles.image__img} src={source} />
      <div className={styles.image__overlay}>
        <button onClick={handleButtonClick} className={styles.button}>
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={styles.button__icon}
          >
            <path d="m464.022 232h-.022a24 24 0 0 0 -23.98 24.021 184.063 184.063 0 0 1 -289.527 150.688c-83.1-58.188-103.369-173.136-45.181-256.237s173.137-103.372 256.237-45.182a184.078 184.078 0 0 1 34.012 30.71h-67.54a24 24 0 0 0 0 48h112a24 24 0 0 0 24-24v-112a24 24 0 0 0 -48 0v39.967a234.175 234.175 0 0 0 -26.94-22 231.982 231.982 0 1 0 -266.119 380.061 230.285 230.285 0 0 0 132.567 42.015 234.971 234.971 0 0 0 40.776-3.585 232.025 232.025 0 0 0 191.716-228.479 24 24 0 0 0 -23.999-23.979z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};
