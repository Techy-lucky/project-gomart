import React from "react";

const Prodcategory = () => {
  const categories = [
    { name: "Electronics", link: "/category/electronics" },
    { name: "Fashion", link: "/category/fashion" },
    { name: "Home & Living", link: "/category/home-living" },
    { name: "Books", link: "/category/books" },
    { name: "Sports & Outdoors", link: "/category/sports" },
    { name: "Health & Beauty", link: "/category/health-beauty" },
    { name: "Toys & Games", link: "/category/toys-games" },
    { name: "Automotive", link: "/category/automotive" },
    { name: "Groceries", link: "/category/groceries" },
    { name: "Pet Supplies", link: "/category/pet-supplies" }
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg mb-4 w-60 h-[525px]">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg shadow-sm hover:bg-white/20 transition-all duration-300 text-sm"
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Prodcategory;
