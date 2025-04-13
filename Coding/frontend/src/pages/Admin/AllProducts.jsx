import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAllProductsQuery } from '../../redux/api/productApiSlice';
import AdminMenu from './AdminMenu';

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container mx-auto max-w-[50%] pb-10">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-full p-3">
          <div className="text-2xl font-bold my-8">All Products ({products.length})</div>

          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
              >
                <div className="w-[14.4rem] h-[14rem] overflow-hidden flex-shrink-0">
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL || import.meta.env.VITE_PRODUCTION_API_URL
                    }${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-xl font-semibold text-white">{product?.name}</h5>
                      <p className="text-gray-400 text-xs">
                        {moment(product.createdAt).format('MMMM Do YYYY')}
                      </p>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 mt-8">
                      {product?.description?.substring(0, 160)}...
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-colors"
                    >
                      Update Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p className="text-lg font-semibold text-white">$ {product?.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
