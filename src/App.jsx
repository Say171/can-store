import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // 非同期関数を定義
    const fetchData = async () => {
      try {
        // データを取得
        const response = await fetch("/products.json");
        const data = await response.json();

        // 取得したデータをセット
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchDataを呼び出し
    fetchData();
  }, []); // 空の依存配列を渡して初回のみ呼び出し

  useEffect(() => {
    // 商品のフィルタリング
    const updatedFilteredProducts = products.filter((product) => {
      const isInCategory = category === "All" || product.type === category;
      const containsSearchTerm =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return isInCategory && containsSearchTerm;
    });

    // フィルタリングされた商品をセット
    setFilteredProducts(updatedFilteredProducts);
  }, [products, category, searchTerm]);

  const handleFilterClick = async () => {
    try {
      // フィルタリング処理を実行
      const updatedFilteredProducts = products.filter((product) => {
        const isInCategory = category === "All" || product.type === category;
        const containsSearchTerm =
          searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase());
  
        return isInCategory && containsSearchTerm;
      });
  
      // フィルタリングされた商品をセット
      setFilteredProducts(updatedFilteredProducts);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
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
                <option>vegetables</option>
                <option>meat</option>
                <option>soup</option>
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
              {/* ボタンがクリックされたときにフィルタリング処理をトリガー */}
              <button type="button" onClick={handleFilterClick}>
                Filter results
              </button>
            </div>
          </form>
        </aside>
        <main>
          {filteredProducts.length === 0 ? (
            <p>No results to display!</p>
          ) : (
            filteredProducts.map((product, index) => (
              <section key={index} className={product.type.toLowerCase()}>
                <h2>{product.name}</h2>
                <p>${product.price.toFixed(2)}</p>
                <img src={`/images/${product.image}`} alt={product.name} />
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
