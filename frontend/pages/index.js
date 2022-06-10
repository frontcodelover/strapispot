//DESIGN CODE https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/small

import React from "react";
import axios from "axios";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import AboutHome from "../components/home/AboutHome";
import VideoHome from "../components/home/VideoHome";


const { API_URL } = process.env;
export const getStaticProps = async () => {
  const { data } = await axios.get(
    "http://localhost:1337/api/spots?populate=*"
  );
  return {
    props: {
      dataApi: data.data,
    },
  };
};

export default function LastPostFetch({ dataApi }) {
  return (
    <>
      <VideoHome />
      <div className="grid grid-cols-3 gap-4 py-8 container">
        {dataApi?.map((dataSpot) => (
          <div key={dataSpot.id} className="rounded overflow-hidden shadow-lg">
            <div>
              <Image
                src={
                  API_URL +
                  dataSpot.attributes.photos.data[0].attributes.formats.large
                    .url
                }
                width={600}
                height={500}
                quality={75}
                className="object-cover"
                alt={dataSpot.attributes.name}
              />
              <div className="px-6 py-4 rounded">
                <h2 className="font-bold text-xl mb-2">
                  {dataSpot.attributes.name}
                </h2>
                <div className="text-gray-700 text- flex">
                  <FaMapMarkerAlt className="mt-1 mr-1" />
                  <span className="inline-block align-top">
                    {dataSpot.attributes.country}
                  </span>
                </div>
                <div className="pt-4 pb-2">
                  <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {dataSpot.attributes.moment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
      <AboutHome />

      </div>
    </>
  );
}
