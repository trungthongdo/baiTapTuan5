import type { Product } from "../types";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}
function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <div className="modal" role="presentation">
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
        <h2 id="product-detail-title">{product.name}</h2>
        <p>Danh mục: {product.category}</p>
        <p>Giá: {new Intl.NumberFormat("vi-VN").format(product.price)}đ</p>
        <p>Tồn kho: {product.stock}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default ProductDetailModal;
