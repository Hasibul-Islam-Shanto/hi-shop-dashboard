import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/shared/components/PageHeading";
import { StatusBadge } from "@/shared/components/StatusBadge";
import ProductModal, { ProductForm } from "@/features/products/components/ProductModal";
import { allProducts as initialProducts, Product } from "@/data/products";

const stockStatusColors: Record<string, string> = {
  "In Stock": "text-tertiary bg-tertiary/10",
  Low: "text-primary bg-primary/10",
  Out: "text-destructive bg-destructive/10",
};

const getStockStatus = (stock: number) => {
  if (stock > 10) return "In Stock";
  if (stock > 0) return "Low";
  return "Out";
};

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    name: "", price: "", material: "", category: "", stock: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: "", price: "", material: "", category: "", stock: "" });
    setImagePreview(null);
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      price: String(p.price),
      material: p.material,
      category: p.category,
      stock: String(p.stock),
    });
    setImagePreview(p.image);
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const saveProduct = () => {
    if (!form.name || !form.price) return;
    const productImage = imagePreview ?? initialProducts[0].image;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                price: Number(form.price),
                material: form.material,
                category: form.category,
                stock: Number(form.stock),
                image: productImage,
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          name: form.name,
          price: Number(form.price),
          material: form.material,
          category: form.category,
          stock: Number(form.stock),
          image: productImage,
        },
      ]);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    setImagePreview(null);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="px-4 sm:px-6 py-6">
      <PageHeading label="Manage" title="Product Inventory">
        <div className="hidden sm:flex items-center bg-surface-container rounded-lg px-3 py-1.5 ghost-border w-52">
          <Search className="h-3.5 w-3.5 text-on-surface-variant mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
          />
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Product
        </Button>
      </PageHeading>

      {/* Mobile search */}
      <div className="sm:hidden flex items-center bg-surface-container rounded-lg px-3 py-1.5 ghost-border mb-4">
        <Search className="h-3.5 w-3.5 text-on-surface-variant mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          isEditing={!!editingProduct}
          form={form}
          imagePreview={imagePreview}
          onFormChange={setForm}
          onImageChange={handleImageChange}
          onSave={saveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Table */}
      <div className="bg-card rounded-xl overflow-hidden ghost-border shadow-[var(--shadow-sm)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="text-left border-b border-outline-variant/10">
                <th className="label-text text-[10px] px-5 py-3">Product</th>
                <th className="label-text text-[10px] px-3 py-3 hidden sm:table-cell">Category</th>
                <th className="label-text text-[10px] px-3 py-3">Price</th>
                <th className="label-text text-[10px] px-3 py-3">Stock</th>
                <th className="label-text text-[10px] px-3 py-3">Status</th>
                <th className="label-text text-[10px] px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-on-surface-variant">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-9 w-9 rounded-lg object-cover shrink-0 bg-surface-container"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-on-surface truncate">{product.name}</p>
                          <p className="text-xs text-on-surface-variant truncate">{product.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface-variant hidden sm:table-cell">
                      {product.category}
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold text-on-surface">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-sm text-on-surface">{product.stock}</td>
                    <td className="px-3 py-3">
                      <StatusBadge
                        status={getStockStatus(product.stock)}
                        colorMap={stockStatusColors}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-on-surface-variant hover:text-primary transition-colors p-1"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-on-surface-variant hover:text-destructive transition-colors p-1"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="px-5 py-3 border-t border-outline-variant/10">
          <p className="text-xs text-on-surface-variant">
            {filtered.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
