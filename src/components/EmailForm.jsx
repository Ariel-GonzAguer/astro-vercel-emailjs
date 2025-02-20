import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function EmailForm() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    console.log("Valores de configuración:", {
      serviceId: "portafolioService",
      templateId: "portafolio_template_1",
      publicKey: "_NRDta8MNg0agxoFR",
    });

    emailjs
      .sendForm("portafolioService", "portafolio_template_1", form.current, {
        publicKey: "_NRDta8MNg0agxoFR",
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result);
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus("error");
        }
      );
  };
  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      <h2>EMAIL FORM1</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="user_email"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Email:
        </label>
        <input
          type="email"
          name="user_email"
          id="user_email"
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="subject"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Asunto:
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="message"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Mensaje:
        </label>
        <textarea
          name="message"
          id="message"
          required
          style={{ width: "100%", padding: "8px", height: "120px" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && (
        <p style={{ color: "green", marginTop: "1rem" }}>
          ¡Mensaje enviado con éxito!
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error al enviar el mensaje.
        </p>
      )}
    </form>
  );
}
