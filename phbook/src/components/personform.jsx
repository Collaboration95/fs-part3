const PhoneBook = ({addNewPerson,newName,handleChange,newNumber,handleNumber})=>{
    return(
      <>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number : <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br/>
      </>
    )
  }
export default PhoneBook;  