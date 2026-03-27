import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import { useState } from "react";
import { BarChart, FlashOn, Settings } from "@mui/icons-material";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import LoginModal from "../../components/LoginModal/LoginModal";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div>
      <Header onOpenLoginModal={() => setIsLoginModalOpen(true)} />
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      <section className={styles.hero}>
        <div className={styles.glowLeft}></div>
        <div className={styles.glowRight}></div>
        <h1>Organize suas tarefas de forma prática e fácil!</h1>
        <p>
          Cansado de perder prazos e nunca concluir suas atividades? Essa é a
          plataforma que você estava procurando para nunca mais esquecer uma
          tarefa importante
        </p>
        <div className={styles.buttonWrapper}>
          <Button buttonContent="Quero conhecer!" />
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader}>
          <span>Funcionalidades</span>
          <h2>O que oferecemos para você</h2>
        </div>

        <div className={styles.featuresGrid}>
          <Card
            icon={<FlashOn />}
            title="Foco Total"
            description="Interface fácil e intuitiva para você focar no que realmente importa"
          />
          <Card
            icon={<BarChart />}
            title="Produtividade"
            description="Acompanhe o seu progresso e veja quantas tarefas você concluiu na semana"
          />
          <Card
            icon={<Settings />}
            title="Sincronização"
            description="Acesse suas atividades de qualquer dispositivo, em qualquer lugar"
          />
        </div>

        <div className={styles.featuresFooter}>
          <p>
            E o melhor, tudo isso de <span>graça!</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
