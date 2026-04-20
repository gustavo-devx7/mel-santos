import React from "react";

type PostCardProps = {
  perfil: string;
  video: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const arroba = "@mel.santos_7";


export default function PostCard({ perfil, video, style, onClick }: PostCardProps) {
  return (

    <div className="post-card mb-5 items-center justify-center flex flex-col">
      <div className="post-header">
        <div className="post-user">
          <img
            src={perfil}
            alt="Foto de Perfil"
            className="post-avatar"
            style={{ objectPosition: "0% 9%" }}
          />
          <div>
            <h4>
              Mel Santos
              <p className="post-username">{arroba}</p>
            </h4>
          </div>
        </div>

        <button className="post-menu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      <div className="post-content w-full">
        {/* O container precisa de 'relative' para o 'absolute' do vídeo funcionar */}
        <div className="post-video-container relative w-full aspect-[9/16] overflow-hidden bg-black">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            /* Forçamos o preenchimento total e o corte proporcional (object-cover) */
            style={{
              ...style,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Isso elimina as barras pretas/cinzas
              display: 'block'
            }}
            className="post-video blur-[1.5px]"
          />

          {/* O overlay também precisa ser absolute para ficar em cima do vídeo */}
          <div className="video-overlay absolute inset-0 flex flex-col justify-center items-center">
            <div className="lock-icon text-4xl mb-4">🔒</div>

            <div className="post-stats absolute bottom-4 w-full flex justify-around">
              <div className="post-stat bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                ❤️ <span className="text-white">248</span>
              </div>
              <div className="post-stat bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                💬 <span className="text-white">126</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="post-actions">
        <button className="action-button">❤️</button>
        <button className="action-button">💬</button>
        <button className="action-button bookmark">🔖</button>
      </div>


      <button onClick={onClick} className="buttonUnlock text-[14px] w-[90%]">
        DESBLOQUEIE OS VIDEOS AQUI
      </button>
    </div>


  );
}