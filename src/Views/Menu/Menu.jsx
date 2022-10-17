import React, { useRef, useState, useEffect } from "react";
import './Menu.scss'
import {
    useHistory,
  } from "react-router-dom";
  import ExitToAppIcon from '@material-ui/icons/ExitToApp';
  import ContactsIcon from '@material-ui/icons/Contacts';
  import BugReportIcon from '@material-ui/icons/BugReport';
  import ListIcon from '@material-ui/icons/List';


export const Menu = () => {
    const h =useHistory();
    const logout =()=>{
        localStorage.removeItem('tokenapi');
        h.push("/");
    
      }
    useEffect(() => {
        // settoken = localStorage.getItem('tokenapi'); 
    console.log('ss',localStorage.getItem('tokenapi'));
        if(localStorage.getItem('tokenapi')) {
    
        } else {
          h.replace("/");
    
        }
      }, []);

    return (
        <div>

<div class="container">
	<nav class="menu">
		<a href="" class="menu-item">
<ContactsIcon/>
			<span class="menu-item-label">Contact</span>
		</a>
		<a href="" class="menu-item">
            <BugReportIcon/>
			<span class="menu-item-label">Case</span>
		</a>
		<a href="" class="menu-item">
            <ListIcon/>
			<span class="menu-item-label">Menu-3</span>
		</a>
		<a href="" class="menu-item">
            <ExitToAppIcon onClick={()=>logout()} />
			<span class="menu-item-label" >Logout</span>
		</a>
	</nav>
</div>

        </div>
    )
        



}
