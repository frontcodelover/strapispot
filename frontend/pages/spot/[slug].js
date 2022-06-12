import React from "react";
import Image from "next/image";
import SunsetAndSunriseTimeAPI from "../../components/sunsetAndSunriseTimeAPI/SunsetAndSunriseAPI";
import { AiFillLike } from 'react-icons/ai'
import {BsFillGeoFill}  from 'react-icons/bs'

const { API_URL } = process.env;

function Spot({ spot }) {

  const date = new Date(spot.attributes.updatedAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
    const dateFormat = date.toLocaleDateString("fr-FR", options);
    
    const latitude = spot.attributes.lat;
    const longitude = spot.attributes.lon;


  return (
    <div className="container max-w-screen-xl flex py-9 text-zinc-600 text-justify">
      <div className="w-3/6">
        <Image
          src={
            API_URL +
            spot.attributes.photos.data[0].attributes.formats.large.url
          }
          alt={spot.attributes.name}
          width={1200}
          height={1200}
          className="object-cover rounded-l-3xl"
        />
      </div>
      <div className="w-4/6 px-12">
        <h1 className="font-bold text-3xl text-zinc-900">{spot.attributes.name}</h1>
        <div className="flex text-xl font-semibold uppercase text-zinc-600 ">
                  {spot.attributes.country} <div className="\01f1ee\01f1f9"></div>
                  <p >&#x1f1ee;&#x1f1f9;</p>
        </div>
        <div className="py-2 rounded">
          <div className="flex">{spot.attributes.body}</div>
          <h2 className="text-xl text-teal-600 pt-6 flex"><BsFillGeoFill className="mr-2 rounded-full text-white bg-teal-600 p-2 w-8 h-8"/> Comment y accéder ?</h2>
          {spot.attributes.access}
          <h2 className="text-xl text-teal-600 pt-6 flex">
            <AiFillLike className="mr-2 rounded-full text-white bg-teal-600 p-2 w-8 h-8"/><span className="">Notre conseil pour une bonne photo</span>
          </h2>
          {spot.attributes.conseil}
          <div className="pt-4 pb-2">{spot.attributes.moment}</div>
          {spot.attributes.saison}
          <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{spot.attributes.tags}
                  </span>
                  <SunsetAndSunriseTimeAPI latitude={latitude} longitude={longitude} />
          Dernière mise à jour : {dateFormat}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await fetch(
    `${API_URL}/api/spots/?filters[slug]=${slug}&populate=*`
  );
  const data = await res.json();

  return {
    props: {
      spot: data.data[0],
    },
  };
}

export default Spot;
