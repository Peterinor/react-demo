import React from 'react';

import PropTypes from 'prop-types';
import { Button, FormGroup, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  }
});

class SearchingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureDate: new Date(),
      departure: "XMN",
      arrival: "PEK",
      psgCount: {
        adult: 1,
        child: 1,
        infant: 0
      }
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.search = this.search.bind(this);
  }

  handlePsgCountChange(type) {
    var that = this;
    return event => {
      var pc = that.state.psgCount;
      pc[type] = Number(event.target.value);
      that.setState({
        psgCount: pc
      });
    }
  }

  handleDateChange(date) {
    this.setState({ departureDate: date });
  }

  handleChange(name) {
    var that = this;
    return event => {
      var x = {
        [name]: event.target.value,
      };
      that.setState(x);
    };
  }

  search() {
    // require('util').format('%s-%s@%s')
    var route = this.state.departure + "-" + this.state.arrival;
    fetch('/shopping/flight?q=' + route)
      .then(response => {
        return response.json();
      }).then(offer => this.props.onload(offer));
  }

  render() {
    const { departureDate, departure, arrival } = this.state;
    const { classes } = this.props;

    const psgCount = {};
    const psgTypes = ['adult', 'child', 'infant'];
    psgTypes.forEach(t => {
      psgCount[t] = [0, 1, 2, 3, 4, 5].map(v => {
        return { value: v, label: v };
      })
    });
    return (
      <form>
        <div>
          <TextField
            required
            id="departure"
            label="Departure"
            defaultValue={departure}
            className={classes.textField}
            onChange={this.handleChange("departure")}
            margin="normal"
          />
          <TextField
            required
            id="arrival"
            label="arrival"
            defaultValue={arrival}
            className={classes.textField}
            onChange={this.handleChange("arrival")}
            margin="normal"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Departure Date"
              showTodayButton
              value={departureDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          {psgTypes.map(t => (
            <TextField
              id={"select-" + t + "-count"}
              select
              key={t}
              label={t + " Count"}
              className={classes.textField}
              value={this.state.psgCount[t]}
              onChange={this.handlePsgCountChange(t)}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal">
              {psgCount[t].map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          ))}
          <Button variant="contained" onClick={this.search} color="primary">Seach</Button>
        </div>
      </form>
    );
  }
}


SearchingForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchingForm);