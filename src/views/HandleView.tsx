import axios from "../config/axios";
import { isAxiosError } from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserHandle } from "../interfaces/FormData";
import HandleData from "../components/HandleData";

const HandleView = () => {
  const params = useParams();

  const getUserByHandle = async (handle: string) => {
    try {
      const { data } = await axios.get<UserHandle>(`/handle/${handle}`);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw Error(error.response.data);
      }
    }
  };

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(params.handle!),
    queryKey: ["handle", params.handle],
    retry: 2,
  });

  if (isLoading) return <p className=" text-center text-white">Cargando...</p>;
  if (error) return <Navigate to="/404" />;

  if (data) return <HandleData data={data} />;
};

export default HandleView;
