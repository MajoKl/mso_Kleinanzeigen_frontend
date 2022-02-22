import Products from "../../components/products/Products";
import "../../main.scss";

function start() {
  return (
    <>
      <div className="container">
        <h1>Willkommen -Name-</h1>
        <h2>Die neusten Anzeigen:</h2>
        <h3>
          Hier ist platz für ein Header, der Dropdowns hat, um Kategorien
          auszuwählen.
        </h3>
        <hr />
        <h4>Hier sind schöne Anzeigen!</h4>
        <Products />
      </div>
    </>
  );
}
export default start;
