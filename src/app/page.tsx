"use client";
import { useState, useRef, FormEvent, ChangeEvent, Ref } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import Form from "./components/Form"

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
          <Form formIsSubmitted={setIsSubmitted} formIsVisable={setShowForm}/>
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
