const FileSelector  = (props) =>{
    return(
        <>	
            <div className={props.className}>
                <label>{props.inputLabel}</label>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input 
                        type="file" 
                        className="custom-file-input"
                        name={props.inputName}
                        onChange={props.handleChange}
                        />
                        <label className="custom-file-label">Choose file</label>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FileSelector;