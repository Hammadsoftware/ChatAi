'use client';
import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Will reducing image size affect quality?',
    answer:
      'ReduceSize compresses images efficiently without significant loss of quality. The tool balances compression and visual fidelity to keep your images looking great.',
  },
  {
    id: 2,
    question: 'Which file formats are supported?',
    answer:
      'ReduceSize supports JPEG, PNG, and WebP formats. JPEG is best for photographs, PNG is ideal for images with transparency, and WebP provides superior compression for web usage.',
  },
  {
    id: 3,
    question: 'Can I set a custom target size?',
    answer:
      'Yes, optionally you can specify a target size in KB before compression. ReduceSize will compress the image to meet your specified target while maintaining quality.',
  },
  {
    id: 4,
    question: 'Is my image secure?',
    answer:
      'Yes, images are processed securely. They are either processed in-browser or temporarily on the server and are not stored permanently.',
  },
  {
    id: 5,
    question: 'Can I compress multiple images at once?',
    answer:
      'Currently, ReduceSize focuses on single-image compression for simplicity, but batch compression is coming soon in the next update!',
  },
  {
    id: 6,
    question: 'Does ReduceSize work on mobile devices?',
    answer:
      'Absolutely! ReduceSize is fully responsive and works on all modern browsers, including mobile and tablets.',
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq: FAQ) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h2 className="text-xl font-semibold text-gray-900">{faq.question}</h2>
                {openId === faq.id ? (
                  <FiChevronUp className="text-blue-600" size={24} />
                ) : (
                  <FiChevronDown className="text-blue-600" size={24} />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-40 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
