import PropTypes from "prop-types";

const Paginaiton = ({ currentPage, numberOfPages, onClick, limit }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                </li>
                {Array.from({ length: numberOfPages }, (_, index) => index + 1).map((pageNumber) => {
                    return (
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                            <div
                                className="page-link cursor-pointer"
                                onClick={() => {
                                    onClick(pageNumber);
                                }}
                            >
                                {pageNumber}
                            </div>
                        </li>
                    );
                })}
                <li className="page-item">
                    <a className="page-link" href="#">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Paginaiton.propTypes = {
    currentPage: PropTypes.number,
    numberOfPages: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    limit: PropTypes.number,
};

Paginaiton.defaultProps = {
    currentPage: 1,
    limit: 5,
};

export default Paginaiton;
