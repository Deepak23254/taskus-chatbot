const FontSelector  = (props) =>{
    return(
        <>	<div className={props.className}>
                <label>{props.inputLabel}</label>
                <div className="input-group mb-3">
                    <select
                    name={props.inputName}  
                    value={props.inputValue} 
                    onChange={props.handleChange} 
                    className="browser-default custom-select">
                        <option value=''>---Select Font Family--- </option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
            </div>
        </>
    );
}
export default FontSelector;