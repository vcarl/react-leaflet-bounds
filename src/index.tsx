import * as React from "react";
import { LatLng } from "leaflet";
import * as PropTypes from "prop-types";

export interface Bounds {
  northEast: LatLng;
  southWest: LatLng;
}

export interface Props {
  // tslint:disable-next-line:no-any
  render: ({ bounds }: { bounds: Bounds }) => React.ReactElement<any>;
}

export default class MapBounds extends React.Component<Props, {}> {
  static contextTypes = {
    map: PropTypes.object
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
