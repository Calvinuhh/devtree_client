import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../interfaces/FormData";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loadingGif from "../../public/loading_gif.gif";

const RegisterView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: RegisterForm = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/auth/register", formData);

      const { data } = response;

      toast.success(data);

      reset();
      navigate("/auth/login");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      }
    } finally {
      setIsLoading(false);
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
          className={`p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer border-2 border-[rgba(255,255,255,0.2)] shadow-[4px_10px_10px_rgba(0,0,0,0.3)] transition-all ease-in-out duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-400 hover:scale-105 hover:bg-[rgba(120,239,255,0.9)] hover:shadow-[7px_15px_15px_rgba(0,0,0,0.4)]"
          }`}
          value={isLoading ? "Cargando..." : "Crear Cuenta"}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="mt-5">
            <img
              className=" h-[100px] w-[500px] "
              src={loadingGif}
              alt="loading_gif"
            />
          </div>
        )}
      </form>
      <nav className=" mt-16 mb-20">
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
