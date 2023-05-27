import PropTypes from "prop-types";

const Card = ({ title, children, onClick }) => {
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body py-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    );
};

Card.prototype = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onclick: PropTypes.func,
};

Card.defaultProps = {
    children: null,
    onClick: () => {},
};
export default Card;
