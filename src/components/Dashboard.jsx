import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [movies, setMovies] = useState();

  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newRealeaseDate, setNewRealeaseDate] = useState();
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  // update title state
  const [updateMovieTitle, setUpdateMovieTitle] = useState("");

  // Collecting our db data from firestore
  const movieCollectionRef = collection(db, "movies");
  const getMovies = async () => {
    try {
      const res = await getDocs(movieCollectionRef); //read data
      const data = res;
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovies(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // add a new movie
  const onCreateMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newRealeaseDate,
        gotAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid
      });
      window.alert(" New movie created");
      setNewMovieTitle("");
      setNewRealeaseDate("");
      setNewMovieOscar("");
      getMovies();
    } catch (err) {
      console.error(err.message);
    }
  };

  // delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovies();
  };

  // update movie
  const updateMovie = async (id) => {
    const movieDoc2 = doc(db, "movies", id);
    await updateDoc(movieDoc2, { title: updateMovieTitle });
    getMovies();
  };

  // edit title
  // const editTitle = async (e) => {
  //   try {
  //     setNewMovieTitle({ ...movies, [e.target.value]: newMovieTitle });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // logging out user
  const logOut = async () => {
    try {
      await signOut(auth);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <p>{`Welcome ${auth?.currentUser?.email}`}</p>

        <button onClick={logOut}>Logout</button>
      </div>

      {/* creating new movies */}
      <div className="newMovieForm">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => [
            setNewMovieTitle(e.target.value),
            setUpdateMovieTitle(e.target.value),
          ]}
          value={newMovieTitle}
        />
        <br />
        <input
          type="number"
          placeholder="release data"
          onChange={(e) => setNewRealeaseDate(Number(e.target.value))}
          value={newRealeaseDate}
        />
        <br />
        <input
          type="checkbox"
          id="label"
          onChange={(e) => setNewMovieOscar(e.target.checked)}
          checked={newMovieOscar}
        />
        <label htmlFor="">Release date</label> <br />
        <button onClick={onCreateMovie}>Create</button>
      </div>

      <section className="movieList">
        {movies &&
          movies.map((movie) => (
            <div key={movie.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  alignContent: "center",
                }}
              >
                <h2>{movie.title}</h2> 
                {/* <button onClick={editTitle}>edit</button> */}
              </div>
              <h4>Release Date: {movie.releaseDate}</h4>

              <button onClick={() => updateMovie(movie.id)}>update</button>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete movie
              </button>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Dashboard;
