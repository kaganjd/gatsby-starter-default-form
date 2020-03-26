// cobbled together from:
// https://github.com/futuregerald/react-netlify-form-file/
// https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

import React, { useState } from "react";
import { navigate } from "gatsby"

const NameForm = (props) => {
  const [name, setName] = useState("");

  const createFormDataObj = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k)=>{
      formData.append(k,data[k])
    });
    return formData
  }
  
  const handleSubmit = (e) => {
      const data = { 
        "form-name": "contact",
        "name": name
      }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(createFormDataObj(data)).toString()
      })
        .then(() => navigate("/thank-you/"))
        .catch(error => alert(error));
      
      e.preventDefault();
  };

  return (
    <form data-netlify="true" action="/" name="contact" method="post" onSubmit={handleSubmit}>
      <label>
        Frirst Name:
        <input
          name="fname"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NameForm
