"use client";
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Smartphone, Laptop, Headphones, Tablet, Shield, Truck, Award, Users } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitted(true);
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         subject: '',
//         category: '',
//         message: ''
//       });
      
//       setTimeout(() => setSubmitted(false), 5000);
//     }, 1000);
//   };

  const categories = [
    'Mobile & Smartphone',
    'Laptop & PC',
    'Audio & Headphones',
    'Tablet & iPad',
    'Accessories',
    'Warranty Support',
    'Technical Support',
    'Order Inquiry',
    'Other'
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Hotline Hỗ Trợ',
      info: '1900 1234',
      subInfo: 'Miễn phí từ 8:00 - 22:00',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Hỗ Trợ',
      info: 'support@techstore.vn',
      subInfo: 'Phản hồi trong 24h',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Địa Chỉ Showroom',
      info: '123 Nguyễn Huệ, Q.1, TP.HCM',
      subInfo: 'Tầng 1-2, Center Mall',
      color: 'text-red-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      info: 'Chat trực tuyến',
      subInfo: 'Hỗ trợ 24/7',
      color: 'text-purple-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Bảo Hành Chính Hãng',
      desc: 'Cam kết 100% hàng chính hãng'
    },
    {
      icon: Truck,
      title: 'Giao Hàng Nhanh',
      desc: 'Giao hàng trong ngày tại TP.HCM'
    },
    {
      icon: Award,
      title: 'Uy Tín Hàng Đầu',
      desc: 'Top 1 website tin cậy năm 2024'
    },
    {
      icon: Users,
      title: 'Hỗ Trợ 24/7',
      desc: 'Đội ngũ tư vấn chuyên nghiệp'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              TechStore - Điểm đến tin cậy cho công nghệ
            </p>
            <div className="flex justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Mobile</span>
              </div>
              <div className="flex items-center space-x-2">
                <Laptop className="w-5 h-5" />
                <span>Laptop</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5" />
                <span>Audio</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tablet className="w-5 h-5" />
                <span>Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className={`${item.color} mb-4`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-lg font-semibold text-gray-700 mb-1">{item.info}</p>
              <p className="text-sm text-gray-500">{item.subInfo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Gửi Tin Nhắn</h2>
                <p className="text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi thắc mắc về sản phẩm và dịch vụ</p>
              </div>

              {false && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="font-medium">Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số Điện Thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0987 654 321"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh Mục *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu Đề *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tóm tắt nội dung cần hỗ trợ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội Dung *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu của bạn..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={false}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {false ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Đang Gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Gửi Tin Nhắn</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Giờ Làm Việc</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                  <span className="font-medium">8:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ 7 - Chủ Nhật</span>
                  <span className="font-medium">9:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lễ Tết</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Tại Sao Chọn Chúng Tôi?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Cần Hỗ Trợ Ngay?</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left">
                  📞 Gọi Hotline: 1900 1234
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left">
                  💬 Chat Trực Tuyến
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-left">
                  📧 Email Hỗ Trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Khám Phá Sản Phẩm Mới Nhất</h3>
          <p className="text-gray-400 mb-6">Cập nhật những công nghệ tiên tiến nhất với giá tốt nhất</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Xem Sản Phẩm
          </button>
        </div>
      </div>
    </div>
  );
}