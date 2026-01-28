import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.services";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};

const ProductModal = ({
  isModalOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("categoryId", formData.categoryId);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      // Reset Form Data
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Product Update Successfully!!"
          : "Product Create Successfully!!",
      );

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to Update Product" : "Failed to Create Product",
        error,
      );
      toast.error(
        isEditMode
          ? "Failed to Update Product!!"
          : "Failed to Create Product!!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isModalOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category._id,
        stock: product.stock,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isModalOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isModalOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      title={isEditMode ? "Update Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <label htmlFor="name" className="block text-xs mb-1 font-medium">
              Product Image
            </label>
            <ImageUploadPreview
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running Shoes"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  value={formData.stock}
                  onChange={handleChange}
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category">Category</label>
              <select
                name="categoryId"
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={7}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Details..."
          ></textarea>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="small"
          className="ml-auto mt-2 rounded-xl"
          type="submit"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
