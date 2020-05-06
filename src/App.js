import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'


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

  createContact = (contact) => {
    console.log('contact', contact)
    ContactAPI.create(contact).then((contact) => {
      this.setState((oldState) => ({
        contacts: [...oldState.contacts, contact]
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContacts}
          />
        )} />
        <Route path='/create' render={({history}) => (
          <CreateContact onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }}/>
        )} />
      </div>
    );
  }
}

export default App;
