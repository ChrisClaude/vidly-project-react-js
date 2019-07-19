import React, {Component} from 'react';
import MoviesTable from './moviesTable'
import {getMovies} from '../services/fakeMovieService';
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    };

    // componentDidMount(called when an instance of this component is rendered in the DOM) is the right place to call back end services
    // so in a real world app this is where to initialize state properties
    // like the genres and movies
    componentDidMount() {
        // getting the array return by getGenres and adding another genre which is 'All genres'
        const genres = [{name: 'All genres'}, ...getGenres()];

        this.setState({movies: getMovies(), genres})
    }

    handleDelete = (movie) => {
        // object destructuring
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies: movies}); // the previous expression is an alternative of (only when the key and value are the same) this.setState({movies: movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);

        movies[index].liked = !movies[index].liked;

        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        // here we're setting currentPage to 1 so that when we
        this.setState({selectedGenre: genre, currentPage: 1})
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;


        if (count === 0)
            return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;


        const movies = paginate(filtered, currentPage, pageSize);

        return (<div className="row">
            <div className="col-3">
                <ListGroup
                    items={this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}
                />
            </div>
            <div className="col">
                <p>Showing {filtered.length} movies in the database.</p>
                <MoviesTable
                    movies={movies}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}/>
                <Pagination
                    itemsCount={filtered.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>
            </div>

        </div>);
    }

}

export default Movies;