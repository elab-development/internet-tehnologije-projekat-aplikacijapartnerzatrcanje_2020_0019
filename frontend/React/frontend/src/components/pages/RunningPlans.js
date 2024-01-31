import React, { Component } from "react";
import Cards from "../Cards";
import { Button } from "../Button";
import "./RunningPlans.css";
import SpotifySong from "../SpotifySong";

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

        <div className="cards-and-filters">
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

          <Cards
            data1={currentData}
            title="PRIDRUŽI SE DRUGIM TRKAČIMA!"
            type="runningplans"
            makeAPlan={this.props.makeAPlan}
            star1={this.props.star1}
            star2={this.props.star2}
          />

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

        <SpotifySong accessToken={this.props.accessToken} />
      </div>
    );
  }
}

export default RunningPlans;
