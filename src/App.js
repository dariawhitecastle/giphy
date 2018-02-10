import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import axios from 'axios';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';

import Select from './components/Select.js';
import { MONTHS, DAYS } from './const.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAdj: '',
      selectedAnimal: null,
      gif: 'https://media.giphy.com/media/ytwDCpH2VqBVXphoKk/giphy.gif',
      loading: true,
      reset: false
    };
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }
  // once the value of the form is updated with seacrh terms, we make an api call
  // with the env var
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedAnimal !== prevState.selectedAnimal) {
      const { selectedAdj, selectedAnimal } = this.state;
      const apiKey = `&api_key=${process.env.REACT_APP_SECRET_CODE}`;
      // while the gif is updating, we show loader
      this.setState({ loading: true });
      const url = 'http://api.giphy.com/v1/gifs/search?q=';
      const searchUrl = `${url}${selectedAdj}+${selectedAnimal}${apiKey}&limit=25`;
      return axios.get(searchUrl).then(res => {
        // get a random gif out of an array pf 25 results
        // turn the reset flag off
        const randomInt = this.getRandomInt(25);
        this.setState({
          gif: res.data.data[randomInt].images.original.url,
          reset: false,
          loading: false
        });
      });
    }
  }
  handleSelectMonth = value => this.setState({ selectedAdj: value });
  handleSelectDay = value => this.setState({ selectedAnimal: value });
  // clear out form values on reset and pass the flag to Select children
  handleClick = () => {
    this.setState({
      reset: true,
      gif: 'https://media.giphy.com/media/ytwDCpH2VqBVXphoKk/giphy.gif'
    });
  };
  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <main>
            <h2 className="primary">Birthday gif</h2>
            <Select
              handleChange={this.handleSelectMonth}
              reset={this.state.reset}
              items={MONTHS}
              name={'Choose your birth Month'}
            />{' '}
            <Select
              handleChange={this.handleSelectDay}
              reset={this.state.reset}
              items={DAYS}
              name={'Choose your birth Day'}
            />
            {this.state.selectedAdj &&
              this.state.selectedAnimal &&
              !this.state.reset &&
              <h3 className="secondary">
                Congratulations! You are a {this.state.selectedAdj}{' '}
                {this.state.selectedAnimal}
              </h3>}
            {this.state.loading
              ? <img src={logo} className="App-logo" alt="logo" />
              : <img src={this.state.gif} alt="gif" />}
            <RaisedButton
              className="button"
              secondary={true}
              onClick={this.handleClick}
            >
              New Birthday gif!
            </RaisedButton>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
