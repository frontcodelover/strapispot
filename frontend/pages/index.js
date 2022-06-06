import React from "react";
import axios from "axios";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import AboutHome from "../components/home/AboutHome";

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
      <div className="grid grid-cols-3 gap-4 py-8">
        {dataApi?.map((dataSpot) => (
          <div className="rounded overflow-hidden shadow-lg">
            <div key={dataSpot.id}>
              <Image
                src={
                  API_URL +
                  dataSpot.attributes.photos.data[0].attributes.formats.large.url
                }
                width={600}
                height={500}
                quality={75}
                className="object-cover"
              />
              <div className="px-6 py-4 rounded">

              <h2 className="font-bold text-xl mb-2">{dataSpot.attributes.name}</h2>
                <div className="text-gray-700 text- flex"><FaMapMarkerAlt className="mt-1 mr-1" /><span className="inline-block align-top">{dataSpot.attributes.country}</span></div>
                <div class="pt-4 pb-2">
        {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{dataSpot.attributes.tags}</span> */}
        <span class="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{dataSpot.attributes.moment}</span>

      </div>
                </div>
            </div>
          </div>
        ))}
      </div>
        <AboutHome />
    </>
  );
}
