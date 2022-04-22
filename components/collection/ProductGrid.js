import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
    return (
        <div className="pt-12 lg:mt-0 lg:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 text-left">
                {products
                    .filter((product) => product.content)
                    .map((product, index) => (
                        <div key={`${product.id}-${index}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductGrid;
