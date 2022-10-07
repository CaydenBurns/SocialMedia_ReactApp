import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function MapWrapper(props) {
  console.log(props, "props in mapArray");
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  const markerss = [];

  for (let i = 0; i < props.mapArray.length; i++) {
    let latLng = {};
    let currentElement = props.mapArray[i];
    latLng.lat = currentElement?.latitude;
    latLng.lng = currentElement?.longitude;
    markerss.push(latLng);
  }

  const NewCentaa = new window.google.maps.LatLngBounds(); //This is where the error stops

  function averageCenter(centers) {
    let lat = 0;
    let lng = 0;
    const sumOfCenters = {};
    for (let i = 0; i < centers.length; i++) {
      let currentCenter = centers[i];
      NewCentaa.extend({ lat: currentCenter.lat, lng: currentCenter.lng });
      lat = lat + currentCenter.lat;
      lng = lng + currentCenter.lng;
    }
    lat = lat / centers.length;
    lng = lng / centers.length;
    sumOfCenters.lat = lat;
    sumOfCenters.lng = lng;
    return sumOfCenters;
  }

  const sumOfCenters = averageCenter(markerss);

  const markers = [
    {
      lat: props?.mapArray?.metaData?.location?.latitude,
      lng: props?.mapArray?.metaData?.location?.longitude,
    },
  ];

  console.log(markers);

  const center = {
    lat: sumOfCenters.lat,
    lng: sumOfCenters.lng,
  };
  console.log(center);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCPTjVnlXTHh3aok-Wqbli0xp6OGD-tlU0&v",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.fitBounds(NewCentaa);
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
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerss.map((item) => {
        console.log(item, "item item item");
        return (
          <Marker
            key={Math.random() * 1000}
            animation="DROP" //straight from google
            position={{ lat: Number(item.lat), lng: Number(item.lng) }}
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
