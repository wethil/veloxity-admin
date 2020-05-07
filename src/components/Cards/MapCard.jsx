import React, { Component } from 'react';
import {
  Map,
  Marker,
  TileLayer,
  Tooltip,
} from 'react-leaflet';

import {
  Card,
  CardBody,
} from 'reactstrap';

import { numberFormat } from '../../utilities/stringUtils';

const center = [39.257201, 34.4880023];


class TopSellingsMap extends Component {

  render() {
    const { places } = this.props;
    return (
      <Card>
        <CardBody>
          <Map
            id='map'
            boxZoom={false}
            center={center}
            doubleClickZoom={false}
            keyboard={false}
            zoom={6}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {places.map(place=>(
              <Marker position={place.location}>
                <Tooltip> {place.city_name} - {numberFormat(place.order_count)} </Tooltip>
              </Marker>
            ))}
          </Map>
        </CardBody>
      </Card>
    );
  }
}


TopSellingsMap.defaultProps = {
  places: []
};

export default TopSellingsMap;
