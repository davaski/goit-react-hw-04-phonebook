import { Component } from 'react';
import s from './FormContact.module.css';

export class FormContact extends Component {
  state = {
    name: '',
    phone: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({
      name: '',
      phone: '',
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          name="name"
          required
          placeholder="Enter Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          className={s.input}
          type="tel"
          name="phone"
          required
          placeholder="Enter Phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <button className={s.button}>Add contact</button>
      </form>
    );
  }
}
