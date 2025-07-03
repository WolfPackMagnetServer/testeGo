import React from "react";
import { X, Filter } from "lucide-react";
import "./FilterPanel.css";

interface FilterPanelProps {
  categories: string[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  onCategoriesChange: (categories: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onCategoriesChange,
  onTagsChange,
  onClose,
}) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllFilters = () => {
    onCategoriesChange([]);
    onTagsChange([]);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={20} />
          <h3>Filtros</h3>
        </div>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <h4>Categorias</h4>
          <div className="filter-options">
            {categories.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span className="checkmark"></span>
                <span className="option-text">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Tags</h4>
          <div className="filter-options">
            {tags.map((tag) => (
              <label key={tag} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                <span className="checkmark"></span>
                <span className="option-text">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {(selectedCategories.length > 0 || selectedTags.length > 0) && (
          <div className="filter-actions">
            <button className="clear-filters-button" onClick={clearAllFilters}>
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
