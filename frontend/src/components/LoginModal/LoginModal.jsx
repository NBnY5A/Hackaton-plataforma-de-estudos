import { useState } from "react";
import Button from "../Button/Button";
import styles from "./LoginModal.module.css";
import { Close } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true)

    try {
      await login(email, password);
      onClose();
    } catch (error) {
      setError("Usuário ou senha inválido!");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.iconCloseButton} onClick={onClose}>
          <Close />
        </button>

        <div className={styles.header}>
          <h2>Bem-vindo de volta</h2>
          <p>Insira seus dados para acessar sua conta</p>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.actions}>
          <Button buttonContent="Entrar na conta" type="submit"/>
          </div>

        </form>
        
        <div className={styles.footer}>
          <p>
            Não possui uma conta? <span className={styles.signupLink}>Registrar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
