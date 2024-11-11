import React from "react";

import styles from "./admin.module.css";
import admin from "../../data/admin.json";
import { getImageUrl } from "../../utils";

export const AcessoAdmin = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Administrador</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {admin.map((skill, id) => {
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
