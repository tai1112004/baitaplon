"use client";
import { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Eye, Calendar, User, MapPin, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import { adminApi } from '../../../../../lib/api';
import { getCookie } from '@/app/function/GetCookie/GetCookie';
type statusType = 'pending' | 'shipped' | 'delivered' | 'cancelled';
type statusConfigType = {
  [key in statusType]: {
    label: string;
    icon: React.ComponentType;
    color: string;
    nextStatus: statusType | null;
    nextLabel: string | null;
  };
}
type orderType = {
  id?:number ,
  order_Date?: string,
  total_price?: number,
  note?: string,
  status?: string,
  shipping?: shippingType,
  user?: userType,
  orderDetails?: orderDetailsType[],
}
type shippingType ={
  id?: number,
  receiver?: string,
  phone_Receiver?: string,
  address_receiver?: string,
  isDelivery?: boolean,
  note?: string,
}
type userType = {
  id?: number,
  name?: string,
  email?: string,
  role?: string,
}
type orderDetailsType = {
  id?: number,
  quantity?: number,
  price?: number,
  note?: string,
  product?: productType,
}
type productType ={
  id?: number,
  name?: string,
  price?: number,

}
const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState<orderType | null>(null);
  const [orders, setOrders] = useState<orderType[]>([]);
  const getToken = getCookie('token');
  const statusConfig:statusConfigType = {
    pending: { 
      label: 'Chưa xử lý', 
      icon: Package, 
      color: 'bg-yellow-100 text-yellow-800',
      nextStatus: 'shipped',
      nextLabel: 'Chuyển sang vận chuyển'
    },
    shipped: { 
      label: 'Đang vận chuyển', 
      icon: Truck, 
      color: 'bg-blue-100 text-blue-800',
      nextStatus: 'delivered',
      nextLabel: 'Đánh dấu đã giao'
    },
    delivered: { 
      label: 'Đã giao', 
      icon: CheckCircle, 
      color: 'bg-green-100 text-green-800',
      nextStatus: null,
      nextLabel: null
    },
    cancelled: { 
      label: 'Đã hủy', 
      icon: XCircle, 
      color: 'bg-red-100 text-red-800',
      nextStatus: null,
      nextLabel: null
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const respose = await fetch(`${adminApi}listUser/status/${activeTab}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken}`
        }
      })
      const data = await respose.json();
      setOrders(data);
    }
    fetchOrders();
    console.log(orders);
  },[activeTab])
  const updateStatus = async (orderId:number, newStatus: string) => {
      await fetch(`${adminApi}changeStatus?nameStatus=${newStatus}&id=${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
      }
  }) 
  }
  const filteredOrders = orders.filter(order => order.status === activeTab);

  const formatCurrency = (amount : number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const updateOrderStatus = (orderId:number, newStatus: string) => {
    updateStatus(orderId, newStatus);
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const OrderCard = ({ order} : {order: orderType}) => {
    const StatusIcon = statusConfig[(order.status ?? 'pending') as statusType].icon;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
            <p className="text-gray-600">{order.user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[(order.status ?? 'pending') as statusType].color}`}>
              <StatusIcon className="w-4 h-4 inline mr-1" />
              {statusConfig[(order.status ?? 'pending') as statusType].label}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            {order.order_Date}
          </p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(order.total_price?order.total_price:0)}</p>
        </div>
        
        <button
          onClick={() => setSelectedOrder(order)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Xem chi tiết
        </button>
      </div>
    );
  };

  const OrderDetailModal = ({ order, onClose }: { order: orderType | null, onClose: () => void }) => {
    if (!order) return null;

    const StatusIcon = statusConfig[(order.status ?? 'pending') as statusType].icon;
    const canChangeStatus = order.status && statusConfig[(order.status as statusType)]?.nextStatus !== null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
        <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] overflow-y-auto mt-30">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng {order.id}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Trạng thái */}
              <div className="flex items-center gap-3">
                <StatusIcon className="w-6 h-6" />
                <span className={`px-4 py-2 rounded-full font-medium ${statusConfig[(order.status ?? 'pending') as statusType].color}`}>
                  {statusConfig[(order.status ?? 'pending') as statusType].label}
                </span>
              </div>

              {/* Thông tin khách hàng */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin khách hàng
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Tên người đặt:</strong> {order.user?.name}</p>
                  <p><strong>Tên người nhận:</strong> {order.shipping?.receiver}</p>
                  <p><strong>Số điện thoại:</strong> {order.shipping?.phone_Receiver}</p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span><strong>Địa chỉ:</strong> {order.shipping?.address_receiver}</span>
                  </p>
                </div>
              </div>

              {/* Sản phẩm */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Sản phẩm
                </h3>
                <div className="space-y-3">
                  {order.orderDetails?.map((orderDetail, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <p className="font-medium">{orderDetail.product?.name}</p>
                        <p className="text-sm text-gray-600">Số lượng: {orderDetail.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(
                          ((orderDetail.product?.price ?? 0) * (orderDetail.quantity ?? 0))
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thông tin thanh toán */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Thông tin thanh toán
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Phương thức:</strong>chuyển khoản</p>
                  <p><strong>Ngày đặt:</strong> {order.order_Date}</p>
                  <p className="text-lg"><strong>Tổng tiền:</strong> {formatCurrency(order.total_price ?? 0)}</p>
                </div>
              </div>

              {/* Nút chuyển trạng thái */}
              {canChangeStatus && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updateOrderStatus(order.id, statusConfig[(order.status ?? 'pending') as statusType].nextStatus )}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    {statusConfig[(order.status ?? 'pending') as statusType].nextLabel}
                  </button>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản lý đơn hàng</h1>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            {Object.entries(statusConfig).map(([status, config]) => {
              const Icon = config.icon;
              const count = orders.filter(order => order.status === status).length;
              
              return (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                    activeTab === status
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {config.label}
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Grid */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Không có đơn hàng nào trong trạng thái này</p>
          </div>
        )}

        {/* Order Detail Modal */}
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      </div>
    </div>
  );
};

export default OrderManagement;