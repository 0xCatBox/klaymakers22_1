import React from "react";
import { ProSidebar, Menu } from 'react-pro-sidebar';
import { SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { MdOutlineSpaceDashboard, MdModeEditOutline, MdAddToPhotos } from 'react-icons/md';
import { FaGithub, FaEdit } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { NavLink } from "react-router-dom";
import D_Adicon from "../../image/D-Ad.png";
const SideNavigationBar = () => {
    return (
        <ProSidebar style={{ height: "100%", minWidth: "200px", width: "200px", position: "fixed", backgroundColor: "#2C3335"}}>
            <SidebarHeader>
                <Menu iconShape="square">
                    <img className="D-Ad-icon" src = {D_Adicon} style={{marginLeft: "20px",width: "150px"}}></img>
                </Menu>
            </SidebarHeader>

            <SidebarContent>
                <NavLink to="/" className={({ isActive }) => (isActive ? "highlight-on" : "highlight-off")}>
                    <div className="highlight-icon"><MdOutlineSpaceDashboard style={{fontSize: "30px" }}/></div>
                    <p className="highlight-text">Dashboard</p>
                </NavLink>
                <NavLink to="/makeads" className={({ isActive }) => (isActive ? "highlight-on" : "highlight-off")}>
                    <div className="highlight-icon"><MdAddToPhotos style={{ fontSize: "20px"}}/></div>
                    <p className="highlight-text">Make Ads</p>
                </NavLink>
                <NavLink to="/editinfo" className={({ isActive }) => (isActive ? "highlight-on" : "highlight-off")}>
                    <div className="highlight-icon"><MdModeEditOutline style={{ fontSize: "20px" }}/></div>
                    <p className="highlight-text">Edit Info</p>
                </NavLink>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: "center" }}>
                <div className="sidebar-btn-wrapper" style={{ padding: '20px 24px' }}>
                    <a className="sidebar-btn" href="https://unchain.on.fleek.co/">
                        <TbWorld />
                    </a>
                    <a className="sidebar-btn" href="https://unchain.on.fleek.co/">
                        <FaGithub />
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    )
}

export default SideNavigationBar;