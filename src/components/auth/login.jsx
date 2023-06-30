import { useForm } from "react-hook-form";
import { Input, Button } from "../ui/shared";
import { validateAuthForm } from "./utils/validations";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkingCredentials, login } from "../../store";
import { useLogin } from "./hooks/use-login";
import { errorValidation } from "./utils/errors";

export const Login = () => {
  const schema = validateAuthForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: loginData } = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      dispatch(checkingCredentials());
      const resp = await loginData(data);
      dispatch(login(resp));
      navigate("/dashboard");
    } catch ({ response: { status } }) {
      setErrorMessage(errorValidation[status]);
    }
  };

  return (
    <section className=" bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold  text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a> */}
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Iniciar sesión
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Input
                  register={register}
                  schema={schema}
                  name="email"
                  label="Correo"
                  placeholder="Ingrese correo"
                  required
                  variant="dark"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Input
                  register={register}
                  schema={schema}
                  type="password"
                  name="password"
                  label="Contraseña"
                  placeholder="************"
                  required
                  variant="dark"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                {errorMessage && (
                  <div
                    className="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400"
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border  rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className=" text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Forgot password?
                </a> */}
              </div>
              <Button variant="secondary" type="submit" fullWidth>
                Iniciar sesion
              </Button>
              {/* <p className="text-sm font-light  text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
