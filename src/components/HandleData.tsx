import { UserHandle } from "../interfaces/FormData";
import Social from "../interfaces/Social";

interface HandleDataProps {
  data: UserHandle;
}

const HandleData = ({ data }: HandleDataProps) => {
  const links: Social[] = JSON.parse(data.links!).filter(
    (link: Social) => link.enabled
  );

  return (
    <div className=" space-y-6 text-white">
      <p className=" text-5xl text-center font-black">{data.handle}</p>

      {data.image && (
        <img className=" max-w-[250px] mx-auto" src={data.image} />
      )}

      {data.description && (
        <p className=" text-lg text-center font-bold">{data.description}</p>
      )}

      <div className=" mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link: Social) => (
            <a
              className=" bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              key={link.name}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className=" w-12"
                src={`/social/icon_${link.name}.svg`}
                alt="logo_social"
              />
              <p className=" text-black capitalize font-bold text-lg">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className=" text-center">No hay enlaces en este perfil</p>
        )}
      </div>
    </div>
  );
};

export default HandleData;
