import { useState } from "react";
import { layoutWrapperModel } from "../../../models/layoutModels";
import Navbar from "../Navbar/Navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TocIcon from "@mui/icons-material/Toc";
import { Box, styled } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const LayoutWrapper: React.FC<layoutWrapperModel> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      link: "/",
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      title: "User Management",
      link: "/user-management",
      icon: <ManageAccountsIcon />,
    },
    {
      id: 3,
      title: "Form Page",
      link: "/form-page",
      icon: <TocIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        menuItems={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: `calc(100% - ${activeMenu ? "240px" : "64px"})`,
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default LayoutWrapper;
