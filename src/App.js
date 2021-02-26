import React, { Component } from 'react';
import Person from './Person/Person';
import styled from 'styled-components';
// import Radium, { StyleRoot } from 'radium';

import './App.css';

const StyledButton = styled.button`
  background-color: green;
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover: {
    background-color: Lightgreen;
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      { id: 'sdfkjs', name: 'Max', age: 28 },
      { id: 'sdfsf', name: 'Manu', age: 27 },
      { id: 'hfdgdg', name: 'Aaron', age: 24 }
    ], 
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: person})
  }

  deletePersonHander = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHander(index)}
              name={person.name} 
              age={person.age}
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a react App</h1>
        <p className={classes.join(' ')}>this is really working!</p>
        <StyledButton onClick={this.togglePersonsHandler}>
          Toggle persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
