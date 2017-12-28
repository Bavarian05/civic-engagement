import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import ListItem from './eventsListItem';


class EventListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { InfoWindow: { currentEvent, showInfoWindow } } = this.props;
    const prevId = prevProps.InfoWindow.currentEvent.id;

    if (prevId === currentEvent.id && !showInfoWindow) { return; }
    // Scrolls to list item cooresponding to info window selection
    const el = document.getElementsByClassName('selected');
    el[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  render() {
    const { events, InfoWindow } = this.props;
    const { results } = events;
    const { currentEvent, showInfoWindow } = InfoWindow;
    let eventList = [];

    if (results) {
      eventList = results.map((event, index) => {
        const { name, id } = event;
        const styling = {
          backgroundColor: 'red'
        };

        return id === currentEvent.id && showInfoWindow
        ? (
            <AccordionPanel heading={name} key={id} className="selected" style={styling}>
              <ListItem key={id} event={event} index={index} style={styling} id="selected" />
            </AccordionPanel>
          )
        :
          (
            <AccordionPanel heading={name} key={id} >
              <ListItem key={id} event={event} index={index} />
            </AccordionPanel>
          );
      });
    }

    return (
      <Accordion className="meetup-events-list" openMulti={false} >
        {eventList}
      </Accordion>
    );
  }
}

EventListComponent.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object)
};

EventListComponent.defaultProps = {
  events: 'n/a'
};

function mapStateToProps(state) {
  return {
    events: state.Events.eventResults,
    InfoWindow: state.EventsMap
  };
}

export default connect(mapStateToProps)(EventListComponent);
