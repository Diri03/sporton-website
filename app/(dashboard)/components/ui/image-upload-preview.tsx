import Image from "next/image";
import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
  label?: string;
  value?: string | null;
  onChange: (file: File) => void;
  className?: string;
};

const ImageUploadPreview = ({
  value,
  onChange,
  className,
}: TImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleImageClick}
        className="border-2 border-dashed border-primary bg-primary/5 rounded-lg h-50 flex flex-col justify-center items-center cursor-pointer overflow-hidden"
      >
        {value ? (
          <Image
            src={value}
            alt="preview product"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={24} />
            <span className="text-sm font-medium opacity-75">
              Click to Upload
            </span>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadPreview;
