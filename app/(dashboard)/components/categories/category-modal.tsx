import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { toast } from "react-toastify";
import {
  createCategory,
  updateCategory,
} from "@/app/services/category.services";

type TCategoryModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
};

type CategoryFormData = {
  name: string;
  description: string;
};

const CategoryModal = ({
  isModalOpen,
  onClose,
  onSuccess,
  category,
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!category;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isEditMode && isModalOpen) {
      setFormData({
        name: category.name,
        description: category.description,
      });
      setImagePreview(
        category.imageUrl ? getImageUrl(category.imageUrl) : null,
      );
    } else {
      setFormData({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [category, isModalOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateCategory(category._id, data);
      } else {
        await createCategory(data);
      }

      toast.success(
        isEditMode
          ? "Category updated successfully"
          : "Category created successfully",
      );

      setFormData({
        name: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to Update Category" : "Failed to Create Category",
        error,
      );
      toast.error(
        isEditMode ? "Failed to Update Category" : "Failed to Create Category",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Category" : "Add Category"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <label htmlFor="name" className="block text-xs mb-1 font-medium">
              Category Image
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
              <label htmlFor="name">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running"
              />
            </div>
            <div className="input-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Category Details ...."
              ></textarea>
            </div>
          </div>
        </div>

        <Button
          size="small"
          className="ml-auto mt-2 rounded-xl"
          disabled={isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          {isEditMode ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;
