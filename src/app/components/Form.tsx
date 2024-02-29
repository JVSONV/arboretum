import { motion, useAnimate } from "framer-motion";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../page.module.css";
import Company from "./Company";

const Form = (props: {
  formStageIsVisable: Dispatch<SetStateAction<boolean>>;
  formIsSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let moveTop = 0;
    const userAgent = navigator.userAgent.toLowerCase();
    if (
      userAgent.includes("iphone") ||
      userAgent.includes("ipad") ||
      userAgent.includes("ipod") ||
      userAgent.includes("android")
    ) {
      moveTop = 3;
    } else {
      let windowHeight = window.innerHeight / 4
      moveTop = Math.floor(windowHeight)
    }
    setTimeout(() => {
      setShowForm(true);
      animate(scope.current, { top: moveTop }, { duration: 1 });
    }, 3000);
  });

  const [scope, animate] = useAnimate();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    response: string;
    linkedIn: string;
  }>({
    name: "",
    email: "",
    response: "",
    linkedIn: "",
  });

  const submitButton = useRef<HTMLButtonElement>(null);

  const formDataHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    submitButton.current!.disabled = true;
    e.preventDefault();

    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        props.formStageIsVisable((prev: boolean) => !prev);
        props.formIsSubmitted((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div ref={scope} className={styles.formStage}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className={styles.company}
      >
        <Company />
      </motion.h1>
      {showForm && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          className={styles.inputForm}
          onSubmit={onFormSubmit}
        >
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => formDataHandler(e)}
              value={formData.name}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => formDataHandler(e)}
              value={formData.email}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="response" className={styles.lastLabel}>
              How will AI change the world?:
            </label>
            <textarea
              name="response"
              id="response"
              onChange={(e) => formDataHandler(e)}
              value={formData.response}
              required
            ></textarea>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="linkedIn">LinkedIn:</label>
            <input
              type="url"
              name="linkedIn"
              id="linkIn"
              onChange={(e) => formDataHandler(e)}
              value={formData.linkedIn}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Who told you?:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => formDataHandler(e)}
              value={formData.name}
              required
            />
          </div>
          <button ref={submitButton} className={styles.submit} type="submit">
            submit
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default Form;
