const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  // Force Next.js to treat this project as the workspace root
  outputFileTracingRoot: path.resolve(__dirname),
}