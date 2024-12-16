import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <>
      <nav>
        <Link to="/auth/login">¿Ya tienes una cuenta? Inicia Sesion</Link>
      </nav>
    </>
  );
};

export default RegisterView;
