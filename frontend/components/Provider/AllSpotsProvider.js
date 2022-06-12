import axios from "axios";

export async function AllSpotsProvider() {
  const { data } = await axios.get(
    "http://localhost:1337/api/spots?populate=*"
  );
  return formatDataSpot(data);
}

const { API_URL } = process.env;

function formatDataSpot(data) {
  return data.data.map((spot) => {
    return {
      id: spot.id,
      name: spot.attributes.name,
      country: spot.attributes.country,
      moment: spot.attributes.moment,
      photos: API_URL + spot.attributes.photos.data[0].attributes.formats.large.url,
      slug: spot.attributes.slug,
    };
  }
  );
}