"use client";

import React, { cache, useEffect, useState } from "react";
import { Button, Panel, Input } from "rsuite";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { headers } from "next/headers";

type Props = { params: { userId: string } };

// Validation schema using Yup
const validationSchema = Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      alternate_email: Yup.string().email("Invalid alternate email address"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
      age: Yup.number().required("Age is required").min(18, "You must be at least 18 years old"),
});

const AddUserForm = ({ params }: Props) => {



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
                        console.log(values);

                        const body = JSON.stringify(values);
                        let response;
                        if (!params.userId) {
                              response = await fetch("/api/users", {
                                    method: "POST",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                                    body
                              });
                        }
                        else {
                              response = await fetch(`/api/users/${params.userId}`, {
                                    method: "PATCH",
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                                    body
                              });

                        }

                        if (!response.ok) {
                              throw new Error("Failed to add user");
                        }

                        const data = await response.json();
                        console.log(data);
                        // Optionally, you can redirect or refresh the page to see the new user
                  } catch (error) {
                        console.error("Error adding user:", error);
                  } finally {
                        setSubmitting(false);
                  }
            },
      });

      const fetchUser = async () => {
            try {
                  const response = await fetch(`/api/users/${params.userId}`, {
                        cache: "no-cache"
                  });
                  if (!response.ok) {
                        throw new Error("Failed to fetch user");
                  }
                  const data = await response.json();
                  console.log(data);
                  formik.setValues(data);
                  // Optionally, you can update the state with the fetched user data
            } catch (error) {
                  console.error("Error fetching user:", error);
            }
      };

      useEffect(() => {
            if (params.userId) {
                  fetchUser();
            }
      }, [params.userId]);

      return (
            <Panel header="Add New User" bordered className="shadow-lg rounded-lg">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-6">
                        <div>
                              <Input
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formik.values.first_name}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.first_name && formik.errors.first_name && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.first_name}</div>
                              )}
                        </div>
                        <div>
                              <Input
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formik.values.last_name}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.last_name && formik.errors.last_name && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.last_name}</div>
                              )}
                        </div>
                        <div>
                              <Input
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                              )}
                        </div>
                        <div>
                              <Input
                                    name="alternate_email"
                                    placeholder="Alternate Email"
                                    value={formik.values.alternate_email}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.alternate_email && formik.errors.alternate_email && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.alternate_email}</div>
                              )}
                        </div>
                        <div>
                              <Input
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
                              )}
                        </div>
                        <div>
                              <Input
                                    name="age"
                                    placeholder="Age"
                                    value={formik.values.age}
                                    onChange={(value: any, event: any) => {
                                          formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formik.touched.age && formik.errors.age && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors.age}</div>
                              )}
                        </div>
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
