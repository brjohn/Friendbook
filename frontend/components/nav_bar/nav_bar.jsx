import React from 'react';
import AccountDropdown from './account-dropdown';
import { Link } from 'react-router-dom';
import RequestsDropdownContainer from './requests_dropdown_container';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.thumbnail = this.thumbnail.bind(this);
        this.requestCount = this.requestCount.bind(this);
    }
    
    componentDidMount(){
        this.props.fetchUsers()
        this.props.fetchUser(this.props.fullUser.id)
    }

    thumbnail(){
        if (this.props.fullUser.profilePicUrl){
            return <img src={this.props.fullUser.profilePicUrl} className="navbar-thumbnail"/>
        } else {
            return <i className="fas fa-user-circle"></i>
        }
    }
    requestCount(){
        // fetchUser(this.props.fullUser.id)
        if (this.props.fullUser.requests_received){
            let count = Object.keys(this.props.fullUser.requests_received).length 
            return <div className="request-count">{count}</div>
        } else {
            return null;
        }
    }
    render(){
        return (
        <header className="main-nav">
            <nav className="left-nav">
                <ul>
                    <li id="fb-icon-button">
                        <i className="fab fa-facebook"></i>
                        
                    </li>
                    <li id="search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search Friendbook"/>
                    </li>
                    <li >
                        <Link to="/" id="home-button"><i className="fas fa-home"></i></Link>    
                    </li>

                </ul>
            </nav>
            <nav className="right-nav">
                <ul>
                    <li >
                        <Link to={`/users/${this.props.fullUser.id}`} className="user-profile-button">
                            {this.thumbnail()}
                            <div>{this.props.fullUser.first_name}</div> 
                        </Link>
                    </li>
                    <li className="notifications">
                        <i id="bell" className="fas fa-bell"></i>
                        {this.requestCount()}
                        <RequestsDropdownContainer />
                    </li>
                    <li id="account-dropdown-btn">
                        <i id="dd-icon" className="fas fa-chevron-circle-down"></i>
                        <AccountDropdown fullUser={this.props.fullUser} logout={this.props.logout}/>

                    </li>
                </ul>
            </nav>

        </header>
        )
    }
    
    
}

export default NavBar;