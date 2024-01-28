import React, { Component } from "react";
import Cards from "../Cards";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import "./RunningPlans.css"; 

class RunningPlans extends Component {
  render() {
    return (
      <div className="running-plans-container">
        
        <Cards
          data1={this.props.services1}
          data2={this.props.services2}
          title="PRIDRUŽI SE DRUGIM TRKAČIMA!"
          type="runningplans"
          makeAnAppointment={this.props.makeAnAppointment}
          star1={this.props.star1}
          star2={this.props.star2}
        />

        
        <MapContainer
          center={[51.505, -0.09]} 
          zoom={14}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          
          <Marker position={[51.5, -0.09]}>
            <Popup>Hello World!</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default RunningPlans;


