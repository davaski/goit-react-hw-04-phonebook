import { Component } from 'react';
import s from './App.module.css';
import { nanoid } from 'nanoid';
import { FormContact } from './FormContact/FormContact';
import { Filter } from './Filter/Filter';
import { ListContact } from './ListContact/ListContact';
import { saveToLS, loadFromLS } from './storage';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = loadFromLS('contacts');
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      saveToLS('contacts', contacts);
    }
  }

  handlerFormSubmit = ({ name, phone }) => {
    const searchName = name.toLowerCase();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === searchName
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      phone,
    };
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = value => {
    this.setState({
      filter: value,
    });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.phone.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div className={s.container}>
        <h1 className={s.tittle}>PhoneBook</h1>
        <FormContact onSubmit={this.handlerFormSubmit} />
        <h2 className={s.tittle}>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ListContact
          contacts={this.getFilterContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
