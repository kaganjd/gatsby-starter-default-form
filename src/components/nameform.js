// Cobbled together from:
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
// https://github.com/futuregerald/react-netlify-form-file/
// https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

// This is what we'll use to "redirect" to the custom success page
// More on this here: https://www.gatsbyjs.org/docs/gatsby-link/#how-to-use-the-navigate-helper-function
import { navigate } from "gatsby"
import React, { useState } from "react";

const NameForm = (props) => {
  const [name, setName] = useState("");

  // This function puts all the form fields into a FormData constructor, which we later encode with the URLSearchParams constructor
  const createFormDataObj = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k)=>{
      formData.append(k,data[k])
    });
    return formData
  }
  
  const handleChange = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setName({
      [evt.target.name]: value
    });
  }

  const handleSubmit = (e) => {
    // This `data` object is what's passed to the createFormDataObj. It needs all of your form fields, where the key is the name= attribute and the value is the value=
    const data = { 
      "form-name": "contact",
      ...state
    }
    // This POSTs your encoded form to Netlify with the required headers (for text; headers will be different for POSTing a file) and, on success, redirects to the custom success page using Gatsby's `navigate` helper function that we imported at the top
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(createFormDataObj(data)).toString()
    })
      .then(() => navigate("/thank-you/"))
      .catch(error => alert(error));
    // This is required to prevent the default onSubmit behavior
    e.preventDefault();
  };

  return (
    <form netlify action="/" name="contact" method="post" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          name="firstName"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Fav animal:
        <select
          name="animal[]"
          type="checkbox"
          value={name}
          multiple={true}
          onChange={handleChange}
        >
          <option value="emu">emu</option>
          <option value="elephant">elephant</option>
          <option value="turtle">turtle</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NameForm
