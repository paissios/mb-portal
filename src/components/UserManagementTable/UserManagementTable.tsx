import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserFormModal from "../UserFormModal/UserFormModal";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal";
import { UserModel } from "../../models/userManagementModels";
import usersInfo from "../../assets/dummyData/dummyUsers.json";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>(
    usersInfo as unknown as UserModel[]
  );
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 160 },
    { field: "lastName", headerName: "Last Name", width: 160 },
    { field: "nationality", headerName: "Nationality", width: 160 },
    { field: "phoneNumber", headerName: "Phone Number", width: 160 },
    {
      field: "lastMonthBill",
      headerName: "Last Month's Bill",
      width: 160,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      width: 250,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            color="secondary"
            variant="text"
          >
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </Button>
          <Button onClick={() => handleViewDetails(params.row)} color="info">
            <VisibilityIcon />
          </Button>
        </>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user: UserModel) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleViewDetails = (user: UserModel) => {
    setSelectedUser(user);
    setOpenDetails(true);
  };

  const handleSave = (user: UserModel) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now().toString() }]);
    }
    setOpenForm(false);
  };

  return (
    <div style={{ height: 500, width: "100%" }} className="p-3">
      <Button onClick={handleAdd}>Add User</Button>
      <DataGrid
        rows={users}
        columns={columns}
        onPaginationModelChange={(params) => {
          setPageSize(params.pageSize);
          setPage(params.page);
        }}
        pageSizeOptions={[10, 20, 30]}
        paginationModel={{ pageSize: pageSize, page: page }}
      />
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <UserFormModal
            user={selectedUser}
            onSave={handleSave}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <UserDetailsModal
              user={selectedUser}
              onClose={() => setOpenDetails(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
