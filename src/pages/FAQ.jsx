import React from "react";
import Accordion from "../components/Accordion.jsx";

function FAQ() {
  const lol = "yeeehdhe";
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
    <div>
      <h1>FAQ</h1>
      <div>Content:</div>
      <Accordion items={items} />
      {/* <Accordion items={lol} /> */}
    </div>
  );
}
//Udemy-Kurs Abschnitt 12!! Use Accorions!

export default FAQ;
