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
    bestFor: "Quick thinking, daily writing and fluid conversations.",
    capabilities: [
      "Fast conversational responses",
      "Drafting and rewriting",
      "Everyday problem solving",
    ],
    sample: "Turn these rough notes into a clear project brief.",
  },
  {
    name: "Aether Atlas",
    type: "DEEPER CONNECTIONS",
    text: "A concept for exploring layered questions. Bring documents, context and different perspectives into one conversation.",
    tags: ["Reasoning", "Research"],
    num: "02",
    symbol: "✳",
    bestFor: "Research, layered questions and long-form analysis.",
    capabilities: [
      "Multi-step reasoning",
      "Connected document analysis",
      "Structured research synthesis",
    ],
    sample: "Compare these three reports and surface the hidden trade-offs.",
  },
  {
    name: "Aether Prism",
    type: "CREATIVE EXPLORATION",
    text: "An idea for working across words and images. Explore directions, develop a visual language and connect the pieces.",
    tags: ["Multimodal", "Creative"],
    num: "03",
    symbol: "✺",
    bestFor: "Visual exploration, creative direction and multimodal ideas.",
    capabilities: [
      "Words and image understanding",
      "Concept development",
      "Creative variation",
    ],
    sample: "Develop three visual directions from this product story.",
  },
];
const planCatalog = [
  {
    name: "Explorer",
    monthly: 0,
    desc: "A place to follow your curiosity.",
    features: [
      "Spark conversations",
      "A personal idea workspace",
      "Essential writing tools",
    ],
  },
  {
    name: "Pioneer",
    monthly: 24,
    desc: "More room for ambitious ideas.",
    features: [
      "The complete model family",
      "Research and creative workspaces",
      "Reusable project context",
    ],
  },
  {
    name: "Collective",
    monthly: null,
    desc: "A shared space for what comes next.",
    features: [
      "Collaborative project spaces",
      "Workspace administration",
      "An API integration pathway",
    ],
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
    [modal, setModal] = useState(null),
    [selectedPlan, setSelectedPlan] = useState("Pioneer"),
    [checkoutPlan, setCheckoutPlan] = useState(null),
    [checkoutDone, setCheckoutDone] = useState(false),
    [checkoutStep, setCheckoutStep] = useState(1),
    [checkoutData, setCheckoutData] = useState({}),
    [checkoutError, setCheckoutError] = useState("");
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
  function choosePlan(plan) {
    setSelectedPlan(plan.name);
    setCheckoutDone(false);
  }
  function continueWithPlan() {
    const plan = planCatalog.find((item) => item.name === selectedPlan);
    setCheckoutPlan(plan);
    setCheckoutDone(false);
    setCheckoutStep(1);
    setCheckoutData({});
    setCheckoutError("");
    requestAnimationFrame(() =>
      document
        .getElementById("checkout")
        ?.scrollIntoView({ behavior: "smooth" }),
    );
  }
  function advanceCheckout(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (checkoutStep === 1 && values.password !== values.confirmPassword) {
      setCheckoutError("Passwords do not match.");
      return;
    }
    setCheckoutError("");
    if (checkoutStep === 2 && values.cardNumber) {
      values.cardLast4 = values.cardNumber.replace(/\s/g, "").slice(-4);
      delete values.cardNumber;
      delete values.cvc;
    }
    delete values.password;
    delete values.confirmPassword;
    setCheckoutData((current) => ({ ...current, ...values }));
    setCheckoutStep((step) => Math.min(step + 1, 3));
  }
  function finishCheckout() {
    setCheckoutDone(true);
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
        <div
          className="price-grid"
          role="radiogroup"
          aria-label="Choose an Aether plan"
        >
          {planCatalog.map((plan, i) => {
            const price =
              plan.monthly === null
                ? null
                : yearly
                  ? plan.monthly * 0.8
                  : plan.monthly;
            const selected = selectedPlan === plan.name;
            return (
              <article
                key={plan.name}
                className={`price-plan ${selected ? "selected" : ""}`}
                onClick={() => choosePlan(plan)}
              >
                <div className="plan-top">
                  <h3>{plan.name}</h3>
                  <span className="plan-radio" aria-hidden="true">
                    {selected ? "●" : "○"}
                  </span>
                </div>
                <p>{plan.desc}</p>
                <div className="price">
                  {price === null
                    ? "Let’s talk"
                    : `$${Number.isInteger(price) ? price : price.toFixed(2)}`}
                  {price !== null && <span>/ month</span>}
                </div>
                <span className="billing-note">
                  {price === null
                    ? "A team plan concept"
                    : yearly && price
                      ? `$${(price * 12).toFixed(2)} billed yearly · concept`
                      : "Illustrative plan · not available for purchase"}
                </span>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={selected ? "button-primary" : "button-outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    choosePlan(plan);
                  }}
                >
                  {selected ? "Selected" : "Select plan"}
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
            );
          })}
        </div>
        <div className="plan-continue">
          <div>
            <span>YOUR SELECTION</span>
            <strong>{selectedPlan}</strong>
          </div>
          <button className="button-primary" onClick={continueWithPlan}>
            Continue with {selectedPlan} <Arrow />
          </button>
        </div>
        <p className="pricing-disclaimer">
          Proposed plans for the fictional AETHER ecosystem. No payments,
          subscriptions or live services.
        </p>
      </section>
      {checkoutPlan && (
        <section
          className="checkout section"
          id="checkout"
          aria-labelledby="checkout-title"
        >
          <div className="section-index">
            <span>06 — CHECKOUT</span>
            <span>SELECTED: {checkoutPlan.name.toUpperCase()}</span>
          </div>
          {checkoutDone ? (
            <div className="checkout-success" role="status">
              <span className="success-mark" aria-hidden="true">
                ✓
              </span>
              <p className="eyebrow">DEMO COMPLETE</p>
              <h2>
                {checkoutPlan.name === "Collective"
                  ? "Team request prepared."
                  : "Prototype checkout complete."}
              </h2>
              <p>
                {checkoutPlan.name === "Collective"
                  ? "In a production version, this request would be sent to the Aether team after email verification. Nothing was submitted from this prototype."
                  : `You completed the full ${checkoutPlan.name} onboarding flow. A production version would now verify the email and activate access. No account was created and no payment was charged here.`}
              </p>
              <button
                className="button-primary"
                onClick={() => {
                  setCheckoutDone(false);
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Change plan <Arrow />
              </button>
            </div>
          ) : (
            <div className="checkout-grid">
              <div className="checkout-summary">
                <p className="eyebrow">ORDER SUMMARY</p>
                <h2>{checkoutPlan.name}</h2>
                <p>{checkoutPlan.desc}</p>
                <ul>
                  {checkoutPlan.features.map((feature) => (
                    <li key={feature}>
                      <span>+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="checkout-total">
                  <span>{yearly ? "Yearly billing" : "Monthly billing"}</span>
                  <strong>
                    {checkoutPlan.monthly === null
                      ? "Custom quote"
                      : checkoutPlan.monthly === 0
                        ? "$0"
                        : `$${yearly ? (checkoutPlan.monthly * 0.8 * 12).toFixed(2) : checkoutPlan.monthly.toFixed(2)}`}
                  </strong>
                </div>
              </div>
              <div className="checkout-form">
                <div
                  className="checkout-progress"
                  aria-label={`Checkout step ${checkoutStep} of 3`}
                >
                  {[
                    "Account",
                    checkoutPlan.name === "Collective"
                      ? "Team"
                      : checkoutPlan.monthly === 0
                        ? "Workspace"
                        : "Payment",
                    "Review",
                  ].map((label, index) => (
                    <div
                      key={label}
                      className={checkoutStep >= index + 1 ? "active" : ""}
                    >
                      <span>{checkoutStep > index + 1 ? "✓" : index + 1}</span>
                      {label}
                    </div>
                  ))}
                </div>
                {checkoutStep === 1 && (
                  <form className="checkout-stage" onSubmit={advanceCheckout}>
                    <div>
                      <p className="eyebrow">CREATE YOUR AETHER ID</p>
                      <h3>Start with your account.</h3>
                      <p className="stage-copy">
                        Use an email and a strong password. In a production app,
                        the email would be verified before access.
                      </p>
                    </div>
                    <div className="field-row">
                      <label>
                        Full name
                        <input
                          required
                          name="name"
                          autoComplete="name"
                          defaultValue={checkoutData.name || ""}
                          placeholder="Your name"
                          minLength="2"
                        />
                      </label>
                      <label>
                        Email address
                        <input
                          required
                          type="email"
                          name="email"
                          autoComplete="email"
                          defaultValue={checkoutData.email || ""}
                          placeholder="you@example.com"
                        />
                      </label>
                    </div>
                    <div className="field-row">
                      <label>
                        Password
                        <input
                          required
                          type="password"
                          name="password"
                          autoComplete="new-password"
                          placeholder="Minimum 8 characters"
                          minLength="8"
                        />
                      </label>
                      <label>
                        Confirm password
                        <input
                          required
                          type="password"
                          name="confirmPassword"
                          autoComplete="new-password"
                          placeholder="Repeat password"
                          minLength="8"
                        />
                      </label>
                    </div>
                    {checkoutError && (
                      <p className="form-error" role="alert">
                        {checkoutError}
                      </p>
                    )}
                    <button
                      className="button-primary checkout-submit"
                      type="submit"
                    >
                      Continue <Arrow />
                    </button>
                  </form>
                )}
                {checkoutStep === 2 && (
                  <form className="checkout-stage" onSubmit={advanceCheckout}>
                    {checkoutPlan.name === "Collective" ? (
                      <>
                        <div>
                          <p className="eyebrow">TEAM PROFILE</p>
                          <h3>Tell us about your team.</h3>
                        </div>
                        <div className="field-row">
                          <label>
                            Company name
                            <input
                              required
                              name="company"
                              defaultValue={checkoutData.company || ""}
                              placeholder="Company or studio"
                            />
                          </label>
                          <label>
                            Team size
                            <select
                              required
                              name="teamSize"
                              defaultValue={checkoutData.teamSize || ""}
                            >
                              <option value="" disabled>
                                Select size
                              </option>
                              <option>2–10 people</option>
                              <option>11–50 people</option>
                              <option>51+ people</option>
                            </select>
                          </label>
                        </div>
                        <label>
                          What would your team build?
                          <textarea
                            required
                            name="teamGoal"
                            rows="4"
                            defaultValue={checkoutData.teamGoal || ""}
                            placeholder="Briefly describe your use case"
                          />
                        </label>
                      </>
                    ) : checkoutPlan.monthly === 0 ? (
                      <>
                        <div>
                          <p className="eyebrow">WORKSPACE SETUP</p>
                          <h3>Shape your starting space.</h3>
                        </div>
                        <div className="field-row">
                          <label>
                            Workspace name
                            <input
                              required
                              name="workspace"
                              defaultValue={checkoutData.workspace || ""}
                              placeholder="My workspace"
                            />
                          </label>
                          <label>
                            Primary use
                            <select
                              required
                              name="primaryUse"
                              defaultValue={checkoutData.primaryUse || ""}
                            >
                              <option value="" disabled>
                                Select a use
                              </option>
                              <option>Writing and ideas</option>
                              <option>Research</option>
                              <option>Creative exploration</option>
                              <option>Development</option>
                            </select>
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="eyebrow">BILLING DETAILS</p>
                          <h3>Complete your payment profile.</h3>
                          <p className="stage-copy">
                            Demo fields only. Never enter a real card number.
                          </p>
                        </div>
                        <div className="demo-notice">
                          Use the test number 4242 4242 4242 4242. Values stay
                          in this browser and are discarded.
                        </div>
                        <label>
                          Name on card
                          <input
                            required
                            name="cardName"
                            autoComplete="off"
                            defaultValue={checkoutData.cardName || ""}
                            placeholder="Name shown on card"
                          />
                        </label>
                        <label>
                          Test card number
                          <input
                            required
                            name="cardNumber"
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="4242 4242 4242 4242"
                            pattern="4242 4242 4242 4242"
                            title="Use the demo card number shown"
                          />
                        </label>
                        <div className="field-row compact">
                          <label>
                            Expiry
                            <input
                              required
                              name="expiry"
                              autoComplete="off"
                              placeholder="12 / 30"
                              pattern="(0[1-9]|1[0-2]) / [0-9]{2}"
                            />
                          </label>
                          <label>
                            CVC
                            <input
                              required
                              name="cvc"
                              inputMode="numeric"
                              autoComplete="off"
                              placeholder="123"
                              pattern="[0-9]{3}"
                            />
                          </label>
                        </div>
                        <div className="field-row">
                          <label>
                            Country
                            <select
                              required
                              name="country"
                              defaultValue={checkoutData.country || ""}
                            >
                              <option value="" disabled>
                                Select country
                              </option>
                              <option>India</option>
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Other</option>
                            </select>
                          </label>
                          <label>
                            Postal code
                            <input
                              required
                              name="postalCode"
                              defaultValue={checkoutData.postalCode || ""}
                              placeholder="Postal code"
                              minLength="3"
                            />
                          </label>
                        </div>
                      </>
                    )}
                    <div className="stage-actions">
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => setCheckoutStep(1)}
                      >
                        ← Back
                      </button>
                      <button className="button-primary" type="submit">
                        Review order <Arrow />
                      </button>
                    </div>
                  </form>
                )}
                {checkoutStep === 3 && (
                  <div className="checkout-stage review-stage">
                    <div>
                      <p className="eyebrow">FINAL REVIEW</p>
                      <h3>Check everything once.</h3>
                    </div>
                    <dl>
                      <div>
                        <dt>Account</dt>
                        <dd>
                          {checkoutData.name}
                          <small>{checkoutData.email}</small>
                        </dd>
                      </div>
                      <div>
                        <dt>Plan</dt>
                        <dd>
                          {checkoutPlan.name}
                          <small>
                            {yearly ? "Yearly billing" : "Monthly billing"}
                          </small>
                        </dd>
                      </div>
                      <div>
                        <dt>
                          {checkoutPlan.name === "Collective"
                            ? "Team"
                            : checkoutPlan.monthly === 0
                              ? "Workspace"
                              : "Payment"}
                        </dt>
                        <dd>
                          {checkoutPlan.name === "Collective"
                            ? checkoutData.company
                            : checkoutPlan.monthly === 0
                              ? checkoutData.workspace
                              : `Test card ending ${checkoutData.cardLast4}`}
                          <small>
                            {checkoutPlan.name === "Collective"
                              ? checkoutData.teamSize
                              : checkoutPlan.monthly === 0
                                ? checkoutData.primaryUse
                                : "Demo payment method"}
                          </small>
                        </dd>
                      </div>
                    </dl>
                    <label className="confirm-check">
                      <input required type="checkbox" />{" "}
                      <span>
                        I understand this is a product prototype. No real
                        account, payment, or subscription will be created.
                      </span>
                    </label>
                    <div className="stage-actions">
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => setCheckoutStep(2)}
                      >
                        ← Back
                      </button>
                      <button
                        className="button-primary"
                        type="button"
                        onClick={(e) => {
                          const checkbox = e.currentTarget
                            .closest(".review-stage")
                            .querySelector("input[type=checkbox]");
                          if (!checkbox.reportValidity()) return;
                          finishCheckout();
                        }}
                      >
                        {checkoutPlan.name === "Collective"
                          ? "Submit team request"
                          : "Confirm prototype order"}
                        <Arrow />
                      </button>
                    </div>
                  </div>
                )}
                <p className="checkout-legal">
                  Secure product-flow prototype. Form values remain local to
                  this page and are never transmitted.
                </p>
              </div>
            </div>
          )}
        </section>
      )}
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
        <p className="eyebrow">
          AETHER /{" "}
          {models.some((m) => m.name === modal)
            ? "MODEL DETAIL"
            : "DEVELOPER CONCEPT"}
        </p>
        <h2 id="dialog-title">{modal}</h2>
        {models.some((m) => m.name === modal) ? (
          (() => {
            const model = models.find((m) => m.name === modal);
            return (
              <div className="model-detail">
                <div className="detail-lead">
                  <span className="detail-symbol" aria-hidden="true">
                    {model.symbol}
                  </span>
                  <p>{model.bestFor}</p>
                </div>
                <div className="detail-columns">
                  <div>
                    <h3>Core capabilities</h3>
                    <ul>
                      {model.capabilities.map((capability) => (
                        <li key={capability}>
                          <span>+</span>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Try asking</h3>
                    <blockquote>“{model.sample}”</blockquote>
                  </div>
                </div>
                <p className="concept-note">
                  Aether {model.name.replace("Aether ", "")} is a fictional
                  product concept, not a deployed AI service.
                </p>
              </div>
            );
          })()
        ) : (
          <p>
            The proposed API brings Spark, Atlas and Prism behind a common
            generate interface. The examples on this page demonstrate the
            intended developer experience; the SDK and endpoint are not live.
          </p>
        )}
        <button className="button-primary" onClick={() => setModal(null)}>
          Back to models <Arrow />
        </button>
      </dialog>
    </>
  );
}
