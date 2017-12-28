import React from 'react';
import HeaderContainer from '../containers/headerContainer';
import ResultsComp from './reqContainer';
import Header from 'grommet/components/Header';


class SidebarContainer extends React.Component {

  render() {
    return (
      <div>
          <Header className="landing-main-nav" size="small" float={false} fixed={true}>
            <HeaderContainer />
          </Header>
          <ResultsComp />
      </div>
    );
  }
}

export default SidebarContainer;
