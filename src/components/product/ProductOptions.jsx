import { Minus, Plus } from 'lucide-react';

export default function ProductOptions({
  product,
  options,
  setOptions
}) {
  function increaseQuantity() {
    setOptions({
      ...options,
      quantity: options.quantity + 1
    });
  }

  function decreaseQuantity() {
    if (options.quantity <= 1) return;

    setOptions({
      ...options,
      quantity: options.quantity - 1
    });
  }

  const hasSizes = product.sizes?.length > 0;
  const hasColors = product.colors?.length > 0;

  return (
    <div className="product-options">
      {hasSizes && (
        <div className="option-group">
          <label>Tamanho</label>

          <div className="option-row">
            {product.sizes.map((size) => (
              <button
                type="button"
                className={
                  options.size === size
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setOptions({
                    ...options,
                    size
                  })
                }
                key={size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasColors && (
        <div className="option-group">
          <label>Cor</label>

          <div className="option-row">
            {product.colors.map((color) => (
              <button
                type="button"
                className={
                  options.color === color
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setOptions({
                    ...options,
                    color
                  })
                }
                key={color}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="option-group">
        <label>Quantidade</label>

        <div className="quantity-selector">
          <button
            type="button"
            onClick={decreaseQuantity}
          >
            <Minus size={16} />
          </button>

          <span>{options.quantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}