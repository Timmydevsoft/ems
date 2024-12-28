const ConfirmDeleteModal = ()=>{
    return(
        <div className="flex items-center justify-center w-60 h-60 rounded-md bg-white">
            <p>Are you sure you wants to delete this employee ?</p>
            <div className="flex items-center justify-between">
                <button>Confirm</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}
export default  ConfirmDeleteModal