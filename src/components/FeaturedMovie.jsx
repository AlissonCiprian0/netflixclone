import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {
    // Manipular informações necessárias do filme
    // Data de lançamento do filme
    let firstDate = new Date(item.first_air_date);

    // Gêneros do filme
    let genres = [];

    for(let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    return (
        <section
            className="featured"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}
        >
            <div className="featured--vertical-transparency">
                <div className="featured--horizontal-transparency">
                    <div className="featured--name">{item.original_name}</div>

                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{ firstDate.getFullYear() }</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>

                    <div className="featured--description">
                        {item.overview}
                    </div>

                    <div className="featured--buttons">
                        <a className="featured--watch-button" href={`/watch/${item.id}`}>▶ Assistir</a>
                        <a className="featured--add-list-button" href={`/list/add/${item.id}`}>+ Minha Lista</a>
                    </div>

                    {genres.length > 0 &&
                        <div className="featured--genres">
                            <strong>Gêneros:</strong> { genres.join(', ') }
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};