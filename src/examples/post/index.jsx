import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

const Post = ({ title, url, thumbnail }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.postWrapper}
      title={title}
    >
      <label>{title}</label>
      {thumbnail && thumbnail !== 'self' ? <img src={thumbnail} /> : null}
    </a>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default Post;
