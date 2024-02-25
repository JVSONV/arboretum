import { motion } from "framer-motion";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import styles from "../page.module.css";

const Form = (props: {
  formIsVisable: Dispatch<SetStateAction<boolean>>;
  formIsSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
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
  const formRef = useRef<HTMLFormElement>(null);

  const formDataHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // if (e.target.value.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const scriptUrl = `${process.env.API_URL}`;

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        props.formIsVisable((prev: boolean) => !prev);
        props.formIsSubmitted((prev) => !prev);
        const data = res.body?.getReader();
        const reeed = await data?.read();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.company}
      >
        arboretum
      </motion.h1>
      <motion.form
        ref={formRef}
        className={styles.inputForm}
        onSubmit={(e) => onFormSubmit(e)}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => formDataHandler(e)}
            value={formData.name}
            autoFocus
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
            autoFocus
            required
          />
        </div>
        <button className={styles.submit} type="submit">
          submit
        </button>
      </motion.form>
    </div>
  );
};

export default Form;
