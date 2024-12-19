import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../interfaces/FormData";
import axios from "../config/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

const ProfileView = () => {
  const queryClient = useQueryClient();

  const userData: User = queryClient.getQueryData(["user"])!;

  const updateProfile = async (formData: ProfileForm) => {
    try {
      const updatedData: Partial<ProfileForm> = {};
      if (formData.handle !== userData.handle) {
        updatedData.handle = formData.handle;
      }
      if (formData.description !== userData.description) {
        updatedData.description = formData.description;
      }
      const { data } = await axios.patch(`/user/${userData._id}`, updatedData);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw Error(error.response.data);
      }
    }
  };

  const updateImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data: image }: { data: { image: string } } = await axios.post(
        `/user/${userData._id}/image`,
        formData
      );
      return image;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw Error(error.response.data);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: userData?.handle,
      description: userData?.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: updateImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (oldData: User) => {
        window.location.reload();
        return { ...oldData, image: data };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Nickname:</label>
        <input
          id="handle"
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El Nickname es requerido",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La Descripcion es obligatoria",
            maxLength: {
              value: 100,
              message: "La descripción no puede superar los 100 caracteres",
            },
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer border-2 border-[rgba(255,255,255,0.2)] shadow-[4px_10px_10px_rgba(0,0,0,0.3)] transition-all ease-in-out duration-300 hover:scale-105 hover:bg-[rgba(120,239,255,0.9)] hover:shadow-[7px_15px_15px_rgba(0,0,0,0.4)]"
        value="Guardar Cambios"
      />
    </form>
  );
};

export default ProfileView;
