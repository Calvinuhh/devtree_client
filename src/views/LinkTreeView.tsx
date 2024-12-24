import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { User } from "../interfaces/FormData";
import { useQueryClient } from "@tanstack/react-query";
import axios from "../config/axios";
import { isAxiosError } from "axios";
import Social from "../interfaces/Social";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  const queryClient = useQueryClient();

  const userData: User = queryClient.getQueryData(["user"])!;

  const updateProfile = async (formData: User) => {
    try {
      const { data } = await axios.patch<string>(`/user/${userData._id}`, {
        links: formData.links,
      });
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado Correctamente");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(userData.links!).find(
        (link: Social) => link.name === item.name
      );

      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updatedLinks);
  };

  const links: Social[] = JSON.parse(userData.links!);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidURL(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no valida");
        }
      }
      return link;
    });
    setDevTreeLinks(updatedLinks);

    let updatedItems: Social[] = [];

    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return { ...link, id, enabled: true };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name == socialNetwork
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return { ...link, id: 0, enabled: false };
        } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return { ...link, id: link.id - 1 };
        } else return link;
      });
    }

    queryClient.setQueryData(["user"], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedItems) };
    });
  };

  return (
    <>
      <div className="space-y-5 ">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
          className=" bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold border-2 border-[rgba(255,255,255,0.2)] shadow-[4px_10px_10px_rgba(0,0,0,0.3)] transition-all ease-in-out duration-300 hover:scale-105 hover:bg-[rgba(120,239,255,0.9)] hover:shadow-[7px_15px_15px_rgba(0,0,0,0.4)]"
        >
          Guardar cambios
        </button>
      </div>
    </>
  );
};

export default LinkTreeView;
