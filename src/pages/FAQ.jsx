import React from "react";
import Accordion from "../components/Accordionn.jsx";

function FAQ() {
  const items = [
    {
      title: "What is React?",
      content: "React is a front end javascript framework",
    },
    {
      title: "Why use React?",
      content: "React is a favorite JS library among engineers",
    },
    {
      title: "How do you use React?",
      content: "You use React by creating components",
    },
  ];
  return (
    <div className="container">
      <h1>FAQ</h1>
      <h3>Content:</h3>
      <Accordion items={items} />
    </div>
  );
}
//Udemy-Kurs Abschnitt 12!! Use Accordions!

export default FAQ;
