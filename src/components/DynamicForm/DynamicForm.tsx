import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { FormConfigModel } from "../../models/dynamicFormModels";

const DynamicForm: React.FC<{
  config: FormConfigModel;
  initialValues: Record<string, any>;
}> = ({ config, initialValues }) => {
  const formInitialValues = config.fields.reduce((formValues, field) => {
    if (field.type === "multiselect") {
      formValues[field.name] = initialValues[field.name] || [];
    } else if (field.type === "checkbox") {
      formValues[field.name] = initialValues[field.name] || false;
    } else {
      formValues[field.name] = initialValues[field.name] || "";
    }
    return formValues;
  }, {} as Record<string, any>);

  let validationSchema = Yup.object().shape(
    config.fields.reduce((fieldValidators, field) => {
      let validator;

      switch (field.type) {
        case "email":
          validator = Yup.string().email(`Invalid email address`);
          break;
        case "password":
          validator = Yup.string().min(
            field.minLength || 6,
            `Password must be at least ${field.minLength || 6} characters`
          );
          break;
        case "number":
          validator = Yup.number()
            .typeError(`${field.label} must be a number`)
            .min(field.min || 0, `${field.label} must be at least ${field.min}`)
            .max(
              field.max || Infinity,
              `${field.label} must be at most ${field.max}`
            );
          break;
        case "date":
          validator = Yup.date();
          break;
        case "checkbox":
          validator = Yup.boolean();
          break;
        case "multiselect":
          validator = Yup.array().of(Yup.string());
          break;
        case "textarea":
        case "text":
          validator = Yup.string();
          if (field.maxLength) {
            validator = validator.max(
              field.maxLength,
              `${field.label} must be at most ${field.maxLength} characters`
            );
          }
          break;
        default:
          validator = Yup.string();
      }

      if (field.required) {
        validator = validator.required(`${field.label} is required`);
      }

      fieldValidators[field.name] = validator;
      return fieldValidators;
    }, {} as Record<string, Yup.AnySchema>)
  );

  // Handle password confirmation separately
  if (config.fields.some((field) => field.name === "confirmPassword")) {
    validationSchema = validationSchema.shape({
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

  const handleSubmit = (
    values: Record<string, any>,
    { setSubmitting }: any
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form className="p-4 d-md-flex d-block flex-wrap justify-content-between">
          {config.fields.map((field) => (
            <Box key={field.name} mb={2} sx={{ flex: "0 0 49%" }}>
              {field.type === "select" && (
                <FormControl
                  fullWidth
                  error={touched[field.name] && !!errors[field.name]}
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Field as={Select} name={field.name} label={field.label}>
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name={field.name} component={Typography} />
                </FormControl>
              )}
              {field.type === "multiselect" && (
                <FormControl
                  fullWidth
                  error={touched[field.name] && !!errors[field.name]}
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    multiple
                    name={field.name}
                    value={values[field.name] || []}
                    onChange={(event) =>
                      setFieldValue(field.name, event.target.value)
                    }
                    input={<OutlinedInput label={field.label} />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name={field.name} component={Typography} />
                </FormControl>
              )}
              {field.type === "checkbox" && (
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name={field.name}
                      checked={values[field.name]}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(field.name, event.target.checked)
                      }
                    />
                  }
                  label={field.label}
                />
              )}
              {field.type !== "select" &&
                field.type !== "multiselect" &&
                field.type !== "checkbox" && (
                  <Field
                    as={TextField}
                    fullWidth
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    error={touched[field.name] && !!errors[field.name]}
                    helperText={<ErrorMessage name={field.name} />}
                    multiline={field.type === "textarea"}
                    rows={field.type === "textarea" ? 4 : 1}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
            </Box>
          ))}
          <Box
            sx={{
              flex: "0 0 100%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
