import React, { useEffect, useState } from "react";
import ImagePost from "./ImagePost";
import FetchTry from "../pages";

export default function Posts() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/spots?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        //   console.log(response)
        setPosts(response);
        setIsLoaded(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Liste des articles</h1>
      <FetchTry />
      <h1>Liste des articles</h1>
      {isLoaded
        ? "Loading..."
        : posts.data.map((post) => (
            <>
              <h2 key={post.id}>{post.attributes.name}</h2>
              <div>{post.attributes.country}</div>
              {/* {console.log(post.attributes.photos.data)} */}
                <ImagePost id={post.id} />
            </>
          ))}
    </>
  );
}
