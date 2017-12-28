import React from 'react';
import HeaderIconView from './HeaderIconView';

const HeaderView = (props) => {
  const headerIcons = props.headerIcons;

  if (headerIcons) {
    const header = headerIcons.map(url => (
      <HeaderIconView url={url[0]} description={url[1]} route ={url[2]}/>
    ));

    return (<div className="header" >{header}</div>);
  }

  return (<div />);
};


export default HeaderView;
