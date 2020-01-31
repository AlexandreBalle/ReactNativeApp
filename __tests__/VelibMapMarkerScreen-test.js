import React from 'react';
import VelibMapMarkerScreen from '../screens/VelibMapMarkerScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const valueVelib = {
    "fields": {
      "nbedock": 21,
      "station_name": "Diderot - Pierre Bourdan",
      "nbfreeedock": 10,
      "nbfreedock": 0,
      "nbdock": 0,
    },
    "geometry": {
      "coordinates": [
        2.3902582749724393,
        48.84764862079675
      ]
    }
  };
  const tree = renderer.create(<VelibMapMarkerScreen velib={valueVelib} />).toJSON();
  expect(tree).toMatchSnapshot();
});
