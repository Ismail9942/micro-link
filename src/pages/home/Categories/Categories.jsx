import {
  FaBullhorn,
  FaPaintBrush,
  FaMusic,
  FaUsers,
  FaPenFancy,
  FaEnvelope,
  FaChartLine,
  FaTasks,
} from "react-icons/fa";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Digital Marketing",
    icon: <FaBullhorn className="text-amber-500" />,
    count: 10,
    description:
      "A Social Media Specialist is responsible for creating and publishing content on all social media platforms.",
  },
  {
    title: "Design & Illustration",
    icon: <FaPaintBrush className="text-amber-500" />,
    count: 9,
    description:
      "Visual content design including branding and creative graphics.",
  },
  {
    title: "Data Collection",
    icon: <FaTasks className="text-amber-500" />,
    count: 4,
    description: "Collect and organize data from various sources effectively.",
  },
  {
    title: "Writing & Translation",
    icon: <FaPenFancy className="text-amber-500" />,
    count: 1,
    description: "Write and translate professional content for diverse needs.",
  },
  {
    title: "Forums",
    icon: <FaUsers className="text-amber-500" />,
    count: 0,
    description: "Engage in meaningful discussions and community support.",
  },
  {
    title: "Music",
    icon: <FaMusic className="text-amber-500" />,
    count: 0,
    description: "Audio editing, composition, and music production jobs.",
  },
  {
    title: "Sales & Marketing",
    icon: <FaChartLine className="text-amber-500" />,
    count: 0,
    description: "Strategies and planning to grow business and customer base.",
  },
  {
    title: "Email Marketing",
    icon: <FaEnvelope className="text-amber-500" />,
    count: 0,
    description: "Campaign creation and automation through email platforms.",
  },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 md:px-20 text-center my-4">
      <div>
        <h2 className="text-3xl font-bold mb-4">Find Your Jobs Easily</h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          Browse a wide range of job categories, including data entry, writing,
          design, marketing, and more. Find tasks that match your skills and
          start earning today!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
