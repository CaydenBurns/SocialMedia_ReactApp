import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function MapWrapper(props) {
  console.log(props, "props in mapWrapper");
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const markers = [
    {
      lat: props?.locations?.event?.latitude,
      lng: props?.locations?.event?.longitude,
    },
  ];
  const center = {
    lat: props?.locations?.event?.latitude,
    lng: props?.locations?.event?.longitude,
  };
  console.log(center);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCPTjVnlXTHh3aok-Wqbli0xp6OGD-tlU0&v",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    console.log(map);
    setMap(null);
  }, []);

  console.log(map);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
      key={props?.locations?.event?.latitude}
    >
      {markers.map((item) => {
        return (
          <Marker
            key={item.lat}
            animation="DROP" //straight from google
            position={{ lat: item.lat, lng: item.lng }}
          />
        );
      })}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapWrapper);
