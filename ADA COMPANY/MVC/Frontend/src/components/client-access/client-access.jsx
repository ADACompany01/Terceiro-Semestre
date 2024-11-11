import React from "react";

import styles from "./client.module.css";
import skills from "../../data/client.json";
import { getImageUrl } from "../../utils";

export const AcessoCliente = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Usuário</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
