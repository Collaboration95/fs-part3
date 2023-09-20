import { useState } from 'react'
import React, { useEffect } from 'react'
import Filter from './components/Filter'
import PhoneBook from './components/personform'
import { v4 as uuidv4 } from 'uuid';
import Notification from './components/notifications'
import Persons from './components/persons'
import personService from './services/persons'
import "./index.css"
const App = () => {



  const [persons, setPersons] = useState([])

  const laodperson=()=>{
    personService.getAll()
    .then(response=>{
      setPersons(response.data)
      console.log("Data fetched from json-server")
    })
  }
  useEffect(laodperson,[])
  const [newName, setNewName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addNewPerson = (event)=>{
    event.preventDefault();
    const isExist = persons.filter(person=>person.name===newName);
    if(isExist.length>0 ){      // alert(`${newName} is already added to phonebook`);
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(result){
        const newPerson = {name:newName,number:newNumber,id:isExist[0].id};
        personService.update(isExist[0].id,newPerson)
        .then(response=>{
          if(response.status===200){
            setErrorMessage(`Updated ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          }
        }).catch(error=>{
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
        )
        setPersons(persons.map(person=>person.id!=isExist[0].id?person:newPerson))
        setNewName('')
        setNumber('')
      }
      return;
    }
    // const newPerson = {name:newName,number:newNumber,id:persons.length+1};
    const newPerson = {name:newName,number:newNumber,id:uuidv4()};
    personService.create(newPerson)
    .then(response=>{
      if(response.status===201){
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    })
    setPersons(persons.
      concat(newPerson))
    setNewName('')
    setNumber('')
    console.log(persons)
  }

  const addNewFilter = (event)=>{
    event.preventDefault();
    const filteredPersons = persons.filter(person=>person.name===newFilter);
    console.log(filteredPersons); 
    setFilter('');
  }

  const handleChange = (event)=>{
    setNewName(event.target.value);
  }
  const handleNumber = (event)=>{
    setNumber(event.target.value);
  }
  const handleFilter = (event)=>{
    setFilter(event.target.value);
  }
  const handleClick = (id)=>{
    event.preventDefault();
    const result = window.confirm(`Delete ${id} ?`);
    if(result){
      personService.deletePerson(id)
      .then(response=>{

        console.log(response)
      })


      setPersons(persons.filter(person=>person.id!=id))
    }
  }

    const personToShow = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :persons
    
  return (
    <>
     <Notification message={errorMessage} />
      <PhoneBook addNewPerson={addNewPerson} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumber={handleNumber} />
      <Filter addNewFilter={addNewFilter} newFilter={newFilter} handleFilter={handleFilter} />
      <Persons personToShow={personToShow} handleClick={handleClick} />
    </>
  )
}  

export default App