import React from "react";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import formConfig from "../assets/dummyData/formConfig.json";
import { FormConfigModel } from "../models/dynamicFormModels";
import initialValues from "../assets/dummyData/formInitialValues.json";

const FormPage: React.FC = () => {
  return (
    <DynamicForm
      config={formConfig as FormConfigModel}
      initialValues={initialValues}
    />
  );
};

export default FormPage;
