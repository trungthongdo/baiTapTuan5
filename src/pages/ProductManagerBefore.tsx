import { useState } from "react";
import { generateProducts } from "../data/generateProducts";
import type { Product } from "../types";

// Sinh 10.000 sản phẩm 1 lần khi module được load
const ALL_PRODUCTS = generateProducts(10000);

/**
 * ============================================================
 * PHIÊN BẢN "TRƯỚC TỐI ƯU"
 * ============================================================
 * Cố tình giữ lại 3 vấn đề hiệu năng phổ biến để đo được sự khác
 * biệt rõ ràng bằng Lighthouse:
 *
 * Vấn đề #1 — Render toàn bộ 10.000 phần tử <li> vào DOM cùng lúc,
 *   dù màn hình chỉ hiển thị được ~15 dòng. Đây là vấn đề GỐC, ảnh
 *   hưởng nặng nhất tới TBT (Total Blocking Time) và điểm Performance.
 *
 * Vấn đề #2 — `filtered` được TÍNH LẠI (duyệt cả mảng 10.000 phần tử)
 *   trên MỖI LẦN RENDER, kể cả khi search không hề thay đổi (không
 *   dùng useMemo).
 *
 * Vấn đề #3 — ProductRowBefore không được React.memo, và nhận 1 hàm
 *   `() => onSelect(product)` MỚI mỗi lần cha render lại. Vì tham
 *   chiếu hàm luôn đổi, React không thể "nhận ra" dòng nào không đổi
 *   dữ liệu để bỏ qua re-render — toàn bộ 10.000 dòng re-render lại
 *   mỗi khi gõ 1 ký tự vào ô tìm kiếm.
 */
function ProductManagerBefore() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  // KHÔNG dùng useMemo -> tính lại filter mỗi lần component render
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
  // Tạo MỚI 1 Intl.NumberFormat cho MỖI dòng, mỗi lần render -> lãng phí,
  // trong khi đối tượng này hoàn toàn có thể tạo 1 lần rồi dùng lại
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
