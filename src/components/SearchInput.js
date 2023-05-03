import React, { useState, useEffect } from "react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [restCountries, setRestCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/${searchType}/${searchTerm.toLowerCase()}`;
    const getCountries = async () => {
      try {
        const response = await fetch(url);
        const resData = await response.json();

        resData && setLoading(false);
        resData && setRestCountries(resData);

        console.log("resData", resData);
      } catch (err) {
        console.log(err);
      }
    };

    getCountries();
  }, [searchType, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Search term: ${searchTerm}, Search type: ${searchType}`);
    // Perform search using search term and search type
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search type:
        <select value={searchType} onChange={handleSelectChange}>
          <option value="name">Country Name</option>
          <option value="region">Region</option>
          <option value="lang">Language</option>
          <option value="currency">Currency</option>
        </select>
      </label>
      <br />
      <label>
        Search:
        <input type="text" value={searchTerm} onChange={handleInputChange} />
      </label>
      <button type="submit">Search</button>
      <br /> <br />
      {loading && <label>Loading...</label>}
      {restCountries.length > 0 &&
        restCountries.map(({ name, flag, population }) => {
          return (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "3px",
                marginBottom: "10px",
                padding: "10px"
              }}
            >
              <span>{flag}</span>
              <span>{name.official}</span>
              <br />
              <span>Population: {population}</span>
              <br />
            </div>
          );
        })}
    </form>
  );
};

export default SearchInput;

// Search by
//     CountryName - https://restcountries.com/v3.1/name/{name}
//     Region - https://restcountries.com/v3.1/region/{region}
//     Language - https://restcountries.com/v3.1/lang/{lang}
//     Currency - https://restcountries.com/v3.1/currency/{currency}
