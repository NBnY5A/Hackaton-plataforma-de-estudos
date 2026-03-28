import styles from "./Button.module.css";

const Button = ({ onClick, buttonContent, type }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {buttonContent}
    </button>
  );
};

export default Button;
