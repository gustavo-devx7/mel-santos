'use client'

import { useEffect, useState } from "react";

function redCheck9() {
  window.location.href = "https://seguropagamentos.com.br/mel_santos9";
}

export default function PopUpTempo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 600000); //tirar um 0 disso aí

    return () => clearTimeout(timer); // evita bug
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex flex-col items-center justify-center z-50">

      {/* HEADER */}
      <header className="headerTempo flex flex-col items-center mb-16">
        <div className="flex flex-col w-[80%] items-center">

          {/* FOTO */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/images/perfilModelo.jpg"
              alt="perfil"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-2">@dix_mel.01</h2>
        </div>
      </header>

      {/* TEXTO */}
      <div className="flex flex-col items-center text-center w-[80%] mb-10">
        <h1 className="text-lg font-semibold mb-2">
          Oii, bebê🌸 Ainda está aqui?
        </h1>

        <h2 className="text-sm">
          Para acessar vídeos sem censura assim como o vídeo abaixo, clique no botão abaixo
          ou no próprio vídeo! Te espero lá no whatsapp😈🔥
        </h2>
      </div>

      {/* ESPAÇO */}
      <div className="h-10" />

      {/* VIDEO */}
      <div
        onClick={redCheck9}
        className="cursor-pointer w-[80%] h-72 overflow-hidden rounded-lg blur-[1px]"
      >
        <video
          src="/media/c28.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* BOTÃO */}
      <button onClick={redCheck9} className="buttonTempo mt-6">
        Clique para ver sem censura!
      </button>
    </div>
  );
}