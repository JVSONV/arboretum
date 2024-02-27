import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const Password = (props: {
  showFormHandler: Dispatch<SetStateAction<boolean>>;
  showInputHandler: Dispatch<SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState("");
  const [showAcceptance, setShowAcceptance] = useState(false);
  const initialInput = useRef<HTMLInputElement | null>(null);

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value === "grow") {
      initialInput.current!.blur();
      setShowAcceptance((prev) => !prev);
      setTimeout(() => {
        props.showInputHandler((prev) => !prev);
      }, 3000);
      setTimeout(() => {
        props.showFormHandler((prev: any) => !prev);
      }, 3000);
    }
  };

  return (
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
        placeholder="Password"
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
  );
};

export default Password;
