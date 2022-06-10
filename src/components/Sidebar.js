import {Link} from 'react-router-dom';

const Sidebar = (props) =>{
    
	return (
		<>	
	        <div className="col-sm-3 col-xs-6 sidebar pl-0">
                <div className="inner-sidebar mr-3">
                    <div className="sidebar-menu-container">
                        <ul className="sidebar-menu mb-4">
                            <li className="parent">
                                <Link to={'/dashboard/'+props.user}><i className="fa fa-dashboard mr-3"> </i>
                                    <span className="none">Dashboard </span></Link>
                                <Link to={'/snippet/'+props.user}><i className="fa fa-pencil-square mr-3"> </i>
                                    <span className="none">Snippet </span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
		</>
	);
}

export default Sidebar;