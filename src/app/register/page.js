"use client"
import React from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation' // Changed from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik' // Fixed: lowercase 'formik'
import * as Yup from 'yup'

// Validation schema
const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastname: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  username: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

function Page() {
  const router = useRouter() // Moved to component level

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          password: values.password,
          created_at: new Date().toISOString()
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      // Success - axios doesn't have .ok property
      toast.success('Account created successfully!')
      setTimeout(() => {
        router.push('/translate')
      }, 1000)

    } catch (error) {
      console.error("Error:", error)
      
      if (error.response) {
        if (error.response.status === 403) {
          toast.error('User already exists!')
          setErrors({ username: 'This email is already registered' })
        } else {
          toast.error(error.response.data.detail || 'Registration failed!')
        }
      } else {
        toast.error('Network error. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex h-[700px] w-full bg-white">
        <div className="w-full hidden md:inline-block">
          <img 
            className="h-full object-cover" 
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" 
            alt="leftSideImage"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              username: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="md:w-96 w-80 flex flex-col items-center justify-center">
                <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
                <p className="text-sm text-gray-500/90 m-3">Welcome to our family!</p>
                
                <div className="flex mb-6 gap-4 w-full">
                  {/* First Name */}
                  <div className="w-full">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
                      </svg>
                      <Field
                        name="firstname"
                        type="text"
                        placeholder="First name"
                        className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                      />
                    </div>
                    <ErrorMessage name="firstname" component="div" className="text-red-500 text-xs mt-1 pl-4" />
                  </div>

                  {/* Last Name */}
                  <div className="w-full">
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
                      </svg>
                      <Field
                        name="lastname"
                        type="text"
                        placeholder="Last name"
                        className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                      />
                    </div>
                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs mt-1 pl-4" />
                  </div>
                </div>

                {/* Email */}
                <div className="w-full mb-6">
                  <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                    </svg>
                    <Field
                      name="username"
                      type="email"
                      placeholder="Email id"
                      className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    />
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1 pl-4" />
                </div>

                {/* Password */}
                <div className="w-full">
                  <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                    </svg>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 pl-4" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full h-11 rounded-full text-white bg-[#4f39f6] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating account...' : 'Register'}
                </button>
                
                <p className="text-gray-500/90 text-sm mt-4">
                  Already have an account?{' '}
                  <a className="text-indigo-400 hover:underline" href="/login">
                    Sign in
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default Page