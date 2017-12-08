/* global chrome */

import React, { Component } from 'react';
import FlagForm from './FlagForm';

class Landing extends Component {
  state = {
    loading: true,
    tours: undefined,
  };

  componentWillMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { getTours: true }, ({ tours: tourFlags }) => {
        const tours = tourFlags.map((value) => {
          let label = value.split('_').join(' ');

          label = label.charAt(0).toUpperCase() + label.slice(1);

          return {
            value,
            label,
            activate: false,
          };
        });

        this.setState({ tours, loading: false });
      });
    });
  }

  setTourFlag = (event) => {
    event.preventDefault();

    const toursToActivate = this.state.tours
      .filter(tour => tour.activate)
      .map(tour => tour.value);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { setTours: toursToActivate });
    });

    window.close();
  };

  updateTour = (targetValue, isChecked) => {
    const tours = [...this.state.tours];
    const targetTour = tours.find(tour => tour.value === targetValue);

    targetTour.activate = isChecked;
    this.setState({ tours });
  };

  canUpdate = () => this.state.tours.some(tour => tour.activate);
  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    return (
      <FlagForm
        tours={this.state.tours}
        canUpdate={this.canUpdate}
        updateTour={this.updateTour}
        setTourFlag={this.setTourFlag}
      />
    );
  }
}

export default Landing;
