"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useEffect } from 'react';
import { Plus,  X, Package, Building2, Save, Image, Edit2, Trash2, Grid3X3 } from 'lucide-react';
import { adminApi, generalApi } from '../../../../../lib/api';
import { getCookie } from '../../../function/GetCookie/GetCookie';
type categoriesType ={
  id?: number;
  name?: string;
}
type brandType = {
  id?: number;
  name?: string;
  code?: string;
}
type productType = {
    id?: number;
    name?: string;
    quantity?: string;
    description?: string;
    color?: string;
    price?: number;
    discount?:  number ; 
    RAM?: string;
    screen?: string;
    gpu?:    string;
    cpu?:    string;
    driver_size?: string;
    count_camera?: string;
    resolution?:     string;
    sensor?:     string;
    capacity_battery?: string;
    operating_system?: string;
    connectivity?: string;
    audio_technical?: string;
    style?: string;
    time_battery?: string;
    delay?: string;
    support_stylus?: false,
    brand?: string;
    categories ?: string ; 
    images ?: imageType[] ; 
}
type imageType = {
    id: number;
    image: string ; 
}
type imageAddType ={
    fileList: File;
}
const AdminPanel = () => {

     const token = getCookie("token") ; 
  const [activeTab, setActiveTab] = useState('products');
  const [brands, setBrands] = useState<brandType[]>([]);

  const [categories, setCategories] = useState<categoriesType[]>([]);
  
  const [products, setProducts] = useState<productType[]>([]);
  const [selectedImages, setSelectedImages] = useState<imageAddType[]>([]);
  const [add , setAdd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Brand editing states
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<number | null>(null);

  // Category editing states
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null >(null);

  // Product form state
  const [productForm, setProductForm] = useState<productType>({
    name: '',
    quantity: '',
    description: '',
    price: 0,
    discount: 0,
    color: '',
    RAM: '',
    screen: '',
    gpu: '',
    cpu: '',
    driver_size: '',
    count_camera: '',
    resolution: '',
    sensor: '',
    capacity_battery: '',
    operating_system: '',
    connectivity: '',
    audio_technical: '',
    style: '',
    time_battery: '',
    delay: '',
    support_stylus: false,
    brand: '' ,
    categories: ''
    }
  );

  const addProduct= async (productAdd:productType , images: imageAddType[]) => {
    const formData = new FormData();
    formData.append("dataProduct", new Blob([JSON.stringify(productAdd)], {
        type: "application/json"
        }));

    images.forEach((image) => {
      formData.append(`fileList`, image.fileList);
    });
    const response = await fetch(`${adminApi}addProduct` ,
        {
            method: 'POST',
            headers:{
                "Authorization" : `Bearer ${token}` 
            } ,
            body:formData
        }
    )
    const data = await response.json();
    if (data.success) {
      alert('Sản phẩm đã được thêm thành công!');
    } else {
      alert('Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.');
    }
  }
  const updateProduct= async (productAdd:productType ) => {
    const response = await fetch(`${adminApi}updateProduct` ,
        {
            method: "PATCH",
            headers:{
                "content-type": "application/json",
                "Authorization" : `Bearer ${token}` 
            } ,
            body: JSON.stringify(productAdd)
        }
    )
    const data = await response.json();
    if (data.success) {
      alert('Sản phẩm đã được cập nhật thành công!');
    } else {
      alert('Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại.');
    }
  }
  const deleteProduct = async (productId:number) => {
    await fetch(`${adminApi}delProduct/${productId}` ,
        {
            method: "DELETE",
            headers:{
                "content-type": "application/json",
                "Authorization" : `Bearer ${token}` 
            }
            }
  )}
  
  useEffect(() => {
    const getData = async () => {
        const response = await fetch(`${generalApi}getProducts`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }

        })
        const data = await response.json();
        setProducts(data);
        
         
    }
    getData();
  },[add])
  const addBrand = async (brand :brandType) =>{
     const response = await fetch(`${adminApi}addBrand` ,{
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}` 
      },
      body: JSON.stringify( brand)
    })
    const data = await response.json();
    if (data.success) {
      alert('Hãng đã được thêm thành công!');
    }
    else {
      console.log(data);
      alert('Đã xảy ra lỗi khi thêm hãng. Vui lòng thử lại.');
    }
  }
  useEffect(() => {
    const getData = async () => {
        const response = await fetch(`${generalApi}getBrands`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }

        })
        const data = await response.json();
        setBrands(data);
        
         
    }
    getData();
  },[])
  const updateBrand = async (brand:brandType) => {
    const response = await fetch(`${adminApi}updateBrand`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(brand)
    })
    const data = await response.json();
    if (data.success) {
      alert('Hãng đã được cập nhật thành công!');
    }
    else {
      alert('Hãng của bạn đã được thêm ở trước đó ròi !');
    }
  }
  const deleteBrand = async (brandId: number) => {
     await fetch(`${adminApi}delBrand/${brandId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
  }
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${generalApi}getCategories`, {
        method: 'GET',
        headers: {
          "content-type": "application/json",
        }
      });
      const data = await response.json();
      setCategories(data);
    }
    getData();
  }, []);
  const addCategories = async (category:categoriesType) => {
     await fetch(`${adminApi}addCategories`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
   
  }
  const updateCategories = async (category:categoriesType) => {
    const response = await fetch(`${adminApi}updateCategories`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
    const data = await response.json();
    if (data.success) {
      alert('Thể loại đã được cập nhật thành công!');
    }
    else {
      alert('Thể loại của bạn đã được thêm ở trước đó ròi !');
    }
  }
  const deleteCategories = async (categoryId: number) => {
    await fetch(`${adminApi}delCategories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  // Brand form state
  const [brandForm, setBrandForm] = useState<brandType>({ name: '' })

  // Category form state
  const [categoryForm, setCategoryForm] = useState<categoriesType>({
    name: '',
  });

  const handleProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setProductForm(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  const handleBrandFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCategoryFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList) as File[];
    const imageUrls: imageAddType[] = files.map((file) => ({
      fileList: file,
    }));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const removeImage = (imageId:number) => {
    setSelectedImages(prev => prev.filter((img,index) => index!== imageId));
  };

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.brand || !productForm.quantity || !productForm.price) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    if (isEditing) {
      // Update existing product
      updateProduct(productForm);
      setIsEditing(false);
      setEditingProductId(null);
      alert('Sản phẩm đã được cập nhật thành công!');
    } else {
      // Add new product
    //   addProduct(productForm, selectedImages);
    setAdd(!add) ; 
    addProduct(productForm, selectedImages);
      alert('Sản phẩm đã được thêm thành công!');
    }
    
    // Reset form
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      quantity: '',
      description: '',
      color: '',
      price: 0,
      discount: 0,
      RAM: '',
      screen: '',
      gpu: '',
      cpu: '',
      driver_size: '',
      count_camera: '',
      resolution: '',
      sensor: '',
      capacity_battery: '',
      operating_system: '',
      connectivity: '',
      audio_technical: '',
      style: '',
      time_battery: '',
      delay: '',
      support_stylus: false,
      brand: '' ,
    categories: '',
        images: []
    });
    setSelectedImages([]);
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleEditProduct = (product:productType) => {
    setProductForm({
        id: product.id,
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      color: product.color,
      price: product.price,
      discount: product.discount,
      RAM: product.RAM,
      screen: product.screen,
      gpu: product.gpu,
      cpu: product.cpu,
      driver_size: product.driver_size,
      count_camera: product.count_camera,
      resolution: product.resolution,
      sensor: product.sensor,
      capacity_battery: product.capacity_battery,
      operating_system: product.operating_system,
      connectivity: product.connectivity,
      audio_technical: product.audio_technical,
      style: product.style,
      time_battery: product.time_battery,
      delay: product.delay,
      support_stylus: product.support_stylus,
      brand: product.brand,
      categories: product.categories,
    });
    setIsEditing(true);
    setEditingProductId(product.id ?? null);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (productId:number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
       deleteProduct(productId);
      setProducts(prev => prev.filter(product => product.id !== productId));
     
      // If deleting the product being edited, reset form
      if (editingProductId === productId) {
        resetProductForm();
      }
      
      alert('Sản phẩm đã được xóa thành công!');
    }
  };

  const handleCancelEdit = () => {
    resetProductForm();
  };

  const handleAddBrand = () => {
    if (!(brandForm.name ?? '').trim()) {
      alert('Vui lòng nhập tên hãng!');
      return;
    }

    if (isEditingBrand) {
      // Update existing brand
      const updatedBrand:brandType = {
        id: editingBrandId ?? undefined,
        name: (brandForm?.name ?? '').trim()
      };
      updateBrand(updatedBrand);
      setBrands(prev => prev.map(brand => 
        brand.id === editingBrandId ? updatedBrand : brand
      ));
      
      setIsEditingBrand(false);
      setEditingBrandId(null);
      alert('Hãng đã được cập nhật thành công!');
    } else {
      // Add new brand
      const newBrand = {
        name: (brandForm?.name ?? '').trim()
      };
      // console.log('Adding new brand:', brandForm);
      addBrand(newBrand);
      setBrands(prev => [...prev, newBrand]);
    }
    
    setBrandForm({ name: '' });
  };

  const handleEditBrand = (brand:brandType) => {
    setBrandForm({ 
      name: brand.name,
      id: brand.id ?? undefined,
     });
    setIsEditingBrand(true);
    setEditingBrandId(brand.id ?? null);
  };

  const handleDeleteBrand = (brandId:number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hãng này?')) {
      deleteBrand(brandId);
      setBrands(prev => prev.filter(brand => brand.id !== brandId));
      
      // If deleting the brand being edited, reset form
      if (editingBrandId === brandId) {
        setBrandForm({ name: '' });
        setIsEditingBrand(false);
        setEditingBrandId(null);
      }
      
      alert('Hãng đã được xóa thành công!');
    }
  };

  const handleCancelEditBrand = () => {
    setBrandForm({ name: '' });
    setIsEditingBrand(false);
    setEditingBrandId(null);
  };

  // Category management functions
  const handleAddCategory = () => {
    if (!(categoryForm.name ?? '').trim()) {
      alert('Vui lòng nhập tên danh mục!');
      return;
    }

    if (isEditingCategory) {
      // Update existing category
      const updatedCategory:categoriesType = {
        id: editingCategoryId ?? undefined,
        name: (categoryForm.name ?? '').trim(),
      };
      updateCategories(updatedCategory);
      setCategories(prev => prev.map(category => 
        category.id === editingCategoryId ? updatedCategory : category
      ));
      
      setIsEditingCategory(false);
      setEditingCategoryId(null);
      alert('Danh mục đã được cập nhật thành công!');
    } else {
      // Add new category
      const newCategory:categoriesType = {
        name: (categoryForm.name ??'').trim(),
      };
      addCategories(newCategory);
      setCategories(prev => [...prev, newCategory]);
      alert('Danh mục đã được thêm thành công!');
    }
    
    setCategoryForm({ name: '' });
  };

  const handleEditCategory = (category:categoriesType) => {
    setCategoryForm({ 
      name: category.name ?? '',
    });
    setIsEditingCategory(true);
    setEditingCategoryId(category.id ?? null);
  };

  const handleDeleteCategory = (categoryId:number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      deleteCategories(categoryId);
      setCategories(prev => prev.filter(category => category.id !== categoryId));
      
      // If deleting the category being edited, reset form
      if (editingCategoryId === categoryId) {
        setCategoryForm({ name: '' });
        setIsEditingCategory(false);
        setEditingCategoryId(null);
      }
      
      alert('Danh mục đã được xóa thành công!');
    }
  };

  const handleCancelEditCategory = () => {
    setCategoryForm({ name: ''});
    setIsEditingCategory(false);
    setEditingCategoryId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <div className="text-sm text-gray-500">
              Quản lý sản phẩm và hãng sản xuất
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'products'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package className="mr-2 h-5 w-5" />
              Quản lý Sản phẩm
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'brands'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Quản lý Hãng
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'categories'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3X3 className="mr-2 h-5 w-5" />
              Quản lý Danh mục
            </button>
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* Add Product Form */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  {isEditing ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm Mới'}
                </h2>
                {isEditing && (
                  <p className="text-sm text-blue-600 mt-1">
                    Đang chỉnh sửa sản phẩm: {productForm.name}
                  </p>
                )}
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hãng sản xuất *
                    </label>
                    <select
                      name="brand"
                      value={productForm.brand}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn hãng</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh Mục Sản Phẩm *
                    </label>
                    <select
                      name="categories"
                      value={productForm.categories}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn Danh Mục</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={productForm.quantity}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giá (VNĐ) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giảm giá (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={productForm.discount}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Màu sắc
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={productForm.color}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Technical Specs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RAM
                    </label>
                    <input
                      type="text"
                      name="RAM"
                      value={productForm.RAM}
                      onChange={handleProductFormChange}
                      placeholder="8GB, 16GB..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Màn hình
                    </label>
                    <input
                      type="text"
                      name="screen"
                      value={productForm.screen}
                      onChange={handleProductFormChange}
                      placeholder="6.1 inch OLED..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPU
                    </label>
                    <input
                      type="text"
                      name="gpu"
                      value={productForm.gpu}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPU
                    </label>
                    <input
                      type="text"
                      name="cpu"
                      value={productForm.cpu}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bộ nhớ trong
                    </label>
                    <input
                      type="text"
                      name="driver_size"
                      value={productForm.driver_size}
                      onChange={handleProductFormChange}
                      placeholder="128GB, 256GB..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số camera
                    </label>
                    <input
                      type="number"
                      name="count_camera"
                      value={productForm.count_camera}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Độ phân giải
                    </label>
                    <input
                      type="text"
                      name="resolution"
                      value={productForm.resolution}
                      onChange={handleProductFormChange}
                      placeholder="1920x1080, 4K..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cảm biến
                    </label>
                    <input
                      type="text"
                      name="sensor"
                      value={productForm.sensor}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dung lượng pin (mAh)
                    </label>
                    <input
                      type="number"
                      name="capacity_battery"
                      value={productForm.capacity_battery}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hệ điều hành
                    </label>
                    <input
                      type="text"
                      name="operating_system"
                      value={productForm.operating_system}
                      onChange={handleProductFormChange}
                      placeholder="iOS 17, Android 14..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kết nối
                    </label>
                    <input
                      type="text"
                      name="connectivity"
                      value={productForm.connectivity}
                      onChange={handleProductFormChange}
                      placeholder="WiFi, 5G, Bluetooth..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Công nghệ âm thanh
                    </label>
                    <input
                      type="text"
                      name="audio_technical"
                      value={productForm.audio_technical}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phong cách
                    </label>
                    <input
                      type="text"
                      name="style"
                      value={productForm.style}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thời gian pin (giờ)
                    </label>
                    <input
                      type="number"
                      name="time_battery"
                      value={productForm.time_battery}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Độ trễ (ms)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="delay"
                      value={productForm.delay}
                      onChange={handleProductFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="support_stylus"
                      checked={productForm.support_stylus}
                      onChange={handleProductFormChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Hỗ trợ bút stylus
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả chi tiết về sản phẩm..."
                  />
                </div>

                {/* Image Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hình ảnh sản phẩm
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="images" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Chọn nhiều ảnh
                          </span>
                          <input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected Images Preview */}
                  {selectedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                      {selectedImages.map((image,index:number) => (
                        <div key={index} className="relative">
                          <img
                            src={image.fileList ? URL.createObjectURL(image.fileList) : ''}
                            alt={image.fileList.name}
                            className="h-24 w-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  {isEditing && (
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <X className="mr-2 h-5 w-5" />
                      Hủy
                    </button>
                  )}
                  <button
                    onClick={handleAddProduct}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm'}
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Danh sách Sản phẩm ({products.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hãng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hình ảnh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.color}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.brand}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Number(product.price || 0).toLocaleString('vi-VN')} VNĐ
                          {Number(product.discount) > 0 && (
                            <span className="ml-2 text-red-500">
                              (-{product.discount}%)
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {product.images?.map((image, index) => (
                              <img
                                key={index}
                                src={image.image ? image.image : ''}
                                alt={`${product.name} ${index + 1}`}
                                className="h-10 w-10 object-cover rounded"
                              />
                            ))}
                            {product.images && product.images.length > 3 && (
                              <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                                +{product.images.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              title="Chỉnh sửa"
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              Sửa
                            </button>
                            <button
                              onClick={() => product.id !== undefined && handleDeleteProduct(product.id)}
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {products.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Chưa có sản phẩm nào được thêm
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Brands Tab */}
        {activeTab === 'brands' && (
          <div className="space-y-8">
            {/* Add Brand Form */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  {isEditingBrand ? 'Chỉnh sửa Hãng' : 'Thêm Hãng Mới'}
                </h2>
                {isEditingBrand && (
                  <p className="text-sm text-blue-600 mt-1">
                    Đang chỉnh sửa hãng: {brandForm.name}
                  </p>
                )}
              </div>
              
              <div className="p-6">
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên hãng *
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      name="name"
                      value={brandForm.name}
                      onChange={handleBrandFormChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên hãng..."
                    />
                    <div className="flex space-x-2">
                      {isEditingBrand && (
                        <button
                          onClick={handleCancelEditBrand}
                          className="flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Hủy
                        </button>
                      )}
                      <button
                        onClick={handleAddBrand}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        {isEditingBrand ? 'Cập nhật' : 'Thêm'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brands List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Danh sách Hãng ({brands.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Hãng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {brand.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-900">
                              {brand.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditBrand(brand)}
                              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              title="Chỉnh sửa"
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              Sửa
                            </button>
                            <button
                              onClick={() => typeof brand.id === 'number' && handleDeleteBrand(brand.id)}
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {brands.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Chưa có hãng nào được thêm
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            {/* Add Category Form */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  {isEditingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục Mới'}
                </h2>
                {isEditingCategory && (
                  <p className="text-sm text-blue-600 mt-1">
                    Đang chỉnh sửa danh mục: {categoryForm.name}
                  </p>
                )}
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên danh mục *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={categoryForm.name}
                      onChange={handleCategoryFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên danh mục..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mô tả danh mục..."
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
                  {isEditingCategory && (
                    <button
                      onClick={handleCancelEditCategory}
                      className="flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <X className="mr-2 h-5 w-5" />
                      Hủy
                    </button>
                  )}
                  <button
                    onClick={handleAddCategory}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    {isEditingCategory ? 'Cập nhật' : 'Thêm'} Danh mục
                  </button>
                </div>
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Danh sách Danh mục ({categories.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên Danh mục
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Grid3X3 className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Không có mô tả
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                              title="Chỉnh sửa"
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              Sửa
                            </button>
                            <button
                              onClick={() => typeof category.id === 'number' && handleDeleteCategory(category.id)}
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {categories.length === 0 && (
                  <div className="text-center py-12">
                    <Grid3X3 className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Chưa có danh mục nào được thêm
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

