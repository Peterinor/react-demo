import React from 'react';
import ReactDOM from 'react-dom';

// import AppBar from './shopping/AppBar';
// import ShoppingSteps from './shopping/ShoppingSteps';
import SearchingForm from './shopping/SearchingForm';
import FlightList from './shopping/FlightList';
console.log(FlightList);

import { Divider } from '@material-ui/core';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      offer: null,
    };
    this.onload = this.onload.bind(this);
  }

  onload(offer) {
    console.log(offer);

    offer.refData.odList.forEach(od => {
      od.journeys = od.journeies;
    });

    offer.refData.segments.forEach(seg => {
      seg.id = seg.flight.flightNumber + "-" + seg.origin.code + "-" + seg.destination.code;
    });

    offer.refData.paxJourneys.forEach(j => {
      j.segments = [];
      j.paxSegmentIds.forEach(sid => {
        var paxSeg = offer.refData.paxSegments.find(ps => ps.id === sid);
        if (paxSeg) {
          var seg = offer.refData.segments.find(s => s.id === paxSeg.segmentId);
          if (seg) {
            seg.sellingClass = paxSeg.sellingClass;
            j.segments.push(seg);
          }
        }
      })
      // console.log(j);
    });

    this.setState({
      offer: offer
    });
  }
  render() {
    return (
      <div>
        {/* <AppBar /> */}
        {/* <ShoppingSteps /> */}
        <SearchingForm onload={this.onload} />
        <Divider />
        <FlightList offer={this.state.offer} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
