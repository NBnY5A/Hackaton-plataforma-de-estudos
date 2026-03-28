import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setCategoryFilter,
}) => {
  return (
    <div className={styles.filterBar}>
      <label htmlFor="categoryFilter">Filtrar por categoria</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "Todas as categorias" : category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
