import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
// import S3FileUpload from 'react-s3';
import {global} from '../config/global';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../assets/css/style.css';
import '../assets/css/fontawesome.css';
import $ from 'jquery';
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import FileSelector from "./FileSelector";
import TextInput from "./TextInput";
// import useWidget from '../services/widgetApi';
window.Buffer = window.Buffer || require("buffer").Buffer;

const Dashboard = () =>{

    let { userid } =  useParams();

    let [placeholderText,setPlaceholderText] = useState('');
    let [openWidgetByDefault,setOpenWidgetByDefault] = useState(false);
    let [headerContent,setHeaderContent] = useState('');
    let [inputBackground,setInputBackground] = useState('#f0f8ff');
    let [inputTextColor,setInputTextColor] = useState('#000000');
    let [inputFontFamily,setInputFontFamily] = useState('');
    let [headerBackground,setHeaderBackground] = useState('#438eb9');
    let [headerContentColor,setHeaderContentColor] = useState('#ffffff');
    let [headerFontFamily,setHeaderFontFamily] = useState('');
    let [contentBackground,setContentBackground] = useState('#438eb9');
    let [contentTextColor,setContentTextColor] = useState('#ffffff');
    let [contentFontFamily,setContentFontFamily] = useState('');
    let [informationTextColor,setInformationTextColor] = useState('#ffffff');
    let [informationFontFamily,setInformationFontFamily] = useState('');
    let [buttonBackground,setButtonBackground] = useState('#438eb9');
    let [mainIcon,setMainIcon] = useState(null);
    let [headerIcon,setHeaderIcon] = useState(null);
    
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(global.API_HOST+"/widget/"+userid);
            
            let result = await response.json();
            console.log(result);

            setPlaceholderText(result.data.properties.placeholderText);
            setOpenWidgetByDefault(result.data.properties.openWidgetByDefault);
            setHeaderContent(result.data.properties.header_content);

            setInputBackground(result.data.properties.input.background)
            setInputTextColor(result.data.properties.input.color)
            setInputFontFamily(result.data.properties.input.fontFamily)

            setHeaderBackground(result.data.properties.header.background)
            setHeaderContentColor(result.data.properties.header.color)
            setHeaderFontFamily(result.data.properties.header.fontFamily)

            setContentBackground(result.data.properties.content.background)
            setContentTextColor(result.data.properties.content.color)
            setContentFontFamily(result.data.properties.content.fontFamily)

            setInformationTextColor(result.data.properties.information.color)
            setInformationFontFamily(result.data.properties.information.fontFamily)

            setButtonBackground(result.data.properties.main_button.background)

            // setMainIcon(result.data.properties.main_icon);
            // setHeaderIcon(result.data.properties.header_logo);
        }
		fetchData();
	},[userid]);

    // function hexToRgb(hex) {
    //     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //     return result ? {
    //         r: parseInt(result[1], 16),
    //         g: parseInt(result[2], 16),
    //         b: parseInt(result[3], 16)
    //     } : null;
    // }

    const handleFileInput = (e,file,iconType)=>{

        var fileName = $(e.target).val().split("\\").pop();
        $(e.target).siblings(".custom-file-label").addClass("selected").html(fileName);

        // const config = {
        //   bucketName: global.S3_BUCKET,
        //   dirName: global.UPLOAD_DIR, /* optional */
        //   region: global.REGION,
        //   accessKeyId: global.ACCESS_KEY,
        //   secretAccessKey: global.SECRET_KEY,
        // }
        // console.log(config);
        // S3FileUpload.uploadFile(file, config)
        // .then((data)=>{
        //   console.log(data.location);
        //     if(iconType === 'main')
        //         setMainIcon(data.location);
        //     if(iconType === 'header')
        //         setHeaderIcon(data.location);
        // }).catch((err)=>{
        //   alert(err);
        // })

        const formData = new FormData();
        formData.append(e.target.name,e.target.files[0]);
        fetch('http://localhost:3000/fileupload', { method: 'POST', body: formData })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{
            console.log(data.uploadPath.path);
            if(iconType === 'main')
                setMainIcon(data.uploadPath.path.substr(7));
            if(iconType === 'header')
                setHeaderIcon(data.uploadPath.path.substr(7));
        })
        .catch((err)=>{
            alert(err.message);
        })
    }
    
    const saveWidgetData = async(event) =>{
        event.preventDefault();
        
        const data = {
            "main_icon": mainIcon,
            "header_logo": headerIcon,
            "placeholderText": placeholderText,
            "header_content": headerContent,
            "user_id":userid,
            "openWidgetByDefault":openWidgetByDefault,
            "input": {
                "background": inputBackground,
                "color": inputTextColor,
                "fontFamily": inputFontFamily,
            },
            "content": {
                "background": contentBackground,
                "color": contentTextColor,
                "fontFamily":contentFontFamily
            },
            "information": {
                "color": informationTextColor,
                "fontFamily": informationFontFamily
            },
            "main_button": {
                "background": buttonBackground
            },
            "header":{
                "background": headerBackground,
                "color": headerContentColor,
                "fontFamily":headerFontFamily
            }
         };

        const response = await fetch(global.API_HOST+"/widget/",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        if(result.msg !== undefined && (result.msg === 'Successfully Updated' || result.msg === 'Successfully Inserted')){
            navigate(`/snippet/`+userid);            
        }else{
            //show error
        }
    }

    return (
        <>
            <div className="container-fluid">
                <Navbar/>
                <div className="row content-section">
                    <Sidebar user={userid}/>
                    <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                        <h5 className="mb-0" ><strong>Virtual Assistance Form</strong></h5>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                
                                <form onSubmit={saveWidgetData} autoComplete="off">
                                    <div className="mb-3 p-3 button-container bg-white border shadow-sm">
                                        <div className="row">
                                            <FileSelector className="col-sm-6" inputLabel="Bot Icon" inputName="main_icon" handleChange={(e)=>handleFileInput(e,e.target.files[0],'main')}/>
                                            <FileSelector className="col-sm-6" inputLabel="Bot Icon" inputName="header_icon" handleChange={(e)=>handleFileInput(e,e.target.files[0],'header')}/>
                                        </div>

                                        <div className="row">
                                            <TextInput className="col-sm-6" inputLabel="Placeholder Text" inputName="placeholderText" inputValue={placeholderText} placeholder="Enter the text for placeholder" handleChange={(e)=> setPlaceholderText(e.target.value)}/>
                                            <TextInput className="col-sm-6" inputLabel="Bot Heading" inputName="header_content" inputValue={headerContent} placeholder="Enter the text for header" handleChange={(e)=> setHeaderContent(e.target.value)}/>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Open Bot By Default</label>
                                                <div className="input-group mb-3">
                                                    <select
                                                    name="openWidgetByDefault"  
                                                    value={openWidgetByDefault} 
                                                    onChange={(e)=>setOpenWidgetByDefault(e.target.value)} 
                                                    className="browser-default custom-select">
                                                        <option value=''>---Select--- </option>
                                                        <option value="true">Active</option>
                                                        <option value="false">In-Active</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <label><b>Input Properties</b></label>
                                        <div className="row">
                                            <ColorPicker className="col-sm-4" inputLabel="Background Color" inputName="inputBackground" inputValue={inputBackground} handleChange={(e)=>setInputBackground(e.target.value)}/>
                                            <ColorPicker className="col-sm-4" inputLabel="Text Color" inputName="inputTextColor" inputValue={inputTextColor} handleChange={(e)=>setInputTextColor(e.target.value)}/>
                                            <FontSelector className="col-sm-4" inputLabel="Font Family" inputName="inputFontFamily" inputValue={inputFontFamily} handleChange={(e)=>setInputFontFamily(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <label><b>Header Properties</b></label>
                                        <div className="row">
                                            <ColorPicker className="col-sm-4" inputLabel="Background Color" inputName="headerBackground" inputValue={headerBackground} handleChange={(e)=>setHeaderBackground(e.target.value)}/>
                                            <ColorPicker className="col-sm-4" inputLabel="Text Color" inputName="headerContentColor" inputValue={headerContentColor} handleChange={(e)=>setHeaderContentColor(e.target.value)}/>
                                            <FontSelector className="col-sm-4" inputLabel="Font Family" inputName="headerFontFamily" inputValue={headerFontFamily} handleChange={(e)=>setHeaderFontFamily(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <label><b>Main Content Properties</b></label>
                                        <div className="row">
                                            <ColorPicker className="col-sm-4" inputLabel="Background Color" inputName="contentBackground" inputValue={contentBackground} handleChange={(e)=>setContentBackground(e.target.value)}/>
                                            <ColorPicker className="col-sm-4" inputLabel="Text Color" inputName="contentTextColor" inputValue={contentTextColor} handleChange={(e)=>setContentTextColor(e.target.value)}/>
                                            <FontSelector className="col-sm-4" inputLabel="Font Family" inputName="contentFontFamily" inputValue={contentFontFamily} handleChange={(e)=>setContentFontFamily(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <label><b>Information Properties</b></label>
                                        <div className="row">
                                            <ColorPicker className="col-sm-6" inputLabel="Text Color" inputName="informationTextColor" inputValue={informationTextColor} handleChange={(e)=>setInformationTextColor(e.target.value)}/>
                                            <FontSelector className="col-sm-6" inputLabel="Font Family" inputName="informationFontFamily" inputValue={informationFontFamily} handleChange={(e)=>setInformationFontFamily(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                                        <label><b>Main Button Properties</b></label>
                                        <div className="row">
                                            <ColorPicker className="col-sm-12" inputLabel="Background Color" inputName="buttonBackground" inputValue={buttonBackground} handleChange={(e)=>setButtonBackground(e.target.value)}/>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="input-group mt-3 mb-3">
                                                    <button name="Submit" className="form-control btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;