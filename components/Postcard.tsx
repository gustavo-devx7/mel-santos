import React from "react";

type PostCardProps = {
  perfil: string;
  video: string;
  style?: React.CSSProperties;
};

export default function PostCard({ perfil, video, style }: PostCardProps) {
  return (
    <div className="post-card mb-5">
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
              <p className="post-username">@dix_mel.01</p>
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

      <div className="post-content">
        <div className="post-video-container w-full aspect-[9/16] overflow-hidden">
          <video
            src={video}
            className="post-video w-full h-full object-cover blur-[1.5px]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={style}
          />

          <div className="video-overlay">
            <div className="lock-icon">🔒</div>

            <div className="post-stats">
              <div className="post-stat">
                ❤️ <span>248</span>
              </div>
              <div className="post-stat">
                💬 <span>126</span>
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
    </div>
  );
}