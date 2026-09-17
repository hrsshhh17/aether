import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ParticleField from "./ParticleField";
import Ecosystem from "./Ecosystem";
import "./styles.css";
const Arrow = () => <span aria-hidden="true">↗</span>;
function Mark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="m20 3 17 31H3L20 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 13 10 18H10l10-18Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M20 3v10M3 34l7-3m27 3-7-3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const topRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.from(".hero-reveal", {
          y: 35,
          opacity: 0,
          duration: 1.1,
          stagger: 0.13,
          ease: "power3.out",
        });
    }, topRef);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    const size = () => {
      if (innerWidth > 760) setMenu(false);
    };
    addEventListener("keydown", key);
    addEventListener("resize", size);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("resize", size);
    };
  }, []);
  return (
    <div ref={topRef}>
      <ParticleField />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Aether home">
          <Mark />
          <span>AETHER</span>
        </a>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          {["Product", "Intelligence", "Models", "API", "Pricing"].map(
            (name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                onClick={() => setMenu(false)}
              >
                {name}
              </a>
            ),
          )}
        </nav>
        <a href="#product" className="header-cta">
          Explore Aether <Arrow />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "×" : "☰"}
        </button>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-topline hero-reveal">
            <span className="status-dot" /> AETHER / A NEW PERSPECTIVE ON
            INTELLIGENCE
          </div>
          <div className="hero-copy">
            <h1 className="hero-reveal">
              Intelligence
              <br />
              without
              <br />
              <span className="serif">boundaries.</span>
            </h1>
            <p className="hero-description hero-reveal">
              Reason. Adapt. Collaborate.
              <br />
              Explore the possibilities of a modular AI platform.
            </p>
            <div className="hero-actions hero-reveal">
              <a href="#product" className="button-primary">
                Discover Aether <Arrow />
              </a>
              <a className="text-link" href="#intelligence">
                See it take shape <Arrow />
              </a>
            </div>
          </div>
          <div className="orb-caption">
            <span className="crosshair">+</span>
            <div>
              AN INTELLIGENCE IN MOTION
              <br />
              <span>Move your cursor. Make a connection.</span>
            </div>
            <span className="orb-index">[ A—01 ]</span>
          </div>
          <div className="hero-bottom">
            <a href="#product">
              <span className="scroll-line" /> SCROLL TO DISCOVER
            </a>
            <span>ONE INTELLIGENCE. INFINITE POSSIBILITIES.</span>
            <span>01 / 07</span>
          </div>
        </section>
        <section className="product section" id="product">
          <div className="section-index">
            <span>01 — PRODUCT</span>
            <span>THE AETHER PRODUCT CONCEPT</span>
          </div>
          <Reveal>
            <div className="section-heading">
              <h2>
                More room
                <br />
                <span className="serif muted">for possibility.</span>
              </h2>
              <p>
                Three connected product ideas.
                <br />
                One modular AI platform.
                <br />
                Built around the way ideas develop.
              </p>
            </div>
          </Reveal>
          <div className="capabilities">
            {[
              [
                "01",
                "Aether Canvas",
                "A workspace concept for turning questions, notes and rough drafts into connected ideas.",
                "↗",
              ],
              [
                "02",
                "Aether Studio",
                "A creative space concept for exploring language, visual directions and new perspectives.",
                "✳",
              ],
              [
                "03",
                "Aether Relay",
                "An integration concept for bringing the Aether model family into your own applications.",
                "⌘",
              ],
            ].map(([i, title, text, symbol]) => (
              <Reveal className="capability" key={i}>
                <div className="capability-top">
                  <span>{i}</span>
                  <b aria-hidden="true">{symbol}</b>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="intelligence section" id="intelligence">
          <div className="section-index">
            <span>02 — INTELLIGENCE</span>
            <span>WATCH THE CONNECTIONS FORM</span>
          </div>
          <Reveal>
            <p className="eyebrow">FROM A SINGLE SPARK</p>
            <h2 className="sr-only">
              One intelligence. Infinite possibilities.
            </h2>
            <p className="intelligence-note">
              A sphere becomes a network.
              <br />
              Particles come together as a new idea.
            </p>
          </Reveal>
          <div className="formation-caption">
            <span>●</span> INFINITE POSSIBILITIES <span>↗</span>
          </div>
        </section>
        <Ecosystem />
        <section className="final-cta section" id="contact">
          <div className="section-index">
            <span>07 — AETHER</span>
            <span>INTELLIGENCE WITHOUT BOUNDARIES</span>
          </div>
          <Reveal>
            <Mark />
            <h2>
              One intelligence.
              <br />
              <span className="serif">Infinite possibilities.</span>
            </h2>
            <a href="#home" className="button-primary">
              Explore it again <Arrow />
            </a>
          </Reveal>
          <footer>
            <a className="brand" href="#home">
              <Mark />
              <span>AETHER</span>
            </a>
            <span>INTELLIGENCE WITHOUT BOUNDARIES.</span>
            <p>A fictional AI company · Interactive concept</p>
            <a href="#home">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
