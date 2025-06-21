const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, required: true },
  image:{type: String},
  content: {
    introduction: String,
    quote: String,
    sections: [{
      id: String,
      title: String,
      subtitles: [{
        subtitle: String,
        content: String
      }],
      quote: String,
      codeBlocks: [{
        language: String,
        code: String
      }],
      highlights: [{
        title: String,
        content: String,
        items: [String]
      }]
    }],
    conclusion: String
  },
  author: {
    name: { type: String, default: 'the blog' },
    bio: String,
    avatar: String
  },
  tags: [String],
  category: String,
  excerpt: String,
  metaDescription: String,
  readTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  socialShares: {
    twitter: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    whatsapp: { type: Number, default: 0 }
  },
  comments: [{
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: String
    },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false }
  }],
  relatedPosts: [{
    title: {type: String},
    slug: {type: String},
    excerpt: {type: String}
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Blog = mongoose.model("Blogs", blogSchema)


module.exports = Blog