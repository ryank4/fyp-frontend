//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarContent,
    SidebarHeader,
} from "react-pro-sidebar";

//import icons from react aws icons
import EC2Icon from 'react-aws-icons/dist/aws/logo/EC2';
import S3Icon from 'react-aws-icons/dist/aws/logo/S3';
import RDSIcon from 'react-aws-icons/dist/aws/logo/RDS';
import ELBIcon from 'react-aws-icons/dist/aws/logo/ELB';
import CloudWatchIcon from 'react-aws-icons/dist/aws/logo/CloudWatch';


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)
    const [isActive, setIsActive] = useState("");

    const isActiveHandler = (value) => {
        setIsActive(value);
    };

    const isNotActiveHandler = () => {
        setIsActive("");
    };

    return (
        <>
            <div id="sidebar">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            <p>Cloud Services</p>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem
                                onMouseEnter={isActiveHandler.bind(null, "EC2")}
                                active={isActive === "EC2"}
                                onMouseLeave={isNotActiveHandler}
                                icon={<EC2Icon />}>
                                EC2
                                <Link to="/ec2" id="ec2Link"></Link>
                            </MenuItem>
                            <MenuItem
                                onMouseEnter={isActiveHandler.bind(null, "S3")}
                                active={isActive === "S3"}
                                onMouseLeave={isNotActiveHandler}
                                icon={<S3Icon />}>
                                S3
                                <Link to="/s3" id="s3Link"></Link>
                            </MenuItem>
                            <MenuItem
                                onMouseEnter={isActiveHandler.bind(null, "ELB")}
                                active={isActive === "ELB"}
                                onMouseLeave={isNotActiveHandler}
                                icon={<ELBIcon />}>
                                ELB
                                <Link to="/elb" id="elbLink"></Link>
                            </MenuItem>
                            <MenuItem
                                onMouseEnter={isActiveHandler.bind(null, "RDS")}
                                active={isActive === "RDS"}
                                onMouseLeave={isNotActiveHandler}
                                icon={<RDSIcon />}>
                                RDS
                                <Link to="/rds" id="rdsLink"></Link>
                            </MenuItem>
                            <MenuItem
                                onMouseEnter={isActiveHandler.bind(null, "CloudWatch")}
                                active={isActive === "CloudWatch"}
                                onMouseLeave={isNotActiveHandler}
                                icon={<CloudWatchIcon />}>
                                CloudWatch
                                <Link to="/cloudwatch" id="cloudwatchLink"></Link>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
            </div>
        </>
    );
};

export default Sidebar;