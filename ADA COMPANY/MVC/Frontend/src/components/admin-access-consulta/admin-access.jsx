import React from "react";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import styles from "./admin.module.css";
import admin from "../../data/admin-consulta.json";
import { getImageUrl } from "../../utils";

export const AcessoAdmin = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Consulta</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {admin.map((skill, id) => {
            return (
              <Link to={skill.link} key={id} className={`${styles.skill} ${styles.link}`}>
                <div className={styles.skillImageContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
