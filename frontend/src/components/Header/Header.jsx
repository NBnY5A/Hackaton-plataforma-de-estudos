import { MenuBook } from "@mui/icons-material";
import styles from "./Header.module.css";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoArea}>
        <MenuBook className={styles.logoIcon} />
        <span className={styles.logoText}>MyTasksHub</span>
      </div>

      <div className={styles.centerArea}>
        <h1 className={styles.platformName}>Seja Bem-Vindo</h1>
      </div>

      <div className={styles.buttonArea}>
        <Button onClick={/ TODO /} buttonContent="Registrar" />
        <Button onClick={/ TODO /} buttonContent="Login" />
      </div>
    </header>
  );
};

export default Header;
