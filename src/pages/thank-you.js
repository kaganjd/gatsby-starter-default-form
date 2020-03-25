import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const ThanksPage = () => (
  <Layout>
    <h1>Thanks for submitting your form!</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ThanksPage