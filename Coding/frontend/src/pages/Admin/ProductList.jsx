import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';
import Button from '../../components/Button';

const ProductList = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!category) {
        toast.error('Please select a category');
        return;
      }

      if (!brand) {
        toast.error('Please select a brand');
        return;
      }

      if (!name || !description || !price || !quantity || !stock) {
        toast.error('Please fill in all fields');
        return;
      }

      const productData = new FormData();
      if (image) {
        productData.append('image', image);
      }
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('brand', brand);
      productData.append('countInStock', stock);

      // Debug log
      console.log('Submitting product data:', {
        name,
        description,
        price,
        category,
        quantity,
        brand,
        stock,
        hasImage: !!image,
      });

      const result = await createProduct(productData);

      if (result.error) {
        console.error('Product creation error:', result.error);
        const errorMessage =
          result.error.data?.message || 'Product creation failed. Please try again.';
        toast.error(errorMessage);
      } else {
        console.log('Product created successfully:', result.data);
        toast.success(`${name} is created successfully`);
        navigate('/admin/productlist');
      }
    } catch (error) {
      console.error('Product creation error:', error);
      toast.error('Product creation failed. Please try again.');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }

    console.log('File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setImage(file);
  };

  return (
    <div className="container mx-auto max-w-[70%]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-full p-3">
          <div className="h-12 text-2xl font-bold p-3">Create Product</div>

          {/* Image Upload */}
          {imageUrl && (
            <div className="text-center">
              <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
            </div>
          )}

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
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-700 text-white"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
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

            <Button variant="pink" onClick={handleSubmit} className="mt-5">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
