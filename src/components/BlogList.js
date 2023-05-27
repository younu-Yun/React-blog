import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        const response = await axios.get("http://localhost:3002/posts");
        const data = response.data;

        setPosts(data);
        setLoading(false);
    };

    const deleteBlog = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await axios.delete(`http://localhost:3002/posts/${id}`);
            alert("삭제되었습니다.");
            console.log("게시물이 삭제되었습니다:", response.data);

            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (error) {
            console.log("게시물 삭제를 실패했습니다:", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const renderBlogList = () => {
        if (loading) {
            return <LoadingSpinner />;
        }

        if (posts.length === 0) {
            return <div className="d-flex justify-content-center">No blog posts found</div>;
        }

        return posts
            .filter(({ publish }) => isAdmin || publish)
            .map(({ title, id }) => {
                return (
                    <Card
                        key={id}
                        title={title}
                        onClick={() => {
                            navigate(`/blogs/${id}`);
                        }}
                    >
                        {isAdmin ? (
                            <div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => {
                                        deleteBlog(e, id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </Card>
                );
            });
    };

    return <>{renderBlogList()}</>;
};

BlogList.propTypes = {
    isAdmin: bool,
};

BlogList.defaultProps = {
    isAdmin: false,
};

export default BlogList;
