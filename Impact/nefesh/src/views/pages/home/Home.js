import React from "react";
import { isAuthorised } from "../../../functions/general";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


function Home({ role }) {
  const navigate = useNavigate();
  const authorised = ["superAdmin", "orgAdmin"];

  useEffect(() => {
    if (!isAuthorised(role, authorised)) {
      navigate('/401')
    }

  }, [])
  console.log(role)
  return (<div>
    Home
  </div>)
}
export default Home;