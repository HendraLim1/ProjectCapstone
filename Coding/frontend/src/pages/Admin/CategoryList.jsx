import { useState } from 'react';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import AdminMenu from './AdminMenu';
const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Category name is required');
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName('');
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Creating category failed, try again.');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error('Category name is required');
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName('');
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Updating category failed, try again.');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Category deletion failed. Try again.');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.message}</Message>;

  return (
    <div className="ml-14 md:ml-20 lg:ml-24 xl:ml-28 mr-8 flex justify-center">
      <AdminMenu />
      <div className="w-full max-w-[60%]">
        <h1 className="text-3xl font-bold my-6 text-center">Categories</h1>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl text-white font-semibold mb-4 pl-3">Add New Category</h2>
          <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-white font-semibold mb-4 pl-3">Existing Categories</h2>
          {categories?.length === 0 ? (
            <Message variant="info">No categories found</Message>
          ) : (
            <div className="flex flex-wrap justify-left">
              {categories?.map((category) => (
                <div key={category._id}>
                  <button
                    className="bg-pink-500 text-white pt-1 pb-2 px-4 rounded-lg m-3 hover:bg-white hover:text-pink-500 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-colors"
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdateCategory}
          buttonText="Update"
          handleDelete={handleDeleteCategory}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;
