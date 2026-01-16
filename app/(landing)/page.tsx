import { getAllCategories } from "../services/category.services";
import { getAllProducts } from "../services/product.service";
import CategoriesSection from "./components/home/categories";
import HeroSection from "./components/home/hero";
import ProductsSection from "./components/home/products";

export default async function Home() {
  // const categories = await getAllCategories();
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <main>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
    </main>
  );
}
