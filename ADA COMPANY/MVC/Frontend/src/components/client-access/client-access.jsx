import React from "react";
import { Link } from "react-router-dom"; 
import styles from "./client.module.css";
import { getImageUrl } from "../../utils";
import { Navigate } from 'react-router-dom';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export const AcessoCliente = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <section className={styles.container} id="experience">
    <h2 className={styles.title}>Usuário</h2>
    <div className={styles.content}>
      <div className={styles.skills}>
        {skills.map((skill, id) => {
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