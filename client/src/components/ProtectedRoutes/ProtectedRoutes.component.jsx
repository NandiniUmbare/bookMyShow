import React, { useEffect } from "react";
import "../../App.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {StyledHeader, StyledChildDiv} from './ProtectedRoutes.styles';
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../../api/users";
import { SetUser } from "../../redux/userSlice";
import { message, Layout, Menu } from "antd";
import {ShowLoading, HideLoading} from "../../redux/loaderSlice";

export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getValidUser = async () => {
    try {
      dispatch(ShowLoading()); // loading = true
      const response = await GetCurrentUser();
      console.log(response);
      dispatch(SetUser(response.data));
      dispatch(HideLoading()); // loading = false
    } catch (error) {
      console.log(error);
      message.error("Please login again");
      navigate('/login')
      dispatch(HideLoading()); // loading = false
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  const navItems = [
    { label: "Home", icon: <HomeOutlined onClick={()=>navigate("/")}/>, },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    user && (
      <>
        <Layout>
          <StyledHeader className="justify-content-between">
            <h3 className="text-white m-0">Book My Show</h3>
            <Menu items={navItems} theme="dark" mode="horizontal" />
          </StyledHeader>
          <StyledChildDiv>{children}</StyledChildDiv>
        </Layout>
      </>
    )
  );
};

