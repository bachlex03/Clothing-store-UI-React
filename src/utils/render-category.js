export const renderCategories = (categories = []) => {
  const categoryMap = {};

  categories.forEach((category) => {
    categoryMap[category._id] = {
      name: category.category_name,
      slug: category.category_slug,
      children: [],
    };
  });

  const result = [];

  categories.forEach((category) => {
    if (category.category_parentId === null) {
      result.push(categoryMap[category._id]);
    } else {
      const parent = categoryMap[category.category_parentId];
      if (parent) {
        parent.children.push(categoryMap[category._id]);
      }
    }
  });

  // Recursively remove empty children arrays
  function cleanEmptyChildren(category) {
    if (category.children.length === 0) {
      category.children = null;
    } else {
      category.children.forEach(cleanEmptyChildren);
    }
  }

  result.forEach(cleanEmptyChildren);

  return result;
};
