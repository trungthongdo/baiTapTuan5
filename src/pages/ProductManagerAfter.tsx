import { useState, useMemo, useCallback, memo, lazy, Suspense } from "react";
import { FixedSizeList } from "react-window";
import type { ListChildComponentProps } from "react-window";
import { generateProducts } from "../data/generateProducts";
import type { Product } from "../types";

const ALL_PRODUCTS = generateProducts(10000);
const priceFormatter = new Intl.NumberFormat("vi-VN");
const ProductDetailModal = lazy(() => import("../components/ProductDetailModal"));

interface RowProps {
  product: Product;
  onSelect: (product: Product) => void;
}
const ProductRowAfter = memo(function ProductRowAfter({ product, onSelect }: RowProps) {
  return (
    <div className="product-row" onClick={() => onSelect(product)}>
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span>{priceFormatter.format(product.price)}đ</span>
      <span>Kho: {product.stock}</span>
    </div>
  );
});

interface RowData {
  items: Product[];
  onSelect: (product: Product) => void;
}

function Row({ index, style, data }: ListChildComponentProps<RowData>) {
  const product = data.items[index];
  return (
    <div style={style}>
      <ProductRowAfter product={product} onSelect={data.onSelect} />
    </div>
  );
}
function ProductManagerAfter() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () => ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const handleSelect = useCallback((product: Product) => {
    setSelected(product);
  }, []);

  const itemData = useMemo<RowData>(
    () => ({ items: filtered, onSelect: handleSelect }),
    [filtered, handleSelect]
  );

  return (
    <div className="page">
      <h1>Quản lý sản phẩm (đã tối ưu) — {ALL_PRODUCTS.length.toLocaleString()} sản phẩm</h1>
      <input
        className="search-input"
        placeholder="Tìm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p className="result-count">{filtered.length.toLocaleString()} kết quả</p>

      <FixedSizeList
        height={520}
        width="100%"
        itemCount={filtered.length}
        itemSize={52}
        itemData={itemData}
      >
        {Row}
      </FixedSizeList>

      {selected && (
        <Suspense fallback={<p className="loading-hint">Đang tải chi tiết...</p>}>
          <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
        </Suspense>
      )}
    </div>
  );
}

export default ProductManagerAfter;
