import React from 'react';

import { Paper, Tabs, Tab, Typography } from '@material-ui/core';

export default class FlightList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, tabValue) {
    console.log(event);
    this.setState({ tabValue });
  };

  render() {
    const offer = this.props.offer;
    if (!offer) return (<div />);
    const odlist = offer.refData.odList;
    const idx = this.state.tabValue;
    const od = odlist[idx];
    const journeys = offer.refData.paxJourneys.filter(j => {
      return od.journeys.indexOf(j.id);
    });
    console.log(journeys);

    const { tabValue } = this.state;
    return (
      <div>
        <Paper position="static" >
          <Tabs
            value={tabValue}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth>
            {odlist.map((odx, idx) => (
              <Tab key={idx} value={odx.id} label={odx.origin.airport.code + "/" + odx.destination.airport.code} />
            ))}
          </Tabs>
        </Paper>
        {journeys.map((j, idx) => (
          <Paper>
            {j.segments.map((s, idx) => (
              <Paper>
                <Typography variant="headline" component="h3">
                  <span key={idx}>{s.origin.code + "/" + s.destination.code + "@" + s.departureTime}</span>
                </Typography>
                <Typography component="p">
                  <span key={idx}>{"[" + s.sellingClass.code + "]"}</span>
                </Typography>
              </Paper>
            ))}
          </Paper>

        ))}
      </div>
    );
  }
}