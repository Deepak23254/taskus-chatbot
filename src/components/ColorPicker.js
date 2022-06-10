const ColorPicker  = (props) =>{
    return(
        <>	<div className={props.className}>
                <label>{props.inputLabel}</label>
	            <div className="input-group mb-3">
	                <input type="color" className="form-control" name={props.inputName} value={props.inputValue} onChange={props.handleChange}/>
	            </div>
	        </div>
        </>
    );
}
export default ColorPicker;