import React from 'react';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Map from './eventsMap';
import Search from './eventsSearchBar';
import EventList from './eventsList';
import HeaderContainer from '../../containers/headerContainer';

const EventsDisplay = () =>
  (
    <Box className="events" full="true">
      <Header className="landing-main-nav" size="small" float={false} fixed={true}>
        <HeaderContainer />
      </Header>
      <Header className="events-header" fixed={false} />
      <Split className="events-split" fixed={false} flex="right">
        <Sidebar className="events-side" size="large" full={true} >
          <Search className="meetup-search" />
          <EventList className="meetup-list" />
        </Sidebar>
        <Map />
      </Split>
    </Box>
  );

export default EventsDisplay;
