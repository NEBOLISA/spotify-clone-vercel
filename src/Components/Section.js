import React, { useEffect } from "react";
import { useServiceProviderValue } from "../ServiceProvider";
import "./Styles/Section.css";
import axios from "axios";

import SectionCard from "./SectionCard";
import Dropdown from "./Dropdown";

function Section() {
  const [{ user, token }, dispatch] = useServiceProviderValue();
  const options = [
    { value: "Account", id: 0 },
    { value: "Profile", id: 1 },
    { value: "Settings", id: 2 },
    { value: "Logout", id: 3 },
  ];

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `	https://api.spotify.com/v1/browse/categories`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch({
        type: "SET_CATEGORIES",
        category: response.data.categories.items,
      });
    };
    getCategories();
  }, []);

  return (
    <div className="section">
      <h2 className="section_title">Shortcuts</h2>
      <Dropdown options={options} />

      {/*<button className="logout_button" onClick={logout}> 
        Logout
  </button>*/}
      <SectionCard />
    </div>
  );
}
export default Section;
