'use client';
import React from 'react';

type Blog = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: 'How to Reduce Image Size Without Losing Quality',
    content: `
Reducing image size is essential for faster website loading and saving bandwidth. ReduceSize allows you to compress images in JPEG, PNG, and WebP formats without losing visible quality.

### Why Reduce Image Size?
- Faster page load times
- Saves server storage and bandwidth
- Better user experience on mobile devices
- Improved SEO performance

### How to Use ReduceSize
1. Click "Upload Image" and select your file.
2. Optionally, set a target size in KB.
3. Click "Reduce Size".
4. Download your optimized image instantly.

Our tool automatically balances compression and visual fidelity, so your images look great while being much smaller in size.
    `,
    date: 'Sep 17, 2025',
    author: 'Done479',
  },
  {
    id: 2,
    title: 'Supported File Formats',
    content: `
ReduceSize supports the most common image formats:

- **JPEG:** Best for photographs and detailed images.
- **PNG:** Ideal for images with transparency.
- **WebP:** Superior compression for web without quality loss.

You can keep the original format or choose a different format during compression.
    `,
    date: 'Sep 15, 2025',
    author: 'Done479',
  },
  {
    id: 3,
    title: 'Tips for Optimizing Images for Web',
    content: `
Optimizing images improves website performance and user experience. Here are some tips:

- Always compress images before uploading.
- Choose the right format: JPEG for photos, PNG for transparency, WebP for web.
- Keep image dimensions appropriate for your layout.
- Use ReduceSize to reduce image size without losing quality.
- Avoid using very large images unnecessarily.
    `,
    date: 'Sep 12, 2025',
    author: 'Done479',
  },
  {
    id: 4,
    title: 'Frequently Asked Questions About Image Compression',
    content: `
**Q: Will reducing size affect quality?**  
A: ReduceSize compresses images efficiently without noticeable quality loss.

**Q: Can I set a custom target size?**  
A: Yes, you can specify a target size in KB before compression.

**Q: Is my image secure?**  
A: Images are processed in-browser or temporarily on the server and are not stored permanently.

**Q: Can I compress multiple images at once?**  
A: Currently, ReduceSize focuses on single-image compression. Batch compression coming soon.
    `,
    date: 'Sep 10, 2025',
    author: 'Done479',
  },
  {
    id: 5,
    title: 'Benefits of Using ReduceSize',
    content: `
Using ReduceSize for image compression has multiple benefits:

- **Faster website:** Smaller images load quickly.
- **Better SEO:** Google favors faster-loading pages.
- **Bandwidth saving:** Use less data for image-heavy pages.
- **Enhanced sharing:** Compressed images are easier to share on social media.
- **Cross-device friendly:** Works perfectly on mobile and desktop.
    `,
    date: 'Sep 8, 2025',
    author: 'Done479',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          ReduceSize Blog
        </h1>

        <div className="space-y-10">
          {blogs.map((blog: Blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {blog.title}
              </h2>
              <div className="text-gray-500 text-sm mb-6 flex justify-between">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <div className="text-gray-700 prose prose-blue max-w-none">
                {blog.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
