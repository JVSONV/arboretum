"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";

export default function Home() {
  const [password, setPassword] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showAcceptance, setShowAcceptance] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialInput = useRef<HTMLInputElement | null>(null);

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value === "grow") {
      initialInput.current!.blur();
      setShowAcceptance((prev) => !prev);
      setTimeout(() => {
        setShowInput((prev) => !prev);
      }, 3000);
      setTimeout(() => {
        setShowForm((prev) => !prev);
      }, 3000);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "grow") {
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm((prev) => !prev);
    setIsSubmitted((prev) => !prev);
  };

  const company = "arboretum";

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {showInput && (
          <motion.div
            className={styles.container}
            key={"password"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            exit={{ opacity: 0 }}
          >
            <input
              ref={initialInput}
              className={styles.passwordInput}
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={passwordChange}
              autoFocus
              required
            />
            <div className={styles.accessContainer}>
              {showAcceptance && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 1.5 }}
                  className={styles.success}
                >
                  Permission Granted
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
        {showForm && (
          <div className={styles.container}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={styles.company}
            >
              arboretum
            </motion.h1>
            <motion.form className={styles.inputForm} onSubmit={onFormSubmit}>
              <div className={styles.inputContainer}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" autoFocus required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="response" className={styles.lastLabel}>
                  How will AI change the world?:
                </label>
                <textarea name="response" id="response" required></textarea>
              </div>
              <button className={styles.submit} type="submit">
                submit
              </button>
            </motion.form>
          </div>
        )}
        {isSubmitted && (
          <div className={styles.submitted}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              <h2>Now,</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 5 }}
            >
              <h2>we grow.</h2>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
