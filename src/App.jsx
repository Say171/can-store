import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [finalGroup, setFinalGroup] = useState([]);
  const [lastCategory, setLastCategory] = useState("All");
  const [lastSearch, setLastSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        initialize(data);
      } catch (error) {
        console.error(`Fetch problem: ${error.message}`);
      }
    };

    fetchData();
  }, []); // 空の依存配列を渡して初回のみ呼び出し

  const initialize = (products) => {
    setProducts(products);
    setLastCategory("All");
    setLastSearch("");
    setFinalGroup(products);
    updateDisplay();
  };

  const selectCategory = (e) => {
    e.preventDefault();

    if (category === lastCategory && searchTerm.trim() === lastSearch) {
      return;
    }

    setLastCategory(category);
    setLastSearch(searchTerm.trim());

    let categoryGroup = [];
    let updatedFinalGroup = [];

    if (category === "All") {
      categoryGroup = products;
      updatedFinalGroup = categoryGroup;
    } else {
      const lowerCaseType = category.toLowerCase();
      categoryGroup = products.filter((product) => product.type === lowerCaseType);
      updatedFinalGroup = categoryGroup;
    }

    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      updatedFinalGroup = categoryGroup.filter((product) =>
        product.name.includes(lowerCaseSearchTerm)
      );
    }

    setFinalGroup(updatedFinalGroup);
    updateDisplay();
  };

  const updateDisplay = () => {
    // 画面更新のロジックを追加
    // ...
  };

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g. beans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button type="button" onClick={selectCategory}>
                Filter results
              </button>
            </div>
          </form>
        </aside>
        <main>
          {finalGroup.length === 0 ? (
            <p>No results to display!</p>
          ) : (
            finalGroup.map((product, index) => (
              <section key={index} className={product.type.toLowerCase()}>
                <h2>{product.name}</h2>
                <p>${product.price.toFixed(2)}</p>
                <img src={`images/${product.image}`} alt={product.name} />
              </section>
            ))
          )}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
