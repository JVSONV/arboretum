"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import Form from "./components/Form";
import Password from "./components/Password";

export default function Home() {
  const [showInput, setShowInput] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  //   if (event.target.value === "grow") {
  //     initialInput.current!.blur();
  //     setShowAcceptance((prev) => !prev);
  //     setTimeout(() => {
  //       setShowInput((prev) => !prev);
  //     }, 3000);
  //     setTimeout(() => {
  //       setShowForm((prev) => !prev);
  //     }, 3000);
  //   }
  // };

  // const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (password === "grow") {
  //   }
  // };


  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {showInput && <Password showFormHandler={setShowForm} showInputHandler={setShowInput}/>}
        {showForm && (
          <Form formIsSubmitted={setIsSubmitted} formIsVisable={setShowForm} />
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
