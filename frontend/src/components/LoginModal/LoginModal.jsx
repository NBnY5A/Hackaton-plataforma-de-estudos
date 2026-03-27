import { useState } from "react";
import Button from "../Button/Button";
import styles from "./LoginModal.module.css";
import { Close } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";

const LoginModal = ({ onClose }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearFeedback = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    clearFeedback();
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        await register(name, email, password);
        await login(email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (error) {
      setError(error.message || "Houve um erro ao tentar autenticar");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormMode = () => {
    setIsRegisterMode((previous) => !previous);
    setName("");
    setEmail("");
    setPassword("");
    clearFeedback();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.iconCloseButton} onClick={onClose}>
          <Close />
        </button>

        <div className={styles.header}>
          <h2>{isRegisterMode ? "Crie sua conta" : "Bem-vindo de volta!"}</h2>
          <p>
            {isRegisterMode
              ? "Preencha os dados para se cadastrar"
              : "Insira seus dados para acessar sua conta"}
          </p>
        </div>

        {error && <p className={styles.errorBox}>{error}</p>}
        {success && <p className={styles.successBox}>{success}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegisterMode && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

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
            <Button
              buttonContent={
                isLoading
                  ? "Carregando..."
                  : isRegisterMode
                    ? "Cadastrar"
                    : "Entrar na conta"
              }
              type="submit"
            />
          </div>
        </form>

        <div className={styles.footer}>
          <p>
            {isRegisterMode ? "Já possui uma conta?" : "Não possui uma conta?"}{" "}
            <button
              type="button"
              className={styles.linkButton}
              onClick={toggleFormMode}
            >
              {isRegisterMode ? "Entrar" : "Registrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
