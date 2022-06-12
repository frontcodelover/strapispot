//DESIGN CODE https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/small

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import AboutHome from "../components/home/AboutHome";
import VideoHome from "../components/home/VideoHome";
import { AllSpotsProvider } from "../components/Provider/AllSpotsProvider";
import LastPostTitle from "../components/home/LastSpotTitle";


export const getStaticProps = async () => {
  return {
    props: {
      allSpots: await AllSpotsProvider(),
    },
  };
};

export default function LastPostFetch({ allSpots }) {
  return (
    <>
      <VideoHome />
        <LastPostTitle />
      <div className="grid grid-cols-3 gap-4 py-8 container max-w-screen-xl">
        {allSpots.map((spot) => {
          return (
            <div key={spot.id} className="rounded overflow-hidden shadow-lg">
              <Link href="/spot/[slug]" as={`/spot/${spot.slug}`}>
                <a>
              <Image
                src={spot.photos}
                width={600}
                height={500}
                quality={75}
                className="object-cover"
                alt={spot.name}
                  /></a>
              </Link>
              <div className="px-6 py-4 rounded">
                <Link href="/spot/[slug]" as={`/spot/${spot.slug}`}>
                <a>
                    <h2 className="font-semibold text-xl mb-2">{spot.name}</h2>
                </a>
                  </Link>
                <div className="text-teal-600 flex">
                  <FaMapMarkerAlt className="mt-1 mr-1" />
                  <span className="inline-block align-top">{spot.country}</span>
                </div>
                <div className="pt-4 pb-2">
                  <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {spot.moment}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container max-w-screen-xl">
        <AboutHome />
      </div>
    </>
  );
}
