const TextInput  = (props) =>{
    return(
        <>	<div className={props.className}>
                <label>{props.inputLabel}</label>
	            <div className="input-group mb-3">
	                <input type="text" className="form-control" name={props.inputName} value={props.inputValue} placeholder={props.placeholder} onChange={props.handleChange}/>
	            </div>
	        </div>
        </>
    );
}
export default TextInput;