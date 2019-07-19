import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'; // we put lodash or l instead of the character _. Here _ because lodash is the optimized version of a popular JS library called underscore


const Pagination = (props) => {

    const {itemsCount, pageSize, currentPage, onPageChange} = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;

    /*
     * Creates an array of numbers
     * (positive and/or negative) progressing from
     * start up to, but not including, end.
     */
    const pages = _.range(1, pagesCount + 1);

    return (

        <nav>
            <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a className="page-link" href="#" onClick={() => onPageChange(page)}>{page}</a>
                    </li>)}
            </ul>
        </nav>

    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;