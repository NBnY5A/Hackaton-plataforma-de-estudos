import styles from "./Card.module.css";

const Card = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardBody}>{description}</div>
    </div>
  );
};

export default Card;
