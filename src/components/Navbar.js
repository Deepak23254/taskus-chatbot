import Img from '../assets/img/profile.jpg';
import {Link} from 'react-router-dom';
import $ from 'jquery';
const Navbar = () =>{
	
	const toggle_sidebar = (e)=>{
		
		$('#sidebar-toggle-btn').toggleClass('slide-in');
	    $('.sidebar').toggleClass('shrink-sidebar');
	    $('.header-logo').toggleClass('shrink-sidebar');
	    $('.content').toggleClass('expand-content');
	    $('.header-menu').toggleClass('expand-content');
	    
	}
	
	return (
		<>	
	        <div className="row header shadow-sm">
	            
	            
	            <div className="col-sm-3 pl-0 text-center header-logo">
	               <div className="bg-theme mr-3 pt-3 pb-2 mb-0">
	                    <h3 className="logo"><Link to='/' className="logo"><i className="fa fa-rocket"></i><span className="small">Admin</span></Link></h3>
	               </div>
	            </div>
	            
	            <div className="col-sm-9 header-menu pt-2 pb-0">
	                <div className="row">
	                    <div className="col-sm-4 col-8 pl-0">
	                        <span className="menu-icon" onClick={toggle_sidebar}>
	                            <span id="sidebar-toggle-btn"></span>
	                        </span>
	                    </div>
	                    
	                    <div className="col-sm-8 col-4 text-right flex-header-menu justify-content-end">
	                        <div className="mr-4">
	                            <img src={Img} alt="Adam" className="rounded-circle" width="40px" height="40px"/>
	                        </div>
	                    </div> 
	                </div>    
	            </div>
	        </div>
			
		</>
	);
}

export default Navbar;