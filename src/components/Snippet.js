import {useState} from 'react'
import { useParams } from "react-router-dom";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const Snippet = () =>{
    let { userid } =  useParams();
    let scriptContent = `
        <div id="custom-chat"></div>    
        <script>
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = '/tag/js?id=${userid}';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'chatbot'));
        </script>`;

        let [scriptData] = useState(scriptContent);
        let [showMessage,setShowMessage] = useState(false);
      const copyText = () =>{
        navigator.clipboard.writeText(scriptData);
        
        setShowMessage(true);
        
        setTimeout(() => {
            setShowMessage(false);
        },5000);
      };

    return (
        <>  
            <div className="container-fluid">
                <Navbar/>
                <div className="row content-section">
                    <Sidebar user={userid}/>
                    <div className="col-sm-9 col-xs-12 content pt-3 pl-0">
                        <h5 className="mb-0" ><strong>Virtual Assistance Script</strong></h5>
                        <div className="row mt-3">
                            <div className="col-sm-12">
                                <div className="mb-3 p-5 bg-white border shadow-sm" style={{borderRadius:"10px"}}>
                                    <div className="row">
                                        <h1 className="mb-0">Copy and paste the code given below</h1>
                                        <div style={{width: "100%",margin: "20px 20px"}}>
                                            <code id="CopyTextToClipboard">
                                                {scriptData}
                                            </code>
                                        </div>
                                        {
                                            showMessage
                                            ?
                                                <div className='copy-clipboard-text'>
                                                    <p>Copied to clipboard</p>
                                                </div>
                                            :null
                                        }
                                        <div>
                                            <button onClick={(e)=>copyText()}>Copy Text</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        
        </>
    );
}

export default Snippet;