import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import axios from "axios";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (

    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat:-1.2921 , lng: 36.8219 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
        {props.items.map(item=>{
            console.log(item)
            return <Marker position={{ lat: item[1], lng:item[2] }} title={item[0]} />
        })}
        <Marker position={{ lat: -1.2921, lng:36.8219 }} />

    </GoogleMap>
  ))
);

class Maps extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            items:[]
        }
    }

    componentDidMount(){

      //fetch items
        //add markers
        console.log("Token", localStorage.getItem("token"));
        let auth = "Bearer " + localStorage.getItem("token");
        axios.get("http://127.0.0.1:8080/dashboard/items", {
            headers: {
                'Authorization': auth,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                console.log(response.data);
                let items = response.data.map(u => {
                    return [u.name,u.lat,u.lon]
                });

                this.setState({
                    items: items
                })

            }).catch(reason => {
            console.log(reason)
        })
    }

    render(){
      return (
          <CustomSkinMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvsRz3eGgOgTWpd5Ag_0xaF1dv27xpDb8"
              loadingElement={<div style={{ height: `100%` }} />}
              items={this.state.items}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
          />
      );
  }
}

export default Maps;
