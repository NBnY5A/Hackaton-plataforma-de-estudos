import styles from "./Button.module.css";

const Button = ({ onClick, buttonContent }) => {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {buttonContent}
    </button>
  );
};

export default Button;
