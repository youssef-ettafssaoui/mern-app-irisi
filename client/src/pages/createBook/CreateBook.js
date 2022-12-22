import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import Loading from "../utils/loading/Loading";

const initialState = {
  book_id: "",
  title: "",
  author: "",
  price: 0,
  description:
    "Lorem reprehenderit voluptate nulla minim incididunt do veniam velit pariatur in laboris.",
  content:
    "Nulla tempor deserunt exercitation officia sint nulla incididunt in in. Ut ullamco laborum ea commodo ullamco voluptate. Officia anim dolore est veniam id non.",
  category: "",
  _id: "",
};

function CreateBook() {
  const state = useContext(GlobalState);
  const [book, setBook] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useNavigate();
  const param = useParams();

  const [books] = state.booksAPI.books;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.booksAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      books.forEach((book) => {
        if (book._id === param.id) {
          setBook(book);
          setImages(book.images);
        }
      });
    } else {
      setOnEdit(false);
      setBook(initialState);
      setImages(false);
    }
  }, [param.id, books]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin !");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large !");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect !");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin !");
      if (!images) return alert("No Image Upload !");

      if (onEdit) {
        await axios.put(
          `/api/books/${book._id}`,
          { ...book, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/books",
          { ...book, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className="create_book">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="book_id">Book ID</label>
          <input
            type="text"
            name="book_id"
            id="book_id"
            required
            value={book.book_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={book.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            required
            value={book.author}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={book.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={book.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={book.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={book.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateBook;
