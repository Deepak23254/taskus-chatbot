import { useEffect, useRef, useState } from 'react';
import send from '../assets/svg/send.svg';
import cancelIcon from '../assets/svg/cancel.svg';
import loaderIcon from '../assets/svg/loader.svg';
import {global} from '../config/global';
const Chatwidget = (props) =>{
	const obj = [{
			message:"Hello"
	  	},
	  	{
			message:"How I can help you ?"
	  	}];

	const placeholderMessage = 'Bot is typing...';
	const [show,setShow] = props.openFunction; 
	
	let [token] = useState(props.token);  
	let [content,setContent] = useState(obj) ;
	var [messageValue,setmessageValue] = useState("") ;
	let [loader,setLoader] = useState(false);
	let [placeholerText,setPlaceholder] = useState(props.designdata.properties.placeholderText);
	const [borderStyle,setBorderStyle] = useState({});
	
	const sendMessage = async(event) =>{
		event.preventDefault();

		var name = event.target.querySelector('.chatbox-input').value;
		console.log(name);
		if (name===null || name===""){
			setBorderStyle({borderTop:'2px solid red'});
		    return false;  
	    }
	
		var userInput = [{
		  message:messageValue
		}];
		let a = [...content,...userInput];
		
		setContent(a);
		setmessageValue('');
		setLoader(true);
		setPlaceholder(placeholderMessage);

		let data = await getData(messageValue);
		setTimeout(() => {

			let b = [...a,...[data]];
			setLoader(false);
			setContent(b);
			setPlaceholder(props.designdata.properties.placeholderText);
			setBorderStyle({borderTop:'2px solid red'});
		},5000);
	};

	const getData = async(messageValue) => {
		const response = await fetch(global.API_HOST+"/chat/",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({messageValue})
        });

		let result = response.json();

        return result;
	};

	const handleInput = (e)=>{
		
		setBorderStyle({borderTop:'2px solid red'});
		var ignoreClickOnMeElement = e.target;
		document.addEventListener('click', function(event) {
	      	var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
	      	if (!isClickInsideElement) {
	          	setBorderStyle({});
	      	}
  		});
	}

	const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
 
	useEffect(() => {
        scrollToBottom()
  	}, [content]);

	return (
		<>
			<div>
				<div className="chat-header" style={props.designdata.properties.header}>
					<img className="chat-header-image" 
						src={global.API_HOST+'/'+props.designdata.properties.header_logo} 
						alt="logo" 
						width="10" 
						height="10" 
					/>
					<p className="chat-header-content" 
						style={{color:props.designdata.properties.header.color}}>
							{props.designdata.properties.header_content}
					</p>
					<button className="chat-header-button" onClick={()=>setShow(!show)}><img src={cancelIcon} alt="cancel" /></button>
				</div>

				<div className="chatbox">
					<div className="scroll">
						<p className="chatbot-content" style={props.designdata.properties.information}>HI your connecting as :{token}</p>
						<div className="user-content">
						{
							content.map((data,key) => (
								<div className='content-design' key={key} style={data.type}>
									<div className='main-content' ref={messagesEndRef} style={props.designdata.properties.content}>{data.message}</div>
									{
										(data.options !== undefined)
										?
										data.options.map((optionItem, i) => {
										return (
											<div key={i} ref={messagesEndRef}>
												<a href={optionItem.url} target="_blank" without rel="noreferrer"><div className='replied-content' style={props.designdata.properties.content}>{optionItem.content}</div></a>	
											</div>
										)
										})
										:
										null
									}
								</div>
							))
						}
						</div>
						<div>
		                {  loader
		                    ?
		                    <div className="loading-dots" ref={messagesEndRef}>
		                      <span className="dot one">
		                        <img src={loaderIcon} alt="loader" />
		                      </span> 
		                      <span className="dot two">
		                        <img src={loaderIcon} alt="loader"/>
		                      </span> 
		                      <span className="dot three">
		                        <img src={loaderIcon} alt="loader"/>
		                      </span>
		                    </div>
		                    :
		                    null
		                }
		              </div>
					</div>
					
						
						
					<form onSubmit={sendMessage}>
						<div className="input-group chatbox-layer" style={borderStyle}>
							<input className="chatbox-input form-control" name="username" 
								value={messageValue} 
								placeholder={placeholerText} 
								onChange={(e)=> setmessageValue(e.target.value)}
								onClick={handleInput} 
								style={props.designdata.properties.input} autoComplete="off" /> 
							<button  className = "chatbox-send-button" name='Submit' style={{background:props.designdata.properties.input.background}}>
								<img src={send} 
									alt="chat box icon btn" 
									width="25" 
									height="25" 
									style={{marginBottom:"-7px"}}
								/>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Chatwidget;