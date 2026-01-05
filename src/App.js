import React, { useEffect, useState } from "react";
import { getSpecies, getAssemblyInfo } from "./ensemblApi";

function App() {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [assembly, setAssembly] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const data = await getSpecies();
        const variationSpecies = data.filter( (s) => Array.isArray(s.groups) && s.groups.includes("variation"));

        setSpeciesList(variationSpecies);

      } catch (error) {
        console.error(error);
      }
    };
    fetchSpecies();
  }, []);

  useEffect(() => {
    if (!selectedSpecies) return;

    const fetchAssembly = async () => {
      setLoading(true);
      try {
        const data = await getAssemblyInfo(selectedSpecies);
        setAssembly(data);
      } catch (error) {
        console.error(error);
        setAssembly(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAssembly();
  }, [selectedSpecies]);

  // Filter chromosomes in customary order
  const chrList = assembly?.karyotype
  ?.map((chrName) =>
    assembly.top_level_region.find(
      (region) => region.name === chrName
    )
  )
  .filter(Boolean);

  // Compute total genome length in Mb
  const totalLengthMb = chrList
  ? chrList.reduce((sum, chr) => sum + chr.length / 1_000_000, 0).toFixed(2)
  : 0;

  return (
    <div className="container">
      <h1>Species Assembly Summaries</h1>

      <select
        value={selectedSpecies}
        onChange={(e) => {
          setSelectedSpecies(e.target.value)
        }}
      >
        <option value="">-- Choose a species --</option>
        {speciesList.map((s) => (
          <option key={s.name} value={s.name}>
            {s.display_name}
          </option>
        ))}
      </select>

      {loading && <p>Loading assembly data...</p>}

      {assembly && !loading && (
        <div>
          <h2>{speciesList.find(p => p.name === selectedSpecies).display_name}</h2>
          <strong>Total Length:</strong> {totalLengthMb} Mb
          <br/>
          <table>
            <thead>
              <tr>
                <th>Chromosome</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {chrList.map((chr) => (
                <tr key={chr.name}>
                  <td data-label="Chromosome">{chr.name}</td>
                  <td data-label="Length">{(chr.length / 1_000_000).toFixed(2)} Mb</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
