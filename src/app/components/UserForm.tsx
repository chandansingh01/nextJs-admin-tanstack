"use client";

import FormInput from "@/app/components/Form/FormInput";
import {
    useAddUserData,
    useFetchUserDetails,
    useUpdateUserData,
} from "@/app/hooks/UseUserData";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Loader, Panel } from "rsuite";
import * as Yup from "yup";

type Props = { params: { userId: string }, onSucess:Function };

// Validation schema usjiking Yup
const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  alternate_email: Yup.string().email("Invalid alternate email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  age: Yup.number()
    .required("Age is required")
    .min(18, "You must be at least 18 years old"),
});

const AddUserForm = ({ params,onSucess }: Props) => {
  const { mutate: addUser } = useAddUserData();
  const { mutate: updateUser } = useUpdateUserData();
  const router = useRouter();



  let user: any;
  let isLoading;
  if (params.userId!=="null") {
    console.log(params);
    
    const response = useFetchUserDetails(params.userId);
    user = response.data;
    isLoading = response.isLoading;
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      alternate_email: "",
      password: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(params);
        
        if (params.userId=="null"||!params.userId) {
            await addUser(values);
        } else {
            await updateUser({...values,id:params.userId});
        }
        onSucess()
        
      } catch (error) {
        console.error("Error adding user:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  
  useEffect(() => {
    if (user) {
      formik.setValues(user);
    }
  }, [user]);

  return (
    <Panel header="Add New User" bordered className="shadow-lg rounded-lg">
      {params.userId && isLoading && <Loader center />}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-6">
        <FormInput name="first_name" placeholder="First Name" formik={formik} />
        <FormInput name="last_name" placeholder="Last Name" formik={formik} />
        <FormInput name="email" placeholder="Email" formik={formik} />
        <FormInput
          name="alternate_email"
          placeholder="Alternate Email"
          formik={formik}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          formik={formik}
        />
        <FormInput name="age" placeholder="Age" formik={formik} />

        <Button
          type="submit"
          appearance="primary"
          disabled={formik.isSubmitting}
          className="w-full max-w-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          {formik.isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </form>
    </Panel>
  );
};

export default AddUserForm;
