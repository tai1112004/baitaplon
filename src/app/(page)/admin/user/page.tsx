"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Users, Edit3, Trash2, Plus, Shield, User } from 'lucide-react';
import { adminApi, generalApi } from '../../../../../lib/api';
import { getCookie } from '@/app/function/GetCookie/GetCookie';
type userType = 
{
  id: number; 
  name: string;
  email: string;
  role: string;
  password?: string;
}

type newUserType = 
{
  name: string;
  email: string;
  role: string;
  password?: string;
}
const UserManagement = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const token = getCookie('token');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<userType | undefined>();
  const [newUser, setNewUser] = useState<userType>({ id: 0, name: '', email: '', role: 'USER' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${adminApi}getUser` ,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data);

  }
    fetchUsers();
},[])
const changeRole = async (userId:number, name:string) => {
  await fetch(`${adminApi}changeRoleUser/${userId}` ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({name})
  })
}
const deleteUserAPI = async (userId:number) => {
  await fetch(`${adminApi}deleteUser/${userId}` ,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${token}`
    }
  })
}
const registerUser = async (user:userType) => {
  await fetch(`${generalApi}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
}
  // Xóa người dùng
  const deleteUser = (userId:number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      deleteUserAPI(userId);

      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Cập nhật role người dùng
  const updateUserRole = (userId : number, newRole :string) => {
    changeRole(userId, newRole);
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  // Thêm người dùng mới
  const addUser = () => {
    if (newUser.name && newUser.email) {
      registerUser(newUser);
      setUsers([...users, { ...newUser}]);
      setNewUser({ id: 0, name: '', email: '', role: 'USER' });
      setShowModal(false);
    }
  };

  // Cập nhật thông tin người dùng
  const updateUser = () => {
    if (selectedUser && selectedUser.name && selectedUser.email) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? selectedUser : user
      ));
      setShowModal(false);
      setSelectedUser(undefined);
      setIsEditing(false);
    }
  };

  // Mở modal để chỉnh sửa
  const openEditModal = (user:userType) => {
    setSelectedUser({...user});
    setIsEditing(true);
    setShowModal(true);
  };

  // Mở modal để thêm mới
  const openAddModal = () => {
    setNewUser({ id: 0, name: '', email: '', role: 'USER' });
    setIsEditing(false);
    setShowModal(true);
  };

  const getRoleColor = (role:string) => {
    return role === 'ADMIN' 
      ? 'bg-purple-100 text-purple-800 border-purple-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  // const getRoleIcon = (role:string) => {
  //   return role === 'ADMIN' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Quản Lý Người Dùng</h1>
                <p className="text-gray-600">Quản lý tài khoản và phân quyền hệ thống</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Thêm Người Dùng</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tổng Người Dùng</p>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Quản Trị Viên</p>
                <p className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === 'ADMIN').length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Người Dùng</p>
                <p className="text-3xl font-bold text-blue-600">{users.filter(u => u.role === 'USER').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Danh Sách Người Dùng</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Họ Tên</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Vai Trò</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-600">#{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => typeof user.id === 'number' && updateUserRole(user.id, e.target.value)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border cursor-pointer ${getRoleColor(user.role)}`}
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => openEditModal(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Chỉnh sửa"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => typeof user.id === 'number' && deleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {isEditing ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng Mới'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ Tên</label>
                  <input
                    type="text"
                    value={isEditing ? (selectedUser?.name || '') : newUser.name}
                    onChange={(e) => isEditing 
                      ? setSelectedUser(selectedUser ? {...selectedUser, name: e.target.value} : undefined)
                      : setNewUser({...newUser, name: e.target.value})
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ tên"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={isEditing ? (selectedUser?.email || '') : newUser.email}
                    onChange={(e) => isEditing 
                      ? setSelectedUser(selectedUser ? {...selectedUser, email: e.target.value} : undefined)
                      : setNewUser({...newUser, email: e.target.value})
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật Khẩu</label>
                  <input
                    type="text"
                    value={isEditing ? selectedUser?.password ?? '' : newUser.password}
                    onChange={(e) => isEditing 
                      ? setSelectedUser({...selectedUser, password: e.target.value})
                      : setNewUser({...newUser, password: e.target.value})
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vai Trò</label>
                  <select
                    value={isEditing ? selectedUser?.role ?? '' : newUser.role}
                    onChange={(e) => isEditing 
                      ? setSelectedUser({...selectedUser, role: e.target.value})
                      : setNewUser({...newUser, role: e.target.value})
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedUser(undefined);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={isEditing ? updateUser : addUser}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
