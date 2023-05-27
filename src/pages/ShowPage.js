import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPost = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/posts/${id}`);
            setLoading(false);
            setPost(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPost(id);
    }, [id]);

    const printDate = (tiemstamp) => {
        return new Date(tiemstamp).toLocaleString();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                <div>
                    <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
                        Edit
                    </Link>
                </div>
            </div>
            <small className="text-muted">Created At: {printDate(post.createdAt)}</small>
            <hr></hr>
            <div>
                <span>{post.body}</span>
            </div>
        </div>
    );
};

export default ShowPage;
