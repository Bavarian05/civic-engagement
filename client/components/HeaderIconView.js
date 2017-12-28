import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

const style = {
  display: 'inline-block',
  border: 0,
  width: '196px',
  height: '0px',
  position: 'relative',
  WebkitTransition: 'all 200ms ease-in',
  WebkitTransform: 'scale(1)',
  MsTransition: 'all 200ms ease-in',
  MsTransform: 'scale(1)',
  MozTransition: 'all 200ms ease-in',
  MozTransform: 'scale(1)',
  transition: 'all 200ms ease-in',
  transform: 'scale(1)',
  ':hover': {
    boxShadow: '0px 0px 150px #000000',
    zIndex: 2,
    WebkitTransition: 'all 200ms ease-in',
    WebkitTransform: 'scale(1.1)',
    MsTransition: 'all 200ms ease-in',
    MsTransform: 'scale(1.1)',
    MozTransition: 'all 200ms ease-in',
    MozTransform: 'scale(1.1)',
    transition: 'all 200ms ease-in',
    transform: 'scale(1.1)'
  }
};

const HeaderIconView = (props) => {
  const { route, url, description } = props;

  return (
    <div style={style}>
      <Link to={route}>
        <img alt="" style={{ height: '70px', width: '70px' }} src={url} />
        <br />
        {description}
      </Link>
    </div>
  );
};

export default Radium(HeaderIconView);
