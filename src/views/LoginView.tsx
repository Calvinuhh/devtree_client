import { Link } from "react-router-dom";

const LoginView = () => {
  return (
    <>
      <nav>
        <Link to="/auth/register">¿No tienes cuenta? Crea una aqui</Link>
      </nav>
    </>
  );
};

export default LoginView;
