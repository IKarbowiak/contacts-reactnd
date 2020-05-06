import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'


class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  removeContacts = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter(c => c.id !== contact.id )
    }))

    ContactAPI.remove(contact)
  }

  render() {
    return (
      <div>
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContacts}
        />
      </div>
    );
  }
}

export default App;
