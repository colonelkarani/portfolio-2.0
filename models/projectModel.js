const mongoose = require('mongoose');

const CodeLineSchema = new mongoose.Schema({
  lineNumber: { type: Number, required: false },
  content: { type: String, required: false },
  classes: [String] // e.g. ['code-keyword', 'code-string']
});

const ProjectStatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true } // e.g. "1000+", "99.9%"
});

const FeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // e.g. "fa-bolt"
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const TimelineStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: String, // e.g. "🎯"
  description: { type: String, required: true }
});

const DemoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageLink: String
});

const PerformanceMetricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }, // e.g. "450ms"
  description: String
});

const ProjectSchema = new mongoose.Schema({
  // Hero section
  name: { type: String, required: true },
  images:[String],
  badge: String,
  heroTitle: String,
  heroSubtitle: String,

  // Overview section
  overviewTitle: String,
  overviewDescription: String,
  overviewStats: [ProjectStatSchema],
  techStack: [String],

  // Code Mockup
  codeFileName: String,
  codeLines: [CodeLineSchema],

  // Features section
  features: [FeatureSchema],

  // Timeline/Case Study
  timeline: [TimelineStepSchema],

  // Demo section
  demos: [DemoSchema],

  // Performance metrics
  performanceMetrics: [PerformanceMetricSchema],

  // Footer
  footerText: String,

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
module.exports =Project