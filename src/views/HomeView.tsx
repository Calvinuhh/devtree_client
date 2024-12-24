import Header from "../components/Header";

const HomeView = () => {
  return (
    <>
      <Header />

      <main className=" bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
        <div className=" max-w-5xl mx-auto mt-10 ">
          <div className=" lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className=" text-6xl font-black ">
              Todas tus <span className=" text-cyan-400">Redes Sociales </span>
              en un solo lugar
            </h1>

            <p className="text-slate-800 text-xl">
              Unete a mas de 200 mil personas compartiendo sus redes sociales,
              comparte tu perfil de TikTok, FaceBook, Instagram, YouTube, GitHub
              y Mas!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeView;
