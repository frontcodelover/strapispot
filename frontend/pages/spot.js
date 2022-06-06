import React, {useState, useEffect} from "react";


export default function spot() {


    const [id, setId] = useState(null);

    useEffect(() => {
    const spot = fetch("http://localhost:1337/api/spots", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const myId = response.data[0].attributes.name;
            setId(myId);
            const result =""
            response.data.forEach(element => {
                result = element.attributes
            });
            console.log(result.name);
        })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <h1>{id}</h1>
        </>
    )

}