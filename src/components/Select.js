import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';

export default class Select extends Component {
  state = {
    value: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reset !== prevProps.reset && this.props.reset) {
      this.setState({ value: '' });
    }
  }
  handleChange = (event, i, value) => {
    this.props.handleChange(value);
    this.setState({ value });
  };

  menuItems(items) {
    return items.map(item =>
      <MenuItem key={item.id} value={item.value} primaryText={item.name} />
    );
  }

  render() {
    return (
      <SelectField
        floatingLabelText={this.props.name}
        value={this.state.value}
        onChange={this.handleChange}
        floatingLabelStyle={{ color: 'white', width: 200, marginLeft: -100 }}
      >
        {this.menuItems(this.props.items)}
      </SelectField>
    );
  }
}
