import axios from "axios";

const BASE_URL = "https://rest.ensembl.org";

export const getSpecies = async () => {
  const response = await axios.get(`${BASE_URL}/info/species?content-type=application/json`);
  return response.data.species; // array of species
};

export const getAssemblyInfo = async (species) => {
  const response = await axios.get(`${BASE_URL}/info/assembly/${species}?content-type=application/json`);
  return response.data; // contains karyotype info
};
