import * as React from "react";
import { LatLng, Map, Evented } from "leaflet";
// import * as L from "leaflet";
import * as PropTypes from "prop-types";

export interface Bounds {
  northEast: LatLng;
  // northEast: L.LatLng;
  southWest: LatLng;
  // southWest: L.LatLng;
}

export interface Props {
  // tslint:disable-next-line:no-any
  render: ({ bounds }: { bounds: Bounds }) => React.ReactElement<any>;
}

export default class MapBounds extends React.Component<Props, Evented> {
// export default class MapBounds extends React.Component<Props, L.Evented> {
  static contextTypes = {
    map: PropTypes.instanceOf(Map)
  };
  componentDidMount() {
    this.context.map.on("moveend", this.handleViewportChange);
  }
  handleViewportChange = () => {
    this.forceUpdate();
  };
  render() {
    if (this.context.map === undefined) {
      return null;
    }
    const mapBounds = this.context.map.getBounds();
    const bounds: Bounds = {
      southWest: mapBounds.getSouthWest(),
      northEast: mapBounds.getNorthEast()
    };
    return this.props.render({ bounds });
  }
}
