"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Search, Calendar, User, Tag, ChevronRight, Smartphone, Headphones, Gamepad2, Laptop, Heart, Share2 } from 'lucide-react';

const ElectronicsBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Tag },
    { id: 'mobile', name: 'Điện thoại', icon: Smartphone },
    { id: 'audio', name: 'Âm thanh', icon: Headphones },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'laptop', name: 'Laptop', icon: Laptop }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Smartphone Flagship 2025: Cuộc Chiến Công Nghệ',
      excerpt: 'Khám phá những chiếc điện thoại cao cấp nhất năm 2025 với công nghệ AI tiên tiến, camera cách mạng và hiệu năng đỉnh cao.',
      category: 'mobile',
      author: 'Minh Tuấn',
      date: '25 Tháng 6, 2025',
      readTime: '8 phút đọc',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
      tags: ['Smartphone', 'Flagship', 'AI', 'Camera'],
      likes: 142,
      featured: true
    },
    {
      id: 2,
      title: 'Tai Nghe Gaming: Trải Nghiệm Âm Thanh Immersive',
      excerpt: 'So sánh chi tiết các dòng tai nghe gaming hàng đầu với công nghệ âm thanh 3D và micro chất lượng studio.',
      category: 'audio',
      author: 'Thu Hương',
      date: '23 Tháng 6, 2025',
      readTime: '6 phút đọc',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop',
      tags: ['Gaming', 'Headset', '3D Audio'],
      likes: 89,
      featured: false
    },
    {
      id: 3,
      title: 'Laptop Gaming vs Workstation: Chọn Lựa Thông Minh',
      excerpt: 'Phân tích sự khác biệt giữa laptop gaming và workstation để đưa ra quyết định mua sắm phù hợp nhất.',
      category: 'laptop',
      author: 'Đức Anh',
      date: '20 Tháng 6, 2025',
      readTime: '10 phút đọc',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
      tags: ['Laptop', 'Gaming', 'Workstation'],
      likes: 156,
      featured: true
    },
    {
      id: 4,
      title: 'Bàn Phím Cơ: Nghệ Thuật Gõ Phím Hoàn Hảo',
      excerpt: 'Tìm hiểu về các loại switch, layout và tính năng của bàn phím cơ để nâng cao trải nghiệm typing và gaming.',
      category: 'gaming',
      author: 'Văn Hải',
      date: '18 Tháng 6, 2025',
      readTime: '7 phút đọc',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop',
      tags: ['Mechanical', 'Keyboard', 'Switch'],
      likes: 234,
      featured: false
    },
    {
      id: 5,
      title: 'Loa Bluetooth: Âm Thanh Di Động Chất Lượng Cao',
      excerpt: 'Đánh giá những chiếc loa Bluetooth tốt nhất với chất lượng âm thanh Hi-Fi và thời lượng pin ấn tượng.',
      category: 'audio',
      author: 'Thanh Loan',
      date: '15 Tháng 6, 2025',
      readTime: '5 phút đọc',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop',
      tags: ['Bluetooth', 'Speaker', 'Hi-Fi'],
      likes: 67,
      featured: false
    },
    {
      id: 6,
      title: 'Console Gaming 2025: PlayStation vs Xbox vs Nintendo',
      excerpt: 'Cuộc so tài chi tiết giữa các console gaming hàng đầu về hiệu năng, game độc quyền và tính năng đặc biệt.',
      category: 'gaming',
      author: 'Quang Minh',
      date: '12 Tháng 6, 2025',
      readTime: '12 phút đọc',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      tags: ['Console', 'PlayStation', 'Xbox', 'Nintendo'],
      likes: 198,
      featured: true
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TechBlog</h1>
                <p className="text-purple-300 text-sm">Khám phá công nghệ</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Trang chủ</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Blog</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Sản phẩm</a>
              <a href="#" className="text-white hover:text-purple-300 transition-colors">Liên hệ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tech Blog
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto">
            Khám phá thế giới công nghệ với những bài viết chuyên sâu về mobile, audio, gaming và nhiều hơn nữa
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 backdrop-blur-md text-purple-200 hover:bg-white/20'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && (
        <section className="px-6 mb-20">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Bài Viết Nổi Bật</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Nổi bật
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-purple-300 text-sm mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-purple-300 text-sm">{post.likes}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            {selectedCategory === 'all' ? 'Tất Cả Bài Viết' : `Danh Mục: ${categories.find(c => c.id === selectedCategory)?.name}`}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-purple-300 text-sm">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-purple-300 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-purple-300 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="text-purple-300 hover:text-blue-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center text-purple-300 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Không tìm thấy bài viết</h3>
              <p className="text-purple-300">Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Đăng Ký Nhận Tin</h3>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Nhận những bài viết mới nhất về công nghệ và xu hướng điện tử thẳng vào hộp thư của bạn
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default ElectronicsBlog;