import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import axios from "../config/axios";
import { Navigate } from "react-router-dom";
import { User } from "../interfaces/FormData";
import DevTree from "../components/DevTree";

export default function AppLayout() {
  const petition = async () => {
    try {
      const { data } = await axios.get<User>("/auth/user");
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw Error(error.response.data);
      }
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: petition,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }

  if (data) return <DevTree data={data} />;
}
