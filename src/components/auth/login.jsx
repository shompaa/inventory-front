import { useForm } from "react-hook-form";
import { Input, Button, Alert } from "../ui/shared";
import { validateAuthForm } from "./utils/validations";
import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      dispatch(checkingCredentials());
      const resp = await loginData(data);
      dispatch(login(resp));
      navigate("/dashboard");
    } catch ({ response: { status } }) {
      setErrorMessage(errorValidation[status]);
    }
  };

  useEffect(() => {
    errors.email && setErrorMessage(errors.email.message);
    errors.password && setErrorMessage(errors.password.message);

    return () => {
      setErrorMessage(null);
      setIsLoading(false);
    };
  }, [errors]);

  return (
    <section className=" bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
              </div>
              <div className="flex items-center w-full">
                {errorMessage && <Alert variant="danger" text={errorMessage} />}
              </div>
              <Button
                variant="secondary"
                type="submit"
                isLoading={isLoading}
                fullWidth
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
