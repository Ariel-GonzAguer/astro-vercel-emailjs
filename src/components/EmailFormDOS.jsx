import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    console.log("Starting email send...");

    try {
      const templateParams = {
        from_name: email,
        to_name: "Admin",
        reply_to: email,
        subject: subject,
        message: message,
      };

      const result = await emailjs.sendForm(
        import.meta.env.EMAILJS_SERVICE_ID,
        import.meta.env.EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS!", result.text);
      setStatus("success");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.log("FAILED...", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <div>
        <label htmlFor="from_name" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="from_name"
          name="from_name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block mb-2">
          Asunto:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-2">
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && (
        <p className="text-green-500">¡Mensaje enviado con éxito!</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Error al enviar el mensaje.</p>
      )}
    </form>
  );
}
