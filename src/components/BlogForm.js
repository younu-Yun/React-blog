import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [publish, setPublish] = useState(false);
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalBody, setoriginalBody] = useState("");
    const [originalPublish, setOriginalPublish] = useState(false);

    useEffect(() => {
        if (editing) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3002/posts/${id}`);
                    const data = response.data;
                    setTitle(data.title);
                    setBody(data.body);
                    setPublish(data.publish);
                    setOriginalTitle(data.title);
                    setoriginalBody(data.body);
                    setOriginalPublish(data.publish);
                } catch (error) {
                    console.error("오류가 발생했습니다:", error);
                }
            };

            fetchData();
        }
    }, [id, editing]);

    const isEdited = () => {
        //True, False로 return 값이 나옴
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    };

    const goBack = () => {
        if (editing) {
            navigate(`/blogs/${id}`);
        } else {
            navigate(`/blogs`);
        }
    };

    const onChangePublish = (e) => {
        console.log(e.target.checked);
        return setPublish(e.target.checked);
    };

    const onSubmit = async () => {
        if (editing) {
            try {
                const response = await axios.patch(`http://localhost:3002/posts/${id}`, {
                    title: title,
                    body: body,
                    publish,
                });

                console.log("게시글이 수정되었습니다:", response.data);
                navigate(`/blogs/${id}`);
            } catch (error) {
                console.error("오류가 발생했습니다:", error);
            }
        } else {
            try {
                const response = await axios.post("http://localhost:3002/posts", {
                    title: title,
                    body: body,
                    publish,
                    createdAt: Date.now(),
                });

                console.log("게시글이 등록되었습니다:", response.data);
                navigate("/admin");
            } catch (error) {
                console.error("오류가 발생했습니다:", error);
            }
        }
    };

    return (
        <div>
            <h1>{editing ? "Edit" : "Create"} a blog post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    className="form-control"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                    className="form-control"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                    rows={10}
                />
            </div>
            <div className="form-check mb-3">
                <input type="checkbox" id="privatePost" className="form-check-input" checked={publish} onChange={onChangePublish} />
                <label className="form-check-label">Publish</label>
            </div>
            <div className="d-flex">
                <button className="btn btn-primary" onClick={onSubmit} disabled={editing && !isEdited()}>
                    {editing ? "Edit" : "Post"}
                </button>
                <button className="btn btn-danger ms-2" onClick={goBack}>
                    Cancle
                </button>
            </div>
        </div>
    );
};

BlogForm.propTypes = {
    editing: bool,
};

BlogForm.defaultTypes = {
    editing: false,
};

export default BlogForm;
