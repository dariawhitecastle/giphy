import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import './App.css';

import Select from './components/Select.js';
import { MONTHS, DAYS } from './const.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAdj: '',
      selectedAnimal: null,
      gif: 'https://media.giphy.com/media/ytwDCpH2VqBVXphoKk/giphy.gif'
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedAdj !== prevState.selectedAdj) {
      const url =
        'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=2nHpYLEI75EYgIPH8PzyZGJMSvd5CyNo&limit=5';
      return axios.get(url).then(res => {
        console.log(res.data.data[0]);
        this.setState({
          gif: res.data.data[0].images.original.url
        });
      });
    }
  }
  handleSelectMonth = value => this.setState({ selectedAdj: value });
  handleSelectDay = value => this.setState({ selectedAnimal: value });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <h3>Birthday gif</h3>
          <Select
            handleChange={this.handleSelectMonth}
            className="select"
            items={MONTHS}
            name={'Choose your birth Month'}
          />
          <Select
            handleChange={this.handleSelectDay}
            className="select"
            items={DAYS}
            name={'Choose your birth Day'}
          />
          <h3>
            {this.state.selectedAdj}
            {this.state.selectedAnimal}
          </h3>
          {console.log(this.state.gif)}
          <img src={this.state.gif} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
