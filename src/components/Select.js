import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';

const styles = {
  customWidth: {
    width: 300
  }
};

export default class Select extends Component {
  state = {
    value: 1
  };

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
      >
        {this.menuItems(this.props.items)}
      </SelectField>
    );
  }
}
