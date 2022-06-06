import React, { useEffect, useState } from "react";


export default function ImagePost() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [image, setImage] = useState([]);
    
    function findLabel(image) {
    
        
        let monResult = "coucou"
        isLoaded ? "Loading..." : image.data.forEach((img) => {
                monResult = img.attributes.photo.data[0].attributes.formats.large.url
        });
        // console.log(monResult)
        return monResult
    }
    useEffect(() => {
        fetch("http://localhost:1337/api/photos?populate=*", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(response => {
                //   console.log(response)
                setImage(response);
                setIsLoaded(false);
            })
            .catch((err) => console.error(err));        
            findLabel(image)
        }, []);

    
        return (
      <> {isLoaded ? "Loading..." : image.data.map((img) =>
          <div key={img.id}>
              <h2>{img.attributes.name}</h2>
              <div >{img.attributes.slug}</div>
              {/* {findLabel(image)} */}
              </div>
                )}
      </>
  )
}
