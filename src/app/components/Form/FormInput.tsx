import React from 'react';
import { Input } from 'rsuite';
import { FormikTouched, FormikErrors } from 'formik';

interface FormInputProps {
  name: string;
  type?: string;
  placeholder: string;
  formik: {
    values: { [key: string]: any };
    handleChange: (event: React.ChangeEvent<any>) => void;
    handleBlur: (event: React.FocusEvent<any>) => void;
    touched: FormikTouched<{ [key: string]: any }>;
    errors: FormikErrors<{ [key: string]: any }>;
  };
}

const FormInput: React.FC<FormInputProps> = ({ name, type = 'text', placeholder, formik }) => {
  return (
    <div>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={(value: any, event: React.ChangeEvent<HTMLInputElement>) => {
          formik.handleChange(event);
        }}
        onBlur={formik.handleBlur}
        className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-600 text-sm mt-1">
          {typeof formik.errors[name] === 'string' ? formik.errors[name] : Array.isArray(formik.errors[name]) ? formik.errors[name].join(', ') : ''}
        </div>
      )}
    </div>
  );
};

export default FormInput;