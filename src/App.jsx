import React, { useEffect, useState } from 'react';

// API
import Tmdb from './Tmdb';

// Componentes
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

// CSS
import './App.css';

export default () => {

  // Criar States
  // State de lista de filmes
  const [movieList, setMovieList] = useState([]);

  // State dos filmes em destaque 
  const [featuredData, setFeaturedData] = useState(null);

  // Udança do background do Header
  const [blackHeaderBg, setBlackHeaderBg] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegar lista total dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o filme em destaque (lista de destaques)
      let originals = list.filter(i => i.slug === 'originals');

      // Pegar um filme aleatório da lista de originais
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeaderBg(true);
      }
      else {
        setBlackHeaderBg(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    // Header, Destaque, Listas, Rodapé básico (dar direitos de imagem e API)
    <div className="page">
      <Header bg={blackHeaderBg} />

      {
        featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito por <a href="https://github.com/AlissonCiprian0" target="__blank">Alisson Cipriano</a> para fins de estudo. <br/>
        Direitos de imagem para a <a href="https://www.netflix.com/br" target="__blank">Netflix</a> <br/>
        Dados tirados do site <a href="https://www.themoviedb.org/?language=pt-BR" target="__blank">The Movie Database</a> <br/>
        &#123; <span role="img" aria-label="robot">🤖</span> &#125;
      </footer>
      
      {movieList.length <= 0 &&
        <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando..." />
        </div>
      }
    </div>
  );
};