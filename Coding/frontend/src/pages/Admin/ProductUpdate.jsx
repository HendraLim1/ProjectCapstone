import { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import Button from '../../components/Button';

const AdminProductUpdate = () => {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (productData) {
      setName(productData.name || '');
      setDescription(productData.description || '');
      setPrice(productData.price?.toString() || '');
      setCategory(productData.category?._id || '');
      setQuantity(productData.quantity?.toString() || '');
      setBrand(productData.brand || '');
      setStock(productData.countInStock?.toString() || '');
      setImagePreview(productData.image || '');
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!name || !description || !brand || !price || !quantity || !category) {
        toast.error('All fields are required');
        return;
      }

      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('brand', brand);
      formData.append('countInStock', stock || '0');

      console.log('Submitting form data:', {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        stock,
        hasImage: !!image,
      });

      const result = await updateProduct({ productId: id, data: formData });

      if (result.error) {
        console.error('Update error:', result.error);
        toast.error(result.error.data?.message || 'Update failed');
      } else {
        toast.success('Product successfully updated');
        navigate('/admin/allproductslist');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Product update failed. Try again.');
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm('Are you sure you want to delete this product?');
      if (!answer) return;

      if (!id) {
        toast.error('Product ID is missing');
        return;
      }

      const result = await deleteProduct(id);
      if (result.error) {
        toast.error(result.error.data?.message || 'Delete failed');
      } else {
        toast.success('Product deleted successfully');
        navigate('/admin/allproductslist');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Delete failed. Try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-[70%]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-full p-3">
          <div className="h-12 text-2xl font-bold p-3">Update Product</div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="text-center mb-4">
              <div className="w-full h-[300px] overflow-hidden rounded-lg">
                <img src={imagePreview} alt="product" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-3 p-3">
            <label className="bg-gray-700 border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? 'hidden' : 'text-white'}
              />
            </label>
          </div>

          {/* Product Details */}
          <div className="p-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  min="1"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name block">Brand</label> <br />
                <select
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  <option value="Bolzzen">Bolzzen</option>
                  <option value="Dragon">Dragon</option>
                  <option value="Dulatron">Dulatron</option>
                  <option value="Inokim">Inokim</option>
                  <option value="Kaabo">Kaabo</option>
                  <option value="Kristall">Kristall</option>
                  <option value="Mercane">Mercane</option>
                  <option value="NCM">NCM</option>
                  <option value="Segway">Segway</option>
                  <option value="The Cullen">The Cullen</option>
                  <option value="Vamos">Vamos</option>
                  <option value="Vsett">Vsett</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="Zero">Zero</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full">
                <label htmlFor="" className="my-5">
                  Description
                </label>
                <textarea
                  type="text"
                  className="p-2 mb-3 w-full h-32 border rounded-lg bg-gray-700 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="number"
                  min="0"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="green" onClick={handleSubmit}>
                Update
              </Button>
              <Button variant="red" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
