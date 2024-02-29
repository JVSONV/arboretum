"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import Form from "./components/Form";
import Password from "./components/Password";

export default function Home() {
  const [showInput, setShowInput] = useState(true);
  const [showFormStage, setShowFormStage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {showInput && (
          <Password
            showFormHandler={setShowFormStage}
            showInputHandler={setShowInput}
          />
        )}
        {showFormStage && (
          <Form formIsSubmitted={setIsSubmitted} formStageIsVisable={setShowFormStage} />
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
