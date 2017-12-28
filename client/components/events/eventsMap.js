import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { toggleInfoWindow, closeInfoWindow } from '../../actions/meetupMapActions';

const resolveLatLng = (eventObj, type) => {
  const { venue, group } = eventObj;
  const dimension = type.toLowerCase() === 'lat' ? 'lat' : 'lon';
  return venue && venue[dimension] ? venue[dimension] : group[`group_${dimension}`];
};

class MapContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      defaultCenter: { // Default is Manhattan, NY
        lat: 40.746275,
        lng: -73.988249
      },
      defaultZoom: 9
    };
  }

  componentDidUpdate(prevProps) {
    const prev = JSON.stringify(prevProps.Events);
    const current = JSON.stringify(this.props.Events);
    if (prev === current) { return; }
    this._fitTheBounds();
  }

  _fitTheBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    const results = this.props.Events;
    const map = this.map;
    results.forEach((event) => {
      const vLat = Number(resolveLatLng(event, 'lat'));
      const vLng = Number(resolveLatLng(event, 'lon'));
      bounds.extend(new window.google.maps.LatLng(vLat, vLng));
    });
    map.fitBounds(bounds);
    map.panToBounds(bounds);
    const currentZoom = map.getZoom();
    if (currentZoom > 15) { // For cases where user is zoomed out too far to see results
      map.setZoom(15);
    }
  }

  render() {
    const { Events, toggleInfoWindow, closeInfoWindow, InfoWindow: InfoWindowProps } = this.props;
    let markers = [];

    if (Events) {
      markers = Events.map((event, index) => {
        const vLat = resolveLatLng(event, 'lat');
        const vLng = resolveLatLng(event, 'lon');
        return (
          <Marker
            position={{ lat: vLat, lng: vLng }}
            key={event.id}
            index={index}
            onClick={toggleInfoWindow.bind(this, event)}
          />
        );
      });
    }

    const { showInfoWindow, windowPosition, currentEvent } = InfoWindowProps;

    const gMapsEl = (
      <GoogleMap
        ref={(comp) => { this.map = comp; }}
        defaultZoom={this.state.defaultZoom}
        defaultCenter={this.state.defaultCenter}
      >
        { markers }
        {
          showInfoWindow &&
          <InfoWindow
            position={windowPosition}
            onCloseclick={closeInfoWindow}
            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
          >
            {
              `<h2>${currentEvent.name}</h2>
              <h4>Hosted By: ${currentEvent.group.name}</h4>
              <h4>When: ${new Date(currentEvent.time)}</h4>
              <p>${currentEvent.description}</p>`
            }
          </InfoWindow>
        }
      </GoogleMap>
    );

    return (
      <section className="meetup-map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapLoader
          containerElement={<div style={{ height: '100%' }} />}
          googleMapElement={gMapsEl}
        />
      </section>
    );
  }
}

MapContainer.propTypes = {
  toggleInfoWindow: PropTypes.func,
  closeInfoWindow: PropTypes.func
};

MapContainer.defaultProps = {
  toggleInfoWindow: 'n/a',
  closeInfoWindow: 'n/a'
};

function mapStateToProps(state) {
  return {
    Events: state.Events.eventResults.results,
    InfoWindow: state.EventsMap
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleInfoWindow, closeInfoWindow }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
