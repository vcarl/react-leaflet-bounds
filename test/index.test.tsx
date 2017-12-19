import * as React from "react";
import MapBounds from "../src/index";

import { shallow } from "enzyme";

const southWest = {
  lat: 0,
  lng: 0
};
const northEast = {
  lat: 1,
  lng: 1
};

const boundsFns = {
  getSouthWest: jest.fn().mockReturnValue(southWest),
  getNorthEast: jest.fn().mockReturnValue(northEast)
};

const contextStub = {
  map: {
    on: jest.fn(),
    getBounds: jest.fn().mockReturnValue(boundsFns)
  }
};

describe("MapBounds", () => {
  it("calls all the right context methods", () => {
    const wrapper = shallow(
      <MapBounds render={bounds => <span>{JSON.stringify(bounds)}</span>} />,
      { context: contextStub }
    );
    let instance = wrapper.instance();
    expect(contextStub.map.on).toHaveBeenCalledWith(
      "moveend",
      instance.handleViewportChange
    );
    console.log(wrapper.html());
    expect(contextStub.map.getBounds).toHaveBeenCalled();
    expect(boundsFns.getSouthWest).toHaveBeenCalled();
    expect(boundsFns.getNorthEast).toHaveBeenCalled();
  });
});
