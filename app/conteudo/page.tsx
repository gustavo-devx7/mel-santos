'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import PostCard from "@/components/Postcard";
import PopUpTempo from "@/components/PopUpTempo";
import Pix from "@/app/pages/pix/pagePix";



const posts = [
    { video: "/media/c6.mp4", style: { scale: "1", objectPosition: "50% 40%" } },
    { video: "/media/c14.mp4", style: { scale: "1", objectPosition: "50% 40%" } },
    { video: "/media/c15.mp4", style: { scale: "1", objectPosition: "50% 80%" } },
    { video: "/media/c16.mp4", style: { scale: "1", objectPosition: "50% 80%" } },
    { video: "/media/c21.mp4", style: { scale: "1", objectPosition: "50% 50%" } },
   // { video: "/media/c34.mp4", style: { scale: "1", objectPosition: "50% 50%" } },
    { video: "/media/c42.mp4", style: { scale: "1", objectPosition: "50% 50%" } },

];


//const check9 = "https://seguropagamentos.com.br/mel_santos9";
//const check19 = "https://seguropagamentos.com.br/mel_santos";

const Content: React.FC = () => {
    const router = useRouter();

    const getFormattedDate = (daysAhead: number = 0): string => {
        const today = new Date();
        today.setDate(today.getDate() + daysAhead);
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const promoDate = getFormattedDate(0);

    const [pixVisible, setPixVisible] = useState(false);
    const [valorSelecionado, setValorSelecionado] = useState<number | null>(null);


    function mostraDivPix(valor: number) {
        setValorSelecionado(valor);
        setPixVisible(true);
    }
    return (
        <>
            {/* HEADER */}
            <header className="header">
                <div className="container header-container">
                    <div className="logo">
                        <img
                            src="/images/money hot black.png"
                            alt="Logo"
                            className="logo-image w-[80%]"
                        />
                    </div>
                </div>
            </header>

            {/* PROMO */}
            <div className="promo-banner">
                ESSA PROMOÇÃO É VÁLIDA ATÉ {promoDate}
            </div>

            <main className="container flex items-center flex-col">

                <div className="aguarde text-center">
                    AGUARDE, AS PRÉVIAS ESTÃO SENDO CARREGADAS...
                </div>

                {/* PROFILE */}
                <div className="profile-section w-[99%]" style={{ marginBottom: 50 }}>
                    <div className="banner">
                        <video
                            src="/media/banner.mp4"
                            autoPlay
                            muted
                            loop
                            className="banner-image blur-[1px]"
                            style={{ objectPosition: "20% 60%", transform: "scale(1.4)" }}
                        />

                        <div className="banner-overlay"></div>

                        <div className="banner-content">
                            <h2>Mel Santos 💋</h2>

                            <div className="banner-stats">
                                <div className="stat">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-icon lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                    <span>401</span>
                                </div>

                                <div className="stat">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
                                    <span>438</span>
                                </div>

                                <div className="stat">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
                                    <span>229K</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOTO PERFIL */}
                    <div
                        className="profile-image-container"
                        style={{ width: 120, height: 120 }}
                    >
                        <img
                            src="/images/perfilModelo.jpg"
                            alt="perfil"
                            className="profile-image"
                            style={{ objectPosition: "top", transform: "scale(1.3)" }}
                        />
                    </div>
                </div>

                {/* CARD PERFIL */}
                <div className="card profile-card">
                    <div className="card-content">
                        <span>Mel Santos</span>

                        <div className="w-[18px] h-[18px]">
                            <svg className="svg-inline--fa fa-badge-check w-4" aria-hidden="true" focusable="false" data-prefix="fal"
                                data-icon="badge-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path className="" fill="rgb(253, 115, 80)"
                                    d="M190.6 71.4C203 47.9 227.7 32 256 32s53 15.9 65.4 39.4c3.6 6.8 11.5 10.1 18.8 7.8c25.4-7.8 54.1-1.6 74.1 18.4s26.2 48.7 18.4 74.1c-2.3 7.3 1 15.2 7.8 18.8C464.1 203 480 227.7 480 256s-15.9 53-39.4 65.4c-6.8 3.6-10.1 11.5-7.8 18.8c7.8 25.4 1.6 54.1-18.4 74.1s-48.7 26.2-74.1 18.4c-7.3-2.3-15.2 1-18.8 7.8C309 464.1 284.3 480 256 480s-53-15.9-65.4-39.4c-3.6-6.8-11.5-10.1-18.8-7.8c-25.4 7.8-54.1 1.6-74.1-18.4s-26.2-48.7-18.4-74.1c2.3-7.3-1-15.2-7.8-18.8C47.9 309 32 284.3 32 256s15.9-53 39.4-65.4c6.8-3.6 10.1-11.5 7.8-18.8c-7.8-25.4-1.6-54.1 18.4-74.1s48.7-26.2 74.1-18.4c7.3 2.3 15.2-1 18.8-7.8zM256 0c-36.1 0-68 18.1-87.1 45.6c-33-6-68.3 3.8-93.9 29.4s-35.3 60.9-29.4 93.9C18.1 188 0 219.9 0 256s18.1 68 45.6 87.1c-6 33 3.8 68.3 29.4 93.9s60.9 35.3 93.9 29.4C188 493.9 219.9 512 256 512s68-18.1 87.1-45.6c33 6 68.3-3.8 93.9-29.4s35.3-60.9 29.4-93.9C493.9 324 512 292.1 512 256s-18.1-68-45.6-87.1c6-33-3.8-68.3-29.4-93.9s-60.9-35.3-93.9-29.4C324 18.1 292.1 0 256 0zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z">
                                </path>
                            </svg>
                        </div>

                        <p className="username">@mel.santos_7</p>

                        <p className="bio">
                            Meu amorzinho, você não vai ficar de fora né? Tô agora te esperando pra te mostrar minha bucetinha toda aberta pra você.
                            <br />
                            Vem me fazer gozar, clique em qualquer botão abaixo
                            <br />
                        </p>
                    </div>
                </div>





                {/* opcoes de assinaruta */}
                <div className="card">
                    <div className="card-header">
                        <h3>Assinaturas</h3>
                    </div>
                    <div className="card-content">
                        <p className="badge">
                            MAIS POPULAR 🔥🔥
                        </p>

                        <button
                            className="subscription-button primary-button pulse"
                            onClick={() => mostraDivPix(19.9)}
                        >
                            <b>30 DIAS</b>
                            <span className="price">R$ 19,90</span>
                        </button>
                        <p className="badge" >
                            + CHAMADA DE VIDEO COMIGO HOJE!
                        </p>

                        <div className="promotions">
                            <div className="promotions-header">
                                <h4>Promoções</h4>
                                <svg name="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>


                            {/*  <a href={check19} className="subscription-link">*/}
                            <button onClick={() => mostraDivPix(29.9)}
                                className="subscription-button outline-button">
                                <div className="button-left">
                                    <span>3 Meses</span>
                                    <span className="badge">Economia</span>
                                </div>
                                <span className="price highlight">R$ 29,90</span>
                            </button>
                            {/*   </a> */}


                            {/*  <a href={check19} className="subscription-link">*/}
                            <button onClick={() => mostraDivPix(69.9)}
                                className="subscription-button outline-button">
                                <div className="button-left">
                                    <span>1 ANO</span>
                                    <span className="badge">Melhor oferta</span>
                                </div>
                                <span className="price highlight">R$ 69,90</span>
                            </button>
                            {/*  </a> */}


                        </div>
                    </div>
                </div>



                {/* aba de videos */}

                <div onClick={() => mostraDivPix(19.9)} className="grid grid-cols-2 gap-2">
                    {posts.map((post, i) => (
                        <PostCard
                            key={i}
                            perfil="/images/perfilModelo.jpg"
                            video={post.video}
                            style={post.style}
                            onClick={() => mostraDivPix(19.9)}
                        />
                    ))}

                </div>

                <a onClick={() => mostraDivPix(19.9)} className="subscription-link">
                    <button className="subscription-button primary-button">
                        <b>VEJA TUDO POR APENAS <strong>R$ 19,90</strong></b>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5L15.57 11.6237C15.7976 11.8229 15.7976 12.1771 15.57 12.3763L8 19" stroke="#fff"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </a>


                <div className="htmltempo">

                    <PopUpTempo></PopUpTempo>

                </div>


                <div
                    id="divPix"
                    className={`${pixVisible ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center p-4`}
                    onClick={() => setPixVisible(false)}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div
                        className="relative w-[90%] max-w-lg bg-white rounded-3xl shadow-xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPixVisible(false)}
                            className="absolute right-3 top-3 z-10 rounded-full p-2 text-white shadow-lg"
                            aria-label="Fechar popup"
                        >
                            ✕
                        </button>
                        <div className="space-y-4">
                            {pixVisible && <Pix valor={valorSelecionado} />}
                        </div>
                    </div>
                </div>



            </main>
        </>
    );
};

export default Content;