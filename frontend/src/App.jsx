import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, RotateCcw, Play, ListChecks,
  Code2, Sparkles, Terminal, Bot, Lightbulb
} from "lucide-react";
// import IfElse from ".IfElse.jsx";

const CODE = [
  "numbers = [10, 20, 30,40, 50, 60, 70, 80, 90, 100]",
  "total = 0",
  "",
  "for item in numbers:",
  "    total = total + item",
  "",
  "print(total)"
];

// One snapshot per click. Each snapshot represents the result of one executed line.
const STEPS = [
  {
    line: 0, item: null, total: null, picked: null, processed: [],
    action: "waiting", output: "", title: "Meet the robot!",
    explanation: "We will teach the robot to add every number in the list. Click Next to begin.",
    detail: "A loop repeats instructions for each item in a collection."
  },
  {
    line: 0, item: null, total: null, picked: null, processed: [],
    action: "list", output: "", title: "1. Create the list",
    explanation: "Python stores three numbers in a list called numbers: 10, 20, and 30.",
    detail: "The list is ready. The robot can visit each number one at a time."
  },
  {
    line: 1, item: null, total: 0, picked: null, processed: [],
    action: "initialize", output: "", title: "2. Start the total at zero",
    explanation: "The variable total is a box that starts with the value 0.",
    detail: "We need a starting value before we begin adding."
  },
  {
    line: 3, item: 10, total: 0, picked: 10, processed: [],
    action: "pick", output: "", title: "3. Pick the first number",
    explanation: "The loop takes the first item, 10, and stores it in the variable item.",
    detail: "The loop body is about to run with item = 10."
  },
  {
    line: 4, item: 10, total: 10, picked: 10, processed: [10],
    action: "add", output: "", title: "4. Add 10 to the total",
    explanation: "Python calculates 0 + 10. The total box now contains 10.",
    detail: "total = total + item means take the old total and add item."
  },
  {
    line: 3, item: 20, total: 10, picked: 20, processed: [10],
    action: "pick", output: "", title: "5. Pick the second number",
    explanation: "The loop moves to the next list item. Now item = 20.",
    detail: "The loop repeats the same instruction for the next item."
  },
  {
    line: 4, item: 20, total: 30, picked: 20, processed: [10, 20],
    action: "add", output: "", title: "6. Add 20 to the total",
    explanation: "Python calculates 10 + 20. The total box now contains 30.",
    detail: "The previous total is kept and updated; it is not reset to zero."
  },
  {
    line: 3, item: 30, total: 30, picked: 30, processed: [10, 20],
    action: "pick", output: "", title: "7. Pick the third number",
    explanation: "The loop moves to the last item. Now item = 30.",
    detail: "There is one number left to process."
  },
  {
    line: 4, item: 30, total: 60, picked: 30, processed: [10, 20, 30],
    action: "add", output: "", title: "8. Add 30 to the total",
    explanation: "Python calculates 30 + 30. The total box now contains 60.",
    detail: "All three list items have now been added."
  },
  {
    line: 6, item: 30, total: 60, picked: null, processed: [10, 20, 30],
    action: "done", output: "60", title: "9. Print the answer",
    explanation: "The loop is finished. print(total) displays 60 as the output.",
    detail: "The final sum is 10 + 20 + 30 = 60."
  }
];

function ValueCard({ label, value, color }) {
  return (
    <div className={`value-card ${color || ""}`}>
      <span className="value-label">{label}</span>
      <motion.strong key={String(value)} initial={{ scale: 0.75, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }}>
        {value === null || value === undefined ? "—" : value}
      </motion.strong>
    </div>
  );
}

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  const robotMessage = useMemo(() => {
    if (step.action === "pick") return `I picked ${step.picked}!`;
    if (step.action === "add") return `Adding ${step.item}...`;
    if (step.action === "done") return "We did it!";
    if (step.action === "list") return "I found the list!";
    if (step.action === "initialize") return "Starting at zero.";
    return "Ready to learn!";
  }, [step]);

  const next = () => setStepIndex((current) => Math.min(current + 1, STEPS.length - 1));
  const previous = () => setStepIndex((current) => Math.max(current - 1, 0));
  const restart = () => setStepIndex(0);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Sparkles size={21} /></div>
          <div><strong>Visual Learning Lab</strong><span>Learn code by watching it work</span></div>
        </div>
        <div className="lesson-pill"><span className="status-dot" /> PYTHON · LESSON 01</div>
      </header>

      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR FIRST LOOP</p>
          <h1>Let’s add with a <span>for loop!</span></h1>
          <p className="subtitle">Help Byte the robot add every number in the list, one step at a time.</p>
        </div>
        <div className="progress-wrap">
          <div className="progress-copy"><span>Lesson progress</span><strong>{stepIndex} / {STEPS.length - 1}</strong></div>
          <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }} /></div>
        </div>
      </section>

      <section className="workspace">
        <div className="panel code-panel">
          <div className="panel-heading">
            <div className="heading-left"><Code2 size={18} /><span>Python code</span></div>
            <span className="file-chip">lesson.py</span>
          </div>
          <div className="code-content">
            {CODE.map((line, index) => (
              <div key={index} className={`code-line ${step.line === index ? "active-line" : ""}`}>
                <span className="line-number">{index + 1}</span>
                <code>{line || " "}</code>
                {step.line === index && <motion.span layoutId="line-cursor" className="line-marker" />}
              </div>
            ))}
          </div>
          <div className="code-tip"><Lightbulb size={16} /><span>Watch the highlighted line. It matches the robot’s action.</span></div>
        </div>

        <div className="panel visual-panel">
          <div className="panel-heading">
            <div className="heading-left"><Sparkles size={18} /><span>Animation playground</span></div>
            <span className="live-chip">LIVE LESSON</span>
          </div>

          <div className="playground">
            <div className="playground-label">THE NUMBER WORKSHOP</div>
            <div className="number-shelf">
              {[10, 20, 30].map((number) => {
                const processed = step.processed.includes(number);
                const picked = step.picked === number && step.action === "pick";
                return (
                  <motion.div key={number}
                    className={`number-block ${processed ? "processed" : ""} ${picked ? "picked" : ""}`}
                    animate={{ y: picked ? -8 : 0, scale: picked ? 1.08 : 1, opacity: processed ? 0.58 : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                    <span>{number}</span>
                    <small>{processed ? "ADDED" : picked ? "PICKED!" : "NUMBER"}</small>
                  </motion.div>
                );
              })}
            </div>

            <div className="robot-scene">
              <motion.div className="robot-wrap"
                animate={{ x: step.action === "pick" ? 28 : step.action === "add" ? 75 : step.action === "done" ? 75 : 0, y: step.action === "add" ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}>
                <motion.div className="speech-bubble" key={robotMessage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  {robotMessage}
                </motion.div>
                <motion.div className="robot" animate={{ rotate: step.action === "add" ? [0, -4, 4, 0] : 0 }}>
                  <div className="antenna"><i /></div>
                  <div className="robot-head">
                    <div className="robot-eyes"><i /><i /></div>
                    <div className="robot-smile" />
                    <div className="robot-cheek left" /><div className="robot-cheek right" />
                  </div>
                  <div className="robot-body"><span className="robot-heart">✦</span><i className="robot-button" /></div>
                  <div className="robot-legs"><i /><i /></div>
                </motion.div>
                <div className="robot-name"><Bot size={13} /> BYTE</div>
              </motion.div>

              <div className="basket-area">
                <motion.div className="basket" animate={{ scale: step.action === "add" ? [1, 1.06, 1] : 1 }}>
                  <div className="basket-rim" />
                  <div className="basket-items">
                    <AnimatePresence>
                      {step.processed.map((number, i) => (
                        <motion.span key={number} initial={{ y: -34, opacity: 0, scale: 0.6 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 250, damping: 16 }} style={{ zIndex: i + 1 }}>
                          {number}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
                <span className="basket-label">TOTAL BASKET</span>
              </div>
            </div>
            <div className="scene-floor" />
            <div className="scene-caption">{step.action === "done" ? "✨ All numbers processed!" : "Robot follows the highlighted code line"}</div>
          </div>

          <div className="state-row">
            <ValueCard label="item" value={step.item} color="blue-card" />
            <ValueCard label="total" value={step.total} color="purple-card" />
            <div className="output-card">
              <span className="value-label"><Terminal size={13} /> OUTPUT</span>
              <strong>{step.output || "—"}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-row">
        <div className="explanation-card">
          <div className="step-icon"><ListChecks size={20} /></div>
          <div className="explanation-copy">
            <div className="step-count">STEP {stepIndex} OF {STEPS.length - 1}</div>
            <h2>{step.title}</h2>
            <p>{step.explanation}</p>
            <div className="detail-note"><Lightbulb size={15} /><span>{step.detail}</span></div>
          </div>
        </div>
        <div className="controls-card">
          <button className="secondary-button" onClick={restart} title="Restart lesson"><RotateCcw size={17} /><span>Restart</span></button>
          <div className="nav-buttons">
            <button className="previous-button" onClick={previous} disabled={isFirst}><ArrowLeft size={17} /> Previous</button>
            <button className="next-button" onClick={next} disabled={isLast}>{isLast ? "Lesson complete" : "Next step"} {!isLast && <ArrowRight size={17} />}</button>
          </div>
          {isLast && <div className="completion-note">🎉 Great work! The final answer is 60.</div>}
        </div>
      </section>
      {/* <IfElse /> */}
      <footer><span>MADE FOR CURIOUS BEGINNERS</span><span>Understand it · Visualize it · Practice it</span></footer>
    </main>
  );
}