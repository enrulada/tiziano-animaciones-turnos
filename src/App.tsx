import { useState } from "react";
import PeluqueriaAnimation from "./components/PeluqueriaAnimation";
import ManicuriaAnimation from "./components/ManicuriaAnimation";
import BarberiaAnimation from "./components/BarberiaAnimation";
import EsteticaAnimation from "./components/EsteticaAnimation";
import "./App.css";

type Estado =
  | "seleccion"
  | "turno"
  | "procesando"
  | "confirmado";

type Servicio =
  | "peluqueria"
  | "manicuria"
  | "barberia"
  | "estetica"
  | null;

function App() {
  const [estado, setEstado] =
    useState<Estado>("seleccion");

  const [servicio, setServicio] =
    useState<Servicio>(null);

  const seleccionarServicio = (
    servicioSeleccionado:
      | "peluqueria"
      | "manicuria"
      | "barberia"
      | "estetica"
  ) => {
    setServicio(servicioSeleccionado);
    setEstado("turno");
  };

  const confirmarTurno = () => {
    setEstado("procesando");

    // DEMO:
    // Simula una respuesta correcta del backend.
    // En Tiziano real debe reemplazarse por
    // la respuesta exitosa de la API.
    window.setTimeout(() => {
      setEstado("confirmado");
    }, 1400);
  };

  const volverServicios = () => {
    setServicio(null);
    setEstado("seleccion");
  };

  const repetirDemo = () => {
    setEstado("turno");
  };

  const obtenerNombreServicio = () => {
    switch (servicio) {
      case "peluqueria":
        return "Corte y peinado";

      case "manicuria":
        return "Manicuría";

      case "barberia":
        return "Servicio de barbería";

      case "estetica":
        return "Servicio de estética";

      default:
        return "";
    }
  };

  const obtenerCategoriaServicio = () => {
    switch (servicio) {
      case "peluqueria":
        return "Peluquería";

      case "manicuria":
        return "Manicuría";

      case "barberia":
        return "Barbería";

      case "estetica":
        return "Estética";

      default:
        return "";
    }
  };

  const obtenerIconoServicio = () => {
    switch (servicio) {
      case "peluqueria":
        return "✂️";

      case "manicuria":
        return "💅";

      case "barberia":
        return "💈";

      case "estetica":
        return "✨";

      default:
        return "";
    }
  };

  return (
    <main className="demo-page">
      <section className="demo-header">
        <span className="demo-brand">
          TIZIANO II
        </span>

        <h1>Confirmación de turno</h1>

        <p>
          Experiencia visual personalizada según el servicio
        </p>
      </section>

      {/* SELECCIÓN DE SERVICIO */}
      {estado === "seleccion" && (
        <section className="service-selector">
          <span className="selector-label">
            DEMO INTERACTIVA
          </span>

          <h2>Elegí un servicio</h2>

          <p className="selector-description">
            Cada servicio tiene su propia experiencia de
            confirmación.
          </p>

          <div className="service-options">
            {/* PELUQUERÍA */}
            <button
              className="service-button"
              onClick={() =>
                seleccionarServicio("peluqueria")
              }
            >
              <span className="service-icon">
                ✂️
              </span>

              <span className="service-text">
                <strong>Peluquería</strong>
                <small>Corte y peinado</small>
              </span>

              <span className="service-arrow">
                ›
              </span>
            </button>

            {/* MANICURÍA */}
            <button
              className="service-button"
              onClick={() =>
                seleccionarServicio("manicuria")
              }
            >
              <span className="service-icon">
                💅
              </span>

              <span className="service-text">
                <strong>Manicuría</strong>
                <small>Cuidado y esmaltado</small>
              </span>

              <span className="service-arrow">
                ›
              </span>
            </button>

            {/* BARBERÍA */}
            <button
              className="service-button"
              onClick={() =>
                seleccionarServicio("barberia")
              }
            >
              <span className="service-icon">
                💈
              </span>

              <span className="service-text">
                <strong>Barbería</strong>
                <small>
                  Corte y cuidado masculino
                </small>
              </span>

              <span className="service-arrow">
                ›
              </span>
            </button>

            {/* ESTÉTICA */}
            <button
              className="service-button"
              onClick={() =>
                seleccionarServicio("estetica")
              }
            >
              <span className="service-icon">
                ✨
              </span>

              <span className="service-text">
                <strong>Estética</strong>
                <small>
                  Belleza y cuidado personal
                </small>
              </span>

              <span className="service-arrow">
                ›
              </span>
            </button>
          </div>
        </section>
      )}

      {/* DATOS DEL TURNO */}
      {estado === "turno" && servicio && (
        <section className="turno-card">
          <div className="turno-icon">
            {obtenerIconoServicio()}
          </div>

          <span className="turno-label">
            TU TURNO
          </span>

          <h2>
            {obtenerNombreServicio()}
          </h2>

          <div className="turno-data">
            <div>
              <span>Servicio</span>

              <strong>
                {obtenerCategoriaServicio()}
              </strong>
            </div>

            <div>
              <span>Horario</span>
              <strong>16:30 hs</strong>
            </div>
          </div>

          <button
            className="confirmar-button"
            onClick={confirmarTurno}
          >
            Confirmar turno
          </button>

          <button
            className="volver-button"
            onClick={volverServicios}
          >
            ← Elegir otro servicio
          </button>
        </section>
      )}

      {/* PROCESANDO */}
      {estado === "procesando" && (
        <section className="procesando-card">
          <div className="loader"></div>

          <h2>
            Confirmando tu turno...
          </h2>

          <p>
            Un momento, estamos registrando la reserva.
          </p>
        </section>
      )}

      {/* PELUQUERÍA */}
      {estado === "confirmado" &&
        servicio === "peluqueria" && (
          <div className="resultado">
            <PeluqueriaAnimation />

            <div className="resultado-actions">
              <button
                className="repetir-button"
                onClick={repetirDemo}
              >
                Repetir demo
              </button>

              <button
                className="cambiar-button"
                onClick={volverServicios}
              >
                Cambiar servicio
              </button>
            </div>
          </div>
        )}

      {/* MANICURÍA */}
      {estado === "confirmado" &&
        servicio === "manicuria" && (
          <div className="resultado">
            <ManicuriaAnimation />

            <div className="resultado-actions">
              <button
                className="repetir-button"
                onClick={repetirDemo}
              >
                Repetir demo
              </button>

              <button
                className="cambiar-button"
                onClick={volverServicios}
              >
                Cambiar servicio
              </button>
            </div>
          </div>
        )}

      {/* BARBERÍA */}
      {estado === "confirmado" &&
        servicio === "barberia" && (
          <div className="resultado">
            <BarberiaAnimation />

            <div className="resultado-actions">
              <button
                className="repetir-button"
                onClick={repetirDemo}
              >
                Repetir demo
              </button>

              <button
                className="cambiar-button"
                onClick={volverServicios}
              >
                Cambiar servicio
              </button>
            </div>
          </div>
        )}

      {/* ESTÉTICA */}
      {estado === "confirmado" &&
        servicio === "estetica" && (
          <div className="resultado">
            <EsteticaAnimation />

            <div className="resultado-actions">
              <button
                className="repetir-button"
                onClick={repetirDemo}
              >
                Repetir demo
              </button>

              <button
                className="cambiar-button"
                onClick={volverServicios}
              >
                Cambiar servicio
              </button>
            </div>
          </div>
        )}
    </main>
  );
}

export default App;