
export interface FormFieldModel {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    min?: number;
    max?: number;
    options?: string[];
    minLength?: number;
    maxLength?: number;
  }
  
  export interface FormConfigModel {
    fields: FormFieldModel[];
  }