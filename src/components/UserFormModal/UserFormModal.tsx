import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid } from "@mui/material";
import { UserModel } from "../../models/userManagementModels";
import { UserFormProps } from "../../models/userManagementModels";

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  nationality: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  lastMonthBill: Yup.number().required("Required").positive("Must be positive"),
  address: Yup.string().required("Required"),
  servicesSubscribed: Yup.number()
    .required("Required")
    .positive("Must be positive")
    .integer("Must be an integer"),
  age: Yup.number()
    .required("Required")
    .positive("Must be positive")
    .integer("Must be an integer"),
});

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const initialValues: UserModel = user || {
    id: "",
    firstName: "",
    lastName: "",
    nationality: "",
    phoneNumber: "",
    lastMonthBill: "0",
    address: "",
    servicesSubscribed: 0,
    age: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="pt-2">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="firstName"
                label="First Name"
                error={touched.firstName && errors.firstName}
                helperText={touched.firstName && errors.firstName}
                data-testid="firstName"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="lastName"
                label="Last Name"
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}
                data-testid="lastName"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="nationality"
                label="Nationality"
                error={touched.nationality && errors.nationality}
                helperText={touched.nationality && errors.nationality}
                data-testid="nationality"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                error={touched.phoneNumber && errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                data-testid="phoneNumber"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="lastMonthBill"
                label="Last Month's Bill"
                type="number"
                error={touched.lastMonthBill && errors.lastMonthBill}
                helperText={touched.lastMonthBill && errors.lastMonthBill}
                data-testid="lastMonthBill"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="address"
                label="Address"
                error={touched.address && errors.address}
                helperText={touched.address && errors.address}
                data-testid="address"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="servicesSubscribed"
                label="Services Subscribed"
                type="number"
                error={touched.servicesSubscribed && errors.servicesSubscribed}
                helperText={
                  touched.servicesSubscribed && errors.servicesSubscribed
                }
                data-testid="servicesSubscribed"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                fullWidth
                name="age"
                label="Age"
                type="number"
                error={touched.age && errors.age}
                helperText={touched.age && errors.age}
                data-testid="age"
              />
            </Grid>
          </Grid>
          <div className="w-100 d-flex justify-content-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: "16px",
                marginRight: "8px",
              }}
            >
              Save
            </Button>
            <Button
              onClick={onCancel}
              variant="contained"
              color="secondary"
              sx={{
                marginTop: "16px",
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
