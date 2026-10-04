import { useState } from "react";
import { generateProducts } from "../data/generateProducts";
import type { Product } from "../types";

const ALL_PRODUCTS = generateProducts(10000);

function ProductManagerBefore() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Quản lý sản phẩm (chưa tối ưu) — {ALL_PRODUCTS.length.toLocaleString()} sản phẩm</h1>
      <input
        className="search-input"
        placeholder="Tìm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="result-count">{filtered.length.toLocaleString()} kết quả</p>

      <ul className="product-list">
        {filtered.map((product) => (
          <ProductRowBefore
            key={product.id}
            product={product}
            onSelect={() => setSelected(product)}
          />
        ))}
      </ul>

      {selected && (
        <div className="modal" role="presentation">
          <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
            <h2 id="product-detail-title">{selected.name}</h2>
            <p>Giá: {new Intl.NumberFormat("vi-VN").format(selected.price)}đ</p>
            <button onClick={() => setSelected(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductRowBefore({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: () => void;
}) {
  const formatter = new Intl.NumberFormat("vi-VN");

  return (
    <li className="product-row" onClick={onSelect}>
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span>{formatter.format(product.price)}đ</span>
      <span>Kho: {product.stock}</span>
    </li>
  );
}

export default ProductManagerBefore;
