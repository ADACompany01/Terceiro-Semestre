import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa o JS do Bootstrap (inclui Popper.js)
import '../Home/Home.css'; // Importa o CSS da Home
import Footer from '../../components/Footer/Footer'; // Importa o Footer

const Home = () => {
  const scrollToSection = () => {
    const carrosel = document.getElementById('botao');
    carrosel.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="overlay">
      <section className="home-section">
        <div className="home-content">
          <h1 id="bemvindo">Bem-vindo à ADA Company</h1>
          <p id="slogan">Transformando pixels em inclusão para todos!</p>
          <button className="cta-button" onClick={scrollToSection} id="botao">
            Conheça Mais
          </button>
        </div>
        <section className="carrosel">
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/img/Criança 1.jpeg" className="d-block w-100" alt="Imagem 1" id="img1" />
              </div>
              <div className="carousel-item">
                <img src="/img/Idoso.jpeg" className="d-block w-100" alt="Imagem 2" id="img2" />
              </div>
              <div className="carousel-item">
                <img src="/img/exemplo-daltonism.png" className="d-block w-100" alt="Imagem 3" id="img3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <h2>Buscamos o máximo de comprometimento com o seu serviço!</h2>
          <section className="video-section">
            <video controls width="100%">
              <source src="/vdo/ada_pitch.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>

          <h3>Celia Almeida</h3>
          <form className="elogio">
            <img
              src="https://static.wixstatic.com/media/845052_307fd97f0e644d2a92994edaaae08ee1~mv2_d_1557_1555_s_2.png/v1/crop/x_0,y_20,w_1557,h_1535/fill/w_240,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Eloisa%20Faltoni%20-%20foto%20redonda.png"
              alt=""
              height="100px"
            />
            <p>
              " Sou imensamente grata aos serviços prestados pela ADA, <br /> o aumento de acessos em nosso site com a
              facilidade de uso dele está nos fazendo decolar! "
            </p>
          </form>
          <h4>Marcos Alves</h4>
          <form className="elogio2">
            <p>
              " Vocês são uma das poucas, se não a única empresa que se preocupa de verdade com a acessibilidade dos
              clientes e dos próprios funcionários. "
            </p>
            <img
              src="https://tarjeta-de-presentacion.grupoceres.com.mx/wp-content/uploads/2019/09/cropped-cropped-cropped-foto-perfil-2-redondo-1.png"
              alt=""
              id="marcos"
              height="100px"
            />
          </form>
          <h2 id="sloganfim">Venha fazer parte você também!</h2>
        </section>
      </section>
      <Footer />
    </section>
  );
};

export default Home;