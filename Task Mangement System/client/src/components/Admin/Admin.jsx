import React, { useState } from "react";
import "./Admin.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { PiUsersThreeBold } from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";
import { MdTask } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Button, Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setAdminStatus,
  setUserDetails,
  setLoginStatus,
} from "../../actions/actions";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogin = useSelector((state) => state.isLogin);
  console.log(isAdmin);
  console.log(isLogin);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const Logout = async () => {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("userInfo");
    toast.success("Logout successful");
    dispatch(setAdminStatus(false));
    dispatch(setLoginStatus(false));
    dispatch(setUserDetails({}));
    navigate("/");
    window.location.href = "/login"; // Replace "/login" with your actual login page URL
  };

  if (isAdmin) {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ paddingTop: "10vh", backgroundColor: "#9AD0C2" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ backgroundColor: "#9AD0C2" }}
            className="sidebar-menu"
          >
            <Menu.Item
              key="1"
              icon={<PiUsersThreeBold style={{ fontSize: "25px" }} />}
            >
              <Link to="/admin/all-users">Users</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<TiUserAdd style={{ fontSize: "25px" }} />}
            >
              <Link to="/admin/add-user">Add Users</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<MdTask style={{ fontSize: "25px" }} />}>
              <Link to="/admin/all-tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<MdAddTask style={{ fontSize: "25px" }} />}
            >
              <Link to="/admin/add-task">Add Tasks</Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<IoIosLogOut style={{ fontSize: "25px" }} />}
            >
              <span onClick={Logout}>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header
            style={{
              padding: "0 4vw 0 0",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#9AD0C2",
              color: "white",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />
            <h1 className="admin-nav-emp" style={{ textAlign: "center" }}>
              Task Management System
            </h1>
          </Header>
          <Content
            style={{
              // padding: 24,
              minHeight: "91vh",
              color: "#fff",
              border: "1px solid #ECF4D6",
            }}
            className="admin-content-main-container"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    navigate("/");
  }
};

export default Admin;
