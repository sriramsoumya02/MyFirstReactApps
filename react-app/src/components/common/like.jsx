import React from 'react';
const Like = (props) => {
  let isLiked = props.isLiked;
  let classes = 'fa fa-heart';
  if (!isLiked) classes += '-o';
  return <i className={classes} onClick={props.onLike} aria-hidden="true"></i>;
};
export default Like;
