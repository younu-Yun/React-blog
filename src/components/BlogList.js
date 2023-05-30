import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Paginaiton from "./Pagination";
import { bool } from "prop-types";

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    let limit = 10;

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    const getPosts = async (page = 1) => {
        setCurrentPage(page);
        let params = {
            _page: page,
            _limit: limit,
            _id: "id",
            _order: "desc",
        };

        if (!isAdmin) {
            params = { ...params, publish: true };
        }

        const response = await axios.get(`http://localhost:3002/posts`, {
            params,
        });

        const data = response.data;
        setNumberOfPosts(response.headers["x-total-count"]);
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

        return posts.map(({ title, id }) => {
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

    return (
        <>
            {renderBlogList()}
            {numberOfPages > 1 && <Paginaiton currentPage={currentPage} numberOfPages={numberOfPages} onClick={getPosts} />}
        </>
    );
};

BlogList.propTypes = {
    isAdmin: bool,
};

BlogList.defaultProps = {
    isAdmin: false,
};

export default BlogList;
