
import {useState,useEffect} from 'react';
import Chatwidget from './Chatwidget';
import {global} from '../config/global'
// import useWidget from '../services/widgetApi';
const Chatbutton = ()=>{

    const src = window.location.href;
	var url = new URL(src);
	var id = url.searchParams.get("id");

   
	let [show,setShow] = useState(false); //default hidden
	let [design,setDesign] = useState("");
    let [userid] = useState(id);

    // const [design] = useWidget(userid);
    // console.log('testing');
    // console.log(result);
    // if(result){
    //     setDesign(result.data);
    //     setShow(result.data.properties.openWidgetByDefault);
    // }
    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(global.API_HOST+"/widget/"+userid);
            
            let result = await response.json();
            setDesign(result.data);
            setShow(result.data.properties.openWidgetByDefault);
        }
		fetchData();
	},[userid]);


    return (
		<>
        	{
                design 
                ?
                <div>
                    {   
                    show ?
                        <Chatwidget designdata={design}  openFunction={[show,setShow]}/>
                    : 
                        <button className="pulse" onClick={()=>setShow(!show)} style={design.properties.main_button}>
                            <img className="button-image" 
                                src={global.API_HOST+'/'+design.properties.main_icon} 
                                alt="logo" 
                                width="10" 
                                height="10" 
                            />
                        </button>
                    }
                </div>
                :
                <div>
                    <h1>User is not assigned with design</h1>
                </div>
            }
		</>
	);

}

export default Chatbutton;