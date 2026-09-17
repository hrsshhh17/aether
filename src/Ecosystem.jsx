import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
const Arrow = () => <span aria-hidden="true">↗</span>;
const models = [
  {
    name: "Aether Spark",
    type: "EVERYDAY INTELLIGENCE",
    text: "A starting point for questions, drafts and everyday thinking. Designed around a natural back-and-forth.",
    tags: ["Conversation", "Writing"],
    num: "01",
    symbol: "◉",
  },
  {
    name: "Aether Atlas",
    type: "DEEPER CONNECTIONS",
    text: "A concept for exploring layered questions. Bring documents, context and different perspectives into one conversation.",
    tags: ["Reasoning", "Research"],
    num: "02",
    symbol: "✳",
  },
  {
    name: "Aether Prism",
    type: "CREATIVE EXPLORATION",
    text: "An idea for working across words and images. Explore directions, develop a visual language and connect the pieces.",
    tags: ["Multimodal", "Creative"],
    num: "03",
    symbol: "✺",
  },
];
const snippets = {
  JavaScript: `// Illustrative API — not a live SDK\nimport { Aether } from '@aether/sdk';\n\nconst aether = new Aether({\n  apiKey: process.env.AETHER_API_KEY\n});\n\nconst response = await aether.generate({\n  model: 'aether-spark',\n  input: 'What could we build together?'\n});\n\nconsole.log(response.text);`,
  Python: `# Illustrative API — not a live SDK\nfrom aether import Aether\nimport os\n\naether = Aether(\n    api_key=os.environ['AETHER_API_KEY']\n)\n\nresponse = aether.generate(\n    model='aether-spark',\n    input='What could we build together?'\n)\n\nprint(response.text)`,
};
export default function Ecosystem() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("JavaScript"),
    [copied, setCopied] = useState(""),
    [yearly, setYearly] = useState(false),
    [modal, setModal] = useState(null);
  const dialog = useRef(null),
    trigger = useRef(null),
    timer = useRef(null);
  useEffect(() => {
    if (modal) dialog.current.showModal();
    else if (dialog.current.open) {
      dialog.current.close();
      trigger.current?.focus();
    }
  }, [modal]);
  useEffect(() => () => clearTimeout(timer.current), []);
  function open(name, e) {
    trigger.current = e.currentTarget;
    setModal(name);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(snippets[tab]);
      setCopied("Copied ✓");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("Select code to copy");
    }
  }
  return (
    <>
      <section className="models section" id="lab">
        <div className="section-index" id="models">
          <span>03 — THE MODEL FAMILY</span>
          <span>DIFFERENT STRENGTHS. ONE AETHER.</span>
        </div>
        <div className="section-heading">
          <h2>
            Find your
            <br />
            <span className="serif">kind of brilliant.</span>
          </h2>
          <p>
            Three model concepts.
            <br />
            Three ways to explore what’s possible.
          </p>
        </div>
        <div className="model-grid">
          {models.map((model) => (
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="model"
              key={model.name}
            >
              <div className="model-number">
                {model.num}
                <span>↗</span>
              </div>
              <div
                className={`model-emblem emblem-${model.num}`}
                aria-hidden="true"
              >
                {model.symbol}
              </div>
              <p className="eyebrow">{model.type}</p>
              <h3>{model.name}</h3>
              <p>{model.text}</p>
              <div className="tags">
                {model.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                className="model-link"
                onClick={(e) => open(model.name, e)}
              >
                Explore model <Arrow />
              </button>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="api section" id="api">
        <div className="section-index">
          <span>04 — MADE FOR BUILDERS</span>
          <span>YOUR IDEAS. YOUR APPLICATIONS.</span>
        </div>
        <div className="api-grid">
          <div>
            <p className="eyebrow">AN API, REIMAGINED</p>
            <h2>
              A few lines.
              <br />
              <span className="serif">A new dimension.</span>
            </h2>
            <p className="api-description">
              One interface for the Aether model family.
              <br />A developer experience concept that starts simple
              <br />
              and leaves room for your imagination.
            </p>
            <button
              className="button-primary"
              onClick={(e) => open("Developer preview", e)}
            >
              Explore the API concept <Arrow />
            </button>
            <p className="api-footnote">
              Illustrative code · No live endpoint or published SDK
            </p>
          </div>
          <div className="code-panel">
            <div className="code-tabs">
              <div role="tablist" aria-label="Code language">
                {Object.keys(snippets).map((lang) => (
                  <button
                    role="tab"
                    aria-selected={tab === lang}
                    aria-controls="code-example"
                    id={`code-${lang}`}
                    className={tab === lang ? "selected" : ""}
                    key={lang}
                    onClick={() => {
                      setTab(lang);
                      setCopied("");
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button onClick={copy} aria-label="Copy code">
                {copied || "Copy ⧉"}
              </button>
            </div>
            <pre
              id="code-example"
              role="tabpanel"
              aria-labelledby={`code-${tab}`}
              tabIndex="0"
            >
              <code>
                {snippets[tab].split("\n").map((line, i) => (
                  <span
                    className={
                      i === 0
                        ? "code-comment"
                        : line.startsWith("import") || line.startsWith("from")
                          ? "code-import"
                          : line.includes("'")
                            ? "code-string"
                            : ""
                    }
                    key={i}
                  >
                    <i aria-hidden="true">{String(i + 1).padStart(2, "0")}</i>
                    {line || " "}
                    {"\n"}
                  </span>
                ))}
              </code>
            </pre>
            <div className="code-status">
              <span className="status-dot" /> AETHER DEVELOPER CONCEPT{" "}
              <span>NOT A LIVE SERVICE</span>
            </div>
            <span role="status" className="sr-only">
              {copied}
            </span>
          </div>
        </div>
      </section>
      <section className="pricing section" id="pricing">
        <div className="section-index">
          <span>05 — ROOM TO GROW</span>
          <span>START CURIOUS. GO ANYWHERE.</span>
        </div>
        <div className="section-heading">
          <h2>
            Possibility,
            <br />
            <span className="serif">on your terms.</span>
          </h2>
          <div className="billing" aria-label="Billing period">
            <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly <span>−20%</span>
            </button>
          </div>
        </div>
        <div className="price-grid">
          {[
            {
              name: "Explorer",
              price: 0,
              desc: "A place to follow your curiosity.",
              features: [
                "Spark conversations",
                "A personal idea workspace",
                "Essential writing tools",
              ],
            },
            {
              name: "Pioneer",
              price: yearly ? 19.2 : 24,
              desc: "More room for ambitious ideas.",
              features: [
                "The complete model family",
                "Research and creative workspaces",
                "Reusable project context",
              ],
            },
            {
              name: "Collective",
              price: null,
              desc: "A shared space for what comes next.",
              features: [
                "Collaborative project spaces",
                "Workspace administration",
                "An API integration pathway",
              ],
            },
          ].map((plan, i) => (
            <article
              key={plan.name}
              className={`price-plan ${i === 1 ? "featured" : ""}`}
            >
              <div className="plan-top">
                <h3>{plan.name}</h3>
                {i === 1 && <span>GO FURTHER</span>}
              </div>
              <p>{plan.desc}</p>
              <div className="price">
                {plan.price === null
                  ? "Let’s talk"
                  : `$${Number.isInteger(plan.price) ? plan.price : plan.price.toFixed(2)}`}
                {plan.price !== null && <span>/ month</span>}
              </div>
              <span className="billing-note">
                {plan.price === null
                  ? "A team plan concept"
                  : yearly && plan.price
                    ? `$${(plan.price * 12).toFixed(2)} billed yearly · concept`
                    : "Illustrative plan · not available for purchase"}
              </span>
              <button
                className={i === 1 ? "button-primary" : "button-outline"}
                onClick={(e) => open(`${plan.name} plan`, e)}
              >
                Explore this plan
                <Arrow />
              </button>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <span aria-hidden="true">+</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="pricing-disclaimer">
          Proposed plans for the fictional AETHER ecosystem. No payments,
          subscriptions or live services.
        </p>
      </section>
      <dialog
        ref={dialog}
        aria-labelledby="dialog-title"
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setModal(null);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => setModal(null)}
        >
          ×
        </button>
        <p className="eyebrow">AETHER / PRODUCT CONCEPT</p>
        <h2 id="dialog-title">{modal}</h2>
        <p>
          {models.some((m) => m.name === modal)
            ? models.find((m) => m.name === modal).text
            : modal === "Developer preview"
              ? "The proposed API brings Spark, Atlas and Prism behind a common generate interface. The examples on this page demonstrate the intended developer experience; the SDK and endpoint are not live."
              : "This is a proposed plan for the fictional AETHER product ecosystem. No account will be created and no payment will be collected."}
        </p>
        {models.some((m) => m.name === modal) && (
          <p>This model is a product concept, not a deployed AI service.</p>
        )}
        <button className="button-primary" onClick={() => setModal(null)}>
          Keep exploring <Arrow />
        </button>
      </dialog>
    </>
  );
}
