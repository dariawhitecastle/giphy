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

const style = {
  margin: 12,
  maxWidth: 200
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAdj: '',
      selectedAnimal: null,
      gif: 'https://media.giphy.com/media/ytwDCpH2VqBVXphoKk/giphy.gif',
      loading: true
    };
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedAnimal !== prevState.selectedAnimal) {
      // TODO: add state handling
      // TODO: add fetch another button
      const { selectedAdj, selectedAnimal } = this.state;

      const url = 'http://api.giphy.com/v1/gifs/search?q=';
      const searchUrl = `${url}${selectedAdj}+${selectedAnimal}&&limit=25`;
      return axios.get(searchUrl).then(res => {
        const randomInt = this.getRandomInt(25);
        this.setState({
          gif: res.data.data[randomInt].images.original.url,
          loading: false
        });
      });
    }
  }
  handleSelectMonth = value => this.setState({ selectedAdj: value });
  handleSelectDay = value => this.setState({ selectedAnimal: value });
  handleClick = () => {
    this.setState({
      selectedAdj: '',
      selectedAnimal: null,
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
          <div className="main-view-container">
            <h3>Birthday gif</h3>
            <Select
              handleChange={this.handleSelectMonth}
              onReset={this.handleClick}
              className="select"
              items={MONTHS}
              name={'Choose your birth Month'}
            />
            <Select
              handleChange={this.handleSelectDay}
              className="select"
              onReset={this.handleClick}
              items={DAYS}
              name={'Choose your birth Day'}
            />
            {this.state.selectedAdj &&
              this.state.selectedAnimal &&
              <h3>
                Congratulations! You are a {this.state.selectedAdj}{' '}
                {this.state.selectedAnimal}
              </h3>}
            {this.state.loading
              ? <img src={logo} className="App-logo" alt="logo" />
              : <img src={this.state.gif} height="300" width="300" />}
            <RaisedButton
              secondary={true}
              onClick={this.handleClick}
              style={style}
            >
              New Birthday gif!
            </RaisedButton>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
