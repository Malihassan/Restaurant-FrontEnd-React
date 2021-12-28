import classes from "./map.module.css";
import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { accountAction } from "../../Store/account";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { useEffect, useState } from "react";

const Map = (props) => {
  const dispatch = useDispatch();
  const locatioSelector = useSelector(state => state.account.LatLng)
  const [currentLatLng, setCurrentLatLng] = useState({lat:'',lng:''});
  
  useEffect(()=>{
    if (locatioSelector.lat !== '') {
      setCurrentLatLng(locatioSelector);
    }
  },[])

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getposition, errorhandeler, {});
  } else {
    alert("YOUR BROWSER NOT SUPPORT GEOLOCATION");
  }

  

  function getposition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    dispatch(accountAction.setLocation({ lat, lng }));
    setCurrentLatLng({ lat, lng });
  }
  function errorhandeler(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        props.onBackHandeler();
        break;
      case error.POSITION_UNAVAILABLE:
        alert("POSITION_UNAVAILABLE");
        break;
      case error.TIMEOUT:
        alert("TIMEOUT");
        break;
      case error.UNKOWN_ERROR:
        alert("UNKOWN_ERROR");
        break;
      default:
    }
  }
  function addLocationMarker (map, maps) {
    // by default show current loaction as marker
    const iconImage =
      "https://res.cloudinary.com/alhendawyrestaurant/image/upload/v1638253419/57-577144_location-icon-png_ilffgh.png";
    let newMarker = new google.maps.Marker({
      position: currentLatLng,
      map: map,
      icon: { url: iconImage, scaledSize: new google.maps.Size(27, 27) },
    });
    chooseOrderDeliveryLocation(map, maps, newMarker, iconImage);
  };
  function chooseOrderDeliveryLocation(map, maps, newMarker, iconImage) {
    maps.event.addListener(map, "click", function (event) {
      if (newMarker) {
        newMarker.setPosition(event.latLng);
      } else {
        newMarker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          icon: { url: iconImage, scaledSize: new google.maps.Size(27, 27) },
        });
      }
      const { lat, lng } = event.latLng.toJSON();
      dispatch(accountAction.setLocation({ lat, lng }));
    });
  }

  return (
    <div className={`${props.className} ${classes.mapContainer}`}>
      <button className={classes.cancelMapPage} onClick={props.onBackHandeler}>
        <BsBoxArrowUpLeft className={classes.backIcon} />
      </button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBhdYY1dbs5xWPj0wuwZuYD_NFrDbr2qQ0" }}
        center={currentLatLng}
        defaultZoom={17}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => addLocationMarker(map, maps)}
      ></GoogleMapReact>
    </div>
  );
};
export default Map;
