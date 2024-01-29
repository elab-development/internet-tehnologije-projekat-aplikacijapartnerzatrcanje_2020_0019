import React, { Component } from "react";
import Cards from "../Cards";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "../Button";
import "./RunningPlans.css";

class RunningPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPlans: [],
      genderFilter: "Svi",
      currentPage: 1,
      dataPerPage: 3, // Broj trkača po stranici
    };
  }

  filterPlans = (gender) => {
    const { plans1, plans2 } = this.props;
    let filtered = [...plans1, ...plans2];
    if (gender !== "Svi") {
      filtered = filtered.filter((plan) => plan.gender.toLowerCase() === gender.toLowerCase());
    }
    this.setState({ filteredPlans: filtered, genderFilter: gender, currentPage: 1 });
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  componentDidMount() {
    this.filterPlans("Svi");
  }

  render() {
    const { filteredPlans, currentPage, dataPerPage } = this.state;
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredPlans.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPlans.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="running-plans-container">
        <Cards
          data1={currentData}
          title="PRIDRUŽI SE DRUGIM TRKAČIMA!"
          type="runningplans"
          makeAPlan={this.props.makeAPlan}
          star1={this.props.star1}
          star2={this.props.star2}
        />

        <div className="filter-button-container">
          <div className="filter-buttons">
            <Button
              buttonStyle={`btn btn--primary btn--large ${this.state.genderFilter === "Svi" ? "btn--selected" : ""}`}
              onClick={() => this.filterPlans("Svi")}
            >
              Svi
            </Button>
            <Button
              buttonStyle={`btn btn--primary btn--large ${this.state.genderFilter === "Male" ? "btn--selected" : ""}`}
              onClick={() => this.filterPlans("Male")}
            >
              Muško
            </Button>
            <Button
              buttonStyle={`btn btn--outline btn--large ${this.state.genderFilter === "Female" ? "btn--selected" : ""}`}
              onClick={() => this.filterPlans("Female")}
            >
              Žensko
            </Button>
          </div>

          {/* Paginacija */}
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={() => this.paginate(number)}
                  href="#"
                  className={number === currentPage ? "page-link active" : "page-link"}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <MapContainer center={[51.505, -0.09]} zoom={14} className="map-container">
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
