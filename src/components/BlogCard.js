import React from "react";
import Link from "next/link";
import { Card, Button } from "flowbite-react";
import { FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

const BlogCard = ({ title, description, slug }) => {
  return (
    <Card className="p-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md transition-transform transform hover:scale-105">
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <Link href={`/blog/${slug}`} passHref>
        <Button as="a" aria-label={`Read more about ${title}`}>
          Read more
          <FaChevronRight className="ml-2" aria-hidden="true" />
        </Button>
      </Link>
    </Card>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default React.memo(BlogCard);