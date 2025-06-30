"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Smartphone, Headphones, Laptop, Gamepad2, Wifi, Truck, CreditCard, Shield, RotateCcw, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const categories = [
    { id: 'all', name: 'Tất cả', icon: HelpCircle },
    { id: 'mobile', name: 'Điện thoại', icon: Smartphone },
    { id: 'audio', name: 'Âm thanh', icon: Headphones },
    { id: 'laptop', name: 'Laptop', icon: Laptop },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'networking', name: 'Mạng', icon: Wifi },
    { id: 'shipping', name: 'Giao hàng', icon: Truck },
    { id: 'payment', name: 'Thanh toán', icon: CreditCard },
    { id: 'warranty', name: 'Bảo hành', icon: Shield },
    { id: 'return', name: 'Đổi trả', icon: RotateCcw }
  ];

  const faqData = [
    {
      id: 1,
      category: 'mobile',
      question: 'Làm thế nào để kiểm tra điện thoại chính hãng?',
      answer: 'Chúng tôi chỉ bán các sản phẩm chính hãng có tem bảo hành và hóa đơn VAT. Bạn có thể kiểm tra mã IMEI trên website chính thức của hãng hoặc yêu cầu nhân viên hỗ trợ kiểm tra tại cửa hàng.'
    },
    {
      id: 2,
      category: 'mobile',
      question: 'Thời gian bảo hành điện thoại là bao lâu?',
      answer: 'Thời gian bảo hành điện thoại thường là 12 tháng cho máy và 6 tháng cho phụ kiện đi kèm. Một số dòng cao cấp có thể có thời gian bảo hành lên đến 24 tháng.'
    },
    {
      id: 3,
      category: 'audio',
      question: 'Tai nghe có được bảo hành không?',
      answer: 'Có, tất cả tai nghe đều được bảo hành từ 6-12 tháng tùy theo thương hiệu. Bảo hành bao gồm lỗi kỹ thuật, không bao gồm hư hỏng do va đập hoặc rơi vỡ.'
    },
    {
      id: 4,
      category: 'audio',
      question: 'Tôi có thể thử tai nghe trước khi mua không?',
      answer: 'Tại cửa hàng, bạn hoàn toàn có thể thử các sản phẩm tai nghe trước khi quyết định mua. Chúng tôi có khu vực trải nghiệm với đầy đủ thiết bị âm thanh chất lượng cao.'
    },
    {
      id: 5,
      category: 'laptop',
      question: 'Laptop có được cài sẵn phần mềm không?',
      answer: 'Laptop được bán kèm hệ điều hành chính thức. Chúng tôi cũng cung cấp dịch vụ cài đặt phần mềm cần thiết miễn phí như Office, antivirus cơ bản và driver.'
    },
    {
      id: 6,
      category: 'laptop',
      question: 'Tôi có thể nâng cấp RAM và ổ cứng sau khi mua không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ nâng cấp RAM và ổ cứng với giá ưu đãi. Việc nâng cấp sẽ không ảnh hưởng đến bảo hành máy nếu thực hiện tại cửa hàng.'
    },
    {
      id: 7,
      category: 'gaming',
      question: 'PC Gaming có được lắp ráp theo yêu cầu không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ lắp ráp PC Gaming theo cấu hình và ngân sách của bạn. Đội ngũ kỹ thuật sẽ tư vấn chi tiết và test kỹ trước khi bàn giao.'
    },
    {
      id: 8,
      category: 'gaming',
      question: 'Thời gian bảo hành cho PC Gaming như thế nào?',
      answer: 'PC Gaming được bảo hành 24 tháng cho toàn bộ hệ thống, 36 tháng cho các linh kiện cao cấp. Chúng tôi cam kết hỗ trợ kỹ thuật trọn đời.'
    },
    {
      id: 9,
      category: 'networking',
      question: 'Router WiFi có hỗ trợ cài đặt tại nhà không?',
      answer: 'Có, chúng tôi cung cấp dịch vụ cài đặt và cấu hình router WiFi tại nhà với phí dịch vụ hợp lý. Kỹ thuật viên sẽ tối ưu hóa tín hiệu WiFi cho không gian của bạn.'
    },
    {
      id: 10,
      category: 'networking',
      question: 'Làm thế nào để chọn router phù hợp với nhà tôi?',
      answer: 'Để chọn router phù hợp, bạn cần xem xét diện tích nhà, số lượng thiết bị kết nối và tốc độ internet. Nhân viên chúng tôi sẽ tư vấn cụ thể dựa trên nhu cầu sử dụng.'
    },
    {
      id: 11,
      category: 'shipping',
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Đơn hàng trong nội thành sẽ được giao trong 2-4 giờ. Đơn hàng ngoại thành và tỉnh xa từ 1-3 ngày làm việc. Giao hàng nhanh trong 1 giờ có phí phụ thu.'
    },
    {
      id: 12,
      category: 'shipping',
      question: 'Phí giao hàng được tính như thế nào?',
      answer: 'Miễn phí giao hàng cho đơn từ 500k trong nội thành, từ 1 triệu cho tỉnh xa. Đơn hàng dưới mức miễn phí sẽ có phí giao hàng từ 15k-30k tùy khu vực.'
    },
    {
      id: 13,
      category: 'payment',
      question: 'Cửa hàng nhận những hình thức thanh toán nào?',
      answer: 'Chúng tôi nhận tiền mặt, chuyển khoản, thẻ ATM/Visa/Master, ví điện tử (Momo, ZaloPay, VNPay), và trả góp 0% qua thẻ tín dụng hoặc công ty tài chính.'
    },
    {
      id: 14,
      category: 'payment',
      question: 'Có thể trả góp sản phẩm không?',
      answer: 'Có, chúng tôi hỗ trợ trả góp 0% lãi suất cho đơn hàng từ 3 triệu với thẻ tín dụng của các ngân hàng liên kết. Trả góp qua công ty tài chính cho các trường hợp khác.'
    },
    {
      id: 15,
      category: 'warranty',
      question: 'Quy trình bảo hành như thế nào?',
      answer: 'Khi có lỗi, bạn mang sản phẩm và phiếu bảo hành đến cửa hàng. Chúng tôi sẽ kiểm tra và xử lý trong 1-3 ngày làm việc. Có dịch vụ bảo hành tận nơi cho sản phẩm cao cấp.'
    },
    {
      id: 16,
      category: 'warranty',
      question: 'Những trường hợp nào không được bảo hành?',
      answer: 'Không bảo hành các trường hợp: rơi vỡ, vào nước, cháy nổ do lỗi người dùng, tự ý sửa chữa, hết thời gian bảo hành hoặc không có phiếu bảo hành.'
    },
    {
      id: 17,
      category: 'return',
      question: 'Tôi có thể đổi trả sản phẩm không?',
      answer: 'Có, bạn có thể đổi trả trong 7 ngày với sản phẩm còn nguyên seal, 15 ngày với sản phẩm đã kích hoạt nhưng còn như mới, đầy đủ hộp và phụ kiện.'
    },
    {
      id: 18,
      category: 'return',
      question: 'Chi phí đổi trả được tính như thế nào?',
      answer: 'Đổi trả do lỗi sản phẩm: miễn phí. Đổi trả do thay đổi ý định: khách hàng chịu phí vận chuyển và phí xử lý 2-5% giá trị sản phẩm.'
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <HelpCircle size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Câu Hỏi Thường Gặp</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Tìm câu trả lời cho mọi thắc mắc về sản phẩm và dịch vụ của chúng tôi
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-500">Hãy thử từ khóa khác hoặc chọn danh mục khác</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-800 pr-4">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openItems[item.id] ? (
                        <ChevronUp className="text-blue-600 transform transition-transform duration-200" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400 transform transition-transform duration-200" size={20} />
                      )}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-5">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Không tìm thấy câu trả lời?</h3>
          <p className="mb-6 opacity-90">
            Liên hệ với chúng tôi để được hỗ trợ trực tiếp từ đội ngũ chuyên viên
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Chat trực tuyến
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
              Gọi hotline: 1900-xxx-xxx
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;