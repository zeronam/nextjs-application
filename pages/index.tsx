import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../services/login';

const Login = () => {
  const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    console.log(errors);

    // const onSubmit = (data: any) => {
    //   return userService.login(data.email, data.password)
    //   .then(() => {
    //   })
    // }

    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
             Sign in
          </h1>
          <form className="mt-6">
              <div className="mb-2">
                  <label
                      className="block text-sm font-semibold text-gray-800"
                  >Email
                  </label>
                  <input
                      type="text"
                      {...register('email')}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div>
              <div className="mb-2">
                  <label
                      className="block text-sm font-semibold text-gray-800"
                  >
                      Password
                  </label>
                  <input
                      type="password"
                      {...register('password')}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
         
              </div>
              <a
                  href="#"
                  className="text-xs text-purple-600 hover:underline"
              >
                  Forget Password?
              </a>
              <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      Login
                  </button>
  
              </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
              Do not have an account?
              <a
                  href="#"
                  className="font-medium text-purple-600 hover:underline"
              >
                  Sign up
              </a>
          </p>
      </div>
  </div>
    );
}

export default Login
