import React, { useState, useEffect } from "react";

// App.jsx
function App() {
  // 製品データ、選択されたカテゴリ、検索語、表示される製品_管理
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [finalGroup, setFinalGroup] = useState([]);
  const [lastCategory, setLastCategory] = useState("All");
  const [lastSearch, setLastSearch] = useState("");

  // コンポーネントがマウントされたときに製品データをフェッチする
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }
        const data = await response.json();
        initialize(data);
      } catch (error) {
        console.error(`フェッチの問題: ${error.message}`);
      }
    };

    fetchData();
  }, []); // マウント時に1回だけ実行

  // 製品データを初期化する関数
  const initialize = (products) => {
    setProducts(products);
    setLastCategory("All");
    setLastSearch("");
    setFinalGroup(products);
    updateDisplay();
  };

  // カテゴリの選択とワードの入力の関数
  // 大変
  const selectCategory = (e) => {
    e.preventDefault();

    // カテゴリとワードが変更されていない場合は何もしない
    if (category === lastCategory && searchTerm.trim() === lastSearch) {
      return;
    }

    // 最後のカテゴリと検索語を更新
    setLastCategory(category);
    setLastSearch(searchTerm.trim());

    let categoryGroup = [];
    let updatedFinalGroup = [];

    // 選択されたカテゴリ：フィルタリング
    if (category === "All") {
      categoryGroup = products;
      updatedFinalGroup = categoryGroup;
    } else {
      const lowerCaseType = category.toLowerCase();
      categoryGroup = products.filter((product) => product.type === lowerCaseType);
      updatedFinalGroup = categoryGroup;
    }

    // ワード：フィルタリング
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      updatedFinalGroup = categoryGroup.filter((product) =>
        product.name.includes(lowerCaseSearchTerm)
      );
    }

    // 更新：フィルタリング
    setFinalGroup(updatedFinalGroup);
    updateDisplay();
  };

  // 表示を更新する関数
  const updateDisplay = () => {
    // 拡張要素
  };

  return (
    <>
      {/* ヘッダー*/}
      <header>
        <h1>The Can Store</h1>
      </header>
      {/* メイン */}
      <div>
        {/* サイドバー/アサイド */}
        <aside>
          <form>
            <div>
              <label htmlFor="category">カテゴリを選択：</label>
              {/* 製品カテゴリを選択：ドロップダウン */}
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
              <label htmlFor="searchTerm">検索語を入力：</label>
              {/* 製品検索：ワード入力フィールド */}
              <input
                type="text"
                id="searchTerm"
                placeholder="例：豆"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              {/* フィルタリングボタン */}
              <button type="button" onClick={selectCategory}>
                結果をフィルタリング
              </button>
            </div>
          </form>
        </aside>
        {/* フィルタリングされた製品を表示*/}
        <main>
          {/* 製品がない場合のメッセージ表示 */}
          {finalGroup.length === 0 ? (
            <p>表示する結果はありません！</p>
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
      {/* フッター */}
      <footer>
        <p>アイコンはすべてNoun Projectで見つかりました：</p>
        <ul>
          {/* リンク */}
          <li>
            ビーン缶アイコン作成者：
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            野菜アイコン作成者：
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            スープアイコン作成者：
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            肉の塊アイコン作成者：
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
