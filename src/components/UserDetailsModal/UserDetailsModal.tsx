import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { UserDetailsProps } from "../../models/userManagementModels";

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography>
          <strong>First Name:</strong> {user.firstName}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Last Name:</strong> {user.lastName}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Nationality:</strong> {user.nationality}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Phone Number:</strong> {user.phoneNumber}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Last Month's Bill:</strong> ${user.lastMonthBill}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Address:</strong> {user.address}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Services Subscribed:</strong> {user.servicesSubscribed}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Age:</strong> {user.age}
        </Typography>
      </Grid>
      <div className="w-100 d-flex justify-content-end">
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          sx={{
            marginTop: "16px",
          }}
        >
          Cancel
        </Button>
      </div>
    </Grid>
  );
};

export default UserDetails;
