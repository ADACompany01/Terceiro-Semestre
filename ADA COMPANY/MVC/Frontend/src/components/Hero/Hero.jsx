import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Olá, eu sou Ada</h1>
        <p className={styles.description}>
          Sou sua assistente adaptativa. Minha missão é tornar seu sistema acessível para todos!
        </p>
        <a href="mailto:ada2024fatec.mrs@outlook.com" className={styles.contactBtn}>
          Entre em contato
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};