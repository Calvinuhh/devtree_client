import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { LoginForm } from "../interfaces/FormData";
import axios from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const LoginView = () => {
  const navigate = useNavigate();

  const defaultValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await axios.post("/auth/login", formData);

      localStorage.setItem("AUTH_TOKEN", data);
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <>
      <h1 className=" text-4xl text-white font-bold">Iniciar Sesion</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer border-2 border-[rgba(255,255,255,0.2)] shadow-[4px_10px_10px_rgba(0,0,0,0.3)] transition-all ease-in-out duration-300 hover:scale-105 hover:bg-[rgba(120,239,255,0.9)] hover:shadow-[7px_15px_15px_rgba(0,0,0,0.4)]"
          value="Iniciar Sesión"
        />
      </form>

      <nav className=" mt-10 mb-20">
        <Link
          className=" text-center text-white text-lg block"
          to="/auth/register"
        >
          ¿No tienes cuenta? Crea una aqui
        </Link>
      </nav>
    </>
  );
};

export default LoginView;
