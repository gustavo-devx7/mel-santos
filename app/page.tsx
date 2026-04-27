"use client"

import React from "react";
import { useRouter } from "next/navigation";

const AgeGate: React.FC = () => {
  const router = useRouter();

  function handleConfirm() {
    router.push("/conteudo");
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to top, #37fe37, #13ca13)",
        fontFamily: "Google Sans, sans-serif",
      }}
    >
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          height: 400,
          width: "80%",
          maxWidth: 400,
          background: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          padding: 20,
          textAlign: "center",
        }}
      >
        <img
          src="/images/money hot black.png"
          alt="privacy"
          style={{ width: 450, marginBottom: -60, }}
        />

        <h1 style={{ marginBottom: 10, color: "black",fontWeight:700 }}>Confirmação de idade</h1>

        <p style={{ marginBottom: 20, color: "black" }}>
          Este conteúdo é destinado exclusivamente para maiores de 18 anos.
          Por favor, confirme sua idade para continuar.
        </p>

        <button
          onClick={handleConfirm}
          style={{
            padding: "10px 20px",
            background: "linear-gradient(to right, #13ca13, #37fe37)",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Tenho mais de 18 anos
        </button>
      </main>
    </div>
  );
};

export default AgeGate;