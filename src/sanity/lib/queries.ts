import { groq } from "next-sanity";

// Fetch all posts with their authors and categories
export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    body,
    categories[]-> {
      _id,
      title,
      slug,
      description,
      group
    },
    author-> {
      _id,
      name,
      slug,
      bio,
      image {
        asset -> {
          _id,
          url
        }
      }
    },
  }
`;

// Fetch a single post by its slug with its author and categories
export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    body,
    categories[]-> {
      _id,
      title,
      slug,
      description,
      group
    },
    author-> {
      _id,
      name,
      slug,
      bio,
      image {
        asset -> {
          _id,
          url
        }
      }
    },
  }
`;

// Fetch all categories
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    group
  }
`;

// Fetch all posts by category
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && defined(slug.current) && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    body,
    categories[]-> {
      _id,
      title,
      slug,
      description,
      group
    },
    author-> {
      _id,
      name,
      slug,
      bio,
      image {
        asset -> {
          _id,
          url
        }
      }
    },
  }
`;