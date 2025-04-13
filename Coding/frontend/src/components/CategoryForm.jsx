const CategoryForm = ({ value, setValue, handleSubmit, buttonText = 'Submit', handleDelete }) => {
  return (
    <div className="space-y-4 mr-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-white mb-1 pl-3">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            className="w-full px-4 py-2 ml-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder:opacity-50"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex justify-start space-x-3 pt-4 ml-3">
          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 pt-1 pb-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
