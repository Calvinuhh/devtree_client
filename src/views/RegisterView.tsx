import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../interfaces/FormData";
import axios, { isAxiosError } from "axios";

const { VITE_SERVER_URL } = import.meta.env;

const RegisterView = () => {
  const intialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: intialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const response = await axios.post(
        `${VITE_SERVER_URL}/api/auth/register`,
        formData
      );

      const { data } = response;

      console.log(data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <>
      <h1 className=" text-4xl text-white font-bold">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-16 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: "Nombre es obligatorio",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message:
                  "El nombre debe contener solo letras. Asegúrate de no incluir números o símbolos.",
              },

              minLength: {
                value: 2,
                message: "El nombre debe tener mas de 1 caracter",
              },
              maxLength: {
                value: 30,
                message: "El nombre no puede sobrepasar 30 caracteres",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "Email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email no valido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Nickname
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: "Nickname es obligatorio",

              minLength: {
                value: 2,
                message: "El nickname debe tener mas de 1 caracter",
              },
              maxLength: {
                value: 40,
                message: "El nickname no puede sobrepasar 40 caracteres",
              },
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Contraseña es obligatoria",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
                message:
                  "La contraseña debe tener minimo 6 caracteres, minusculas y mayusculas, 1 numero y 1 caracter especial",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "Contraseña de confirmacion es obligatoria",
              validate: (value) =>
                value === password ||
                "La contraseña de confirmacion no es igual",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>
      <nav className=" mt-10">
        <Link
          className=" text-center text-white text-lg block"
          to="/auth/login"
        >
          ¿Ya tienes una cuenta? Inicia Sesion
        </Link>
      </nav>
    </>
  );
};

export default RegisterView;
