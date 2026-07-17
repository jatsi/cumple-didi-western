"use client";

import { useEffect, useRef, useState } from "react";

const wishes = [
  "Que este nuevo año te traiga aventuras inolvidables.",
  "Que nunca te falten motivos para sonreír.",
  "Que tus sueños cabalguen siempre hacia la libertad.",
  "Que hoy recibas todo el cariño que mereces.",
  "Que la suerte te acompañe por todos los caminos.",
];

export default function Home() {
  const [celebrating, setCelebrating] = useState(false);
  const [wish, setWish] = useState("Toca la herradura para descubrir tu deseo");
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!celebrating) return;
    const timer = setTimeout(() => setCelebrating(false), 4500);
    return () => clearTimeout(timer);
  }, [celebrating]);

  function revealWish() {
    const next = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(next);
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.volume = 0.45;
        await audio.play();
        setMusicOn(true);
        setMusicError(false);
      } catch {
        setMusicOn(false);
        setMusicError(true);
      }
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }

  return (
    <main>
      <audio ref={audioRef} src="/music.mp3" loop preload="metadata" onEnded={() => setMusicOn(false)} onError={() => { setMusicOn(false); setMusicError(true); }} />
      <div className="grain" aria-hidden="true" />
      <nav className="nav" aria-label="Navegación principal">
        <a className="brand" href="#inicio"><span>★</span> DIDI&apos;S SALOON <span>★</span></a>
        <div className="navLinks">
          <a href="#mensaje">Mensaje</a>
          <a href="#deseo">Tu deseo</a>
        </div>
        <button className={`sound ${musicOn ? "playing" : ""}`} onClick={toggleMusic} aria-pressed={musicOn} aria-label={musicOn ? "Pausar música" : "Reproducir música"} title={musicError ? "Agrega el archivo public/music.mp3" : undefined}>
          {musicOn ? "❚❚ Música" : "▶ Música"}
        </button>
      </nav>

      <section className="hero" id="inicio">
        <div className="sun" aria-hidden="true" />
        <div className="mountains back" aria-hidden="true" />
        <div className="mountains front" aria-hidden="true" />
        <div className="cactus cactusOne" aria-hidden="true"><i /><b /></div>
        <div className="cactus cactusTwo" aria-hidden="true"><i /><b /></div>
        <img className="chibi heroChibi" src="/chibi-vaquera.png" alt="Jatsi en versión chibi vestida de vaquera saludando a DIDI" />
        <div className="heroContent">
          <p className="eyebrow">SE BUSCA PARA CELEBRAR</p>
          <div className="poster">
            <span className="posterTop">HOY, EN TODO EL TERRITORIO</span>
            <h1>¡Feliz<br /><em>Cumpleaños</em><strong>DIDI!</strong></h1>
            <div className="divider"><span>◆</span></div>
            <p>El vaquero más increíble del Oeste<br />está de fiesta</p>
          </div>
          <button className="primary" onClick={() => setCelebrating(true)}>
            <span>✦</span> Iniciar celebración <span>✦</span>
          </button>
          <span className="scrollHint">DESLIZA PARA SEGUIR EL CAMINO ↓</span>
        </div>
      </section>

      <section className="messageSection" id="mensaje">
        <div className="rope" aria-hidden="true" />
        <img className="chibi cakeChibi" src="/chibi-pastel.png" alt="Jatsi chibi con ropa western sosteniendo un pastel para DIDI" />
        <article className="letter">
          <span className="stamp">D</span>
          <p className="kicker">UN MENSAJE DESDE EL CORAZÓN</p>
          <h2>Querido DIDI,</h2>
          <p>Hoy el pueblo entero hace una pausa para celebrar a una persona verdaderamente especial. Que este cumpleaños marque el inicio de una nueva aventura llena de alegría, momentos inolvidables y sueños cumplidos.</p>
          <p>Gracias por haber llegado a mi vida y convertirte en alguien tan importante para mí. Tu compañía, tu cariño y todo el apoyo que me brindas significan muchísimo.</p>
          <p>También quiero agradecerte de corazón por ser uno de los principales donadores de mis lives. Cada regalo y cada momento en el que estás presente me ayudan a seguir adelante, pero lo que más valoro es saber que puedo contar contigo.</p>
          <p>Sigue siendo ese hombre increíble que ilumina cada lugar al que llega. Que nunca te falten buenos amigos, grandes caminos por recorrer y razones para brindar.</p>
          <div className="signature">Con todo mi cariño y gratitud <span>♥</span><small>— Jatsi</small></div>
        </article>
      </section>

      <section className="wishSection" id="deseo">
        <p className="kicker light">LA SUERTE DEL OESTE</p>
        <h2>Un deseo para tu nuevo año</h2>
        <button className="horseshoe" onClick={revealWish} aria-label="Descubrir un deseo de cumpleaños">
          <span>★</span><b>U</b><span>★</span>
        </button>
        <p className="wishText" aria-live="polite">“{wish}”</p>
        <button className="secondary" onClick={revealWish}>Descubrir otro deseo</button>
      </section>

      <footer><span>★</span><p>Hecho especialmente para <b>DIDI</b><small>FELIZ VUELTA AL SOL, VAQUERO</small></p><span>★</span></footer>

      {celebrating && (
        <div className="celebration" role="status" aria-live="polite">
          {Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties}>{i % 3 === 0 ? "★" : i % 3 === 1 ? "✦" : "♥"}</i>)}
          <div className="toast"><span>YEEHAW!</span><b>¡Que cumplas muchos más, DIDI!</b></div>
        </div>
      )}
    </main>
  );
}
