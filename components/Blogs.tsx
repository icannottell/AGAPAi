
import React, { useState } from 'react';
import { MOCK_BLOGS } from '../constants';
import { BlogPost } from '../types';

const Blogs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Farming', 'Tools', 'Market', 'Tech'];

  const filteredBlogs = selectedCategory === 'All' 
    ? MOCK_BLOGS 
    : MOCK_BLOGS.filter(blog => blog.category === selectedCategory);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-agri-600 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Articles
        </button>

        <article className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border">
          <div className="h-64 md:h-96 overflow-hidden relative">
            <img 
              src={selectedPost.imageUrl} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-agri-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                {selectedPost.category}
              </span>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                 {selectedPost.author}
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                 {selectedPost.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300">
              {selectedPost.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph.startsWith('**') ? 
                    <strong>{paragraph.replace(/\*\*/g, '')}</strong> : 
                    paragraph.startsWith('-') ?
                    <li className="ml-4 list-disc">{paragraph.substring(1)}</li> :
                    paragraph
                  }
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-agri-600"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Knowledge Hub
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Articles, tips, and updates for the modern farmer.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-agri-600 text-white shadow-md'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-agri-50 dark:hover:bg-agri-900/30 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map(blog => (
          <div 
            key={blog.id}
            className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-md transition-shadow flex flex-col h-full group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                 <span className="px-2 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold rounded text-gray-800 dark:text-gray-200">
                   {blog.category}
                 </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
                 <span>{blog.date}</span>
                 <span>{blog.author}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-agri-600 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                {blog.excerpt}
              </p>
              
              <button
                onClick={() => handleReadMore(blog)}
                className="text-agri-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start"
              >
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
         <div className="text-center py-20 text-gray-400 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
           <p className="text-lg font-medium">No articles found in this category.</p>
         </div>
      )}
    </div>
  );
};

export default Blogs;
