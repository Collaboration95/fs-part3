const Filter = ({addNewFilter,newFilter,handleFilter})=>{
    return(
        <>
     
        <form onSubmit={addNewFilter}>
            <div>
                filter shown with <input value={newFilter} onChange={handleFilter}/>
            </div>
        </form>
        </>
    )
}

export default Filter;
