import "./styles.css";
import React, { useState, useEffect } from "react";
import SearchInput from './components/SearchInput'

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all";
    const getCountries = async () => {
      try {
        const response = await fetch(url);
        const resData = await response.json();

        resData && setLoading(false)
        return resData;
      } catch (err) {
        return console.log(err);
      }
    };
    getCountries().then((res) => setData(res));
  }, []);

  console.log("data", data);
  return (
    <div className="App">

      {loading && <label>Loading...</label>}

      <SearchInput />

      {data && data.map(({name, flag}) => {
        return (
          <>
          <span>{flag}</span>
        <span>{name.official}</span><br />
        </>
        )
      })}

    </div>
  );
}

// Countrt with some details about the county
// create tile component
// useEffect to make an api call

// Product Requirements¶
// You are building a responsive web application that helps
// users to see the list of countries and few details about the country.

// A widget to display the country list

// Each country should have
// Its name
// Its flag (display the icon in smaller size)
// Population
// Region
// Capital
// "View More" button to display the additional details of the country

// List all countries
//     https://restcountries.com/v3.1/all

// Search by
//     CountryName - https://restcountries.com/v3.1/name/{name}
//     Region - https://restcountries.com/v3.1/region/{region}
//     Language - https://restcountries.com/v3.1/lang/{lang}
//     Currency - https://restcountries.com/v3.1/currency/{currency}

// Filter the response with required fields
//     https://restcountries.com/v3/{service}?fields={field},{field},{field}
//     eg. https://restcountries.com/v3/all?fields=name,capital,currencies
