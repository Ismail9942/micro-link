const CategoryCard = ({ icon, title, count, description }) => {
  return (
    <div className="relative  h-80 bg-white rounded-xl shadow hover:shadow-lg p-5 cursor-pointer transition-all duration-300 group">
      {/* Notification Badge */}
      {
        <span className="absolute top-6 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      }

      {/* Icon */}
      <div className="text-6xl flex justify-center items-center transition-transform duration-300 group-hover:-translate-y-4 ">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center mt-3 transition-opacity duration-300 group-hover:opacity-0">
        {title}
      </h3>

      {/* Description (hidden by default, visible on hover) */}
      <p className="absolute bottom-5 left-4 right-4 text-sm text-gray-600 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-y-0">
        {description}
      </p>
    </div>
  );
};

export default CategoryCard;
