# react-leaflet-bounds

Getting the boundaries of the map when using [`react-leaflet`](https://github.com/PaulLeCam/react-leaflet) is kind of a pain. This component makes them available as an argument to a render prop, which makes it easier to compose.

```js
<Map>
  <MapBounds render={({ bounds }) => <div>{JSON.stringify(bounds)}</div>} />
</Map>
```

The argument is an object with a single key, `bounds`, which has the southWest and northEast boundaries as LatLng objects.

```
{
  bounds: {
    southWest: { lat: number, lng: number },
    northEast: { lat: number, lng: number }
  }
}
```

# Example

This example assume there's an array of points coming in from props that we want to render as markers.

```js
const filterByBoundsFactory = (bounds) =>
  (point) => {
    const { lng, lat } = point;

    return (
      lng > bounds.southWest.lng &&
      lng < bounds.northEast.lng &&
      lat > bounds.southWest.lat &&
      lat < bounds.northEast.lat
    );
  }

// points = [ { lat: .., lng: .. }, { lat: .., lng: .. }, { lat: .., lng: .. }, ... ]
const MarkerMap = ({ points }) =>
  <Map center={position} zoom={13} minZoom={12}>
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
    />
    <MapBounds
      render={({ bounds }) => (
        <div>
          {points.filter(filterByBoundsFactory(bounds))
            .map(point => <Marker key={point.lat + point.lng} position={point} />
          }
        </div>
      )}
    />
  </Map>
```

The top function, `filterByBoundsFactory` creates filter predicates that only returns true for points within the boundaries provided. We use that to filter based on the boundaries we get out of the `MapBounds` component's `render` prop.
