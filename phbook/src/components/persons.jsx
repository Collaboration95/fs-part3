const Persons = ({personToShow,handleClick})=>{
    return(
        <>
        <h2>Numbers</h2>
        <ul>
            {personToShow.map((person)=>(
            <li key={person.id}>{person.name} {person.number}
            <button key={person.id} onClick={()=>{handleClick(person.id)}}>Delete</button>
            </li>
            ))}
        </ul>
        
        </>
    )
  }

export default Persons;