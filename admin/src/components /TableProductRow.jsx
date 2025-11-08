/* eslint-disable react/prop-types */

import { assets } from '../assets/assets.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import productService from '../api/productService.js';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Spinner from './Spinner.jsx';
import cn from 'classnames';

const TableProductRow = ({ product }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: (productId) => productService.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(`${product.name} deleted`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete ${product.name}?`);
    if (confirmDelete) {
      deleteProduct(product._id);
    }
  };
  return (
    <tr
      className={cn('border-t border-gray-500/20 ', {
        'opacity-50': isPending,
      })}
    >
      <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
        <div className='border border-gray-300 rounded overflow-hidden'>
          <img
            src={product.image}
            alt='Product'
            className='w-16 h-16 object-cover'
          />
        </div>
        <span className='truncate max-sm:hidden w-full'>{product.name}</span>
      </td>
      <td className='px-4 py-3'>{product.category}</td>
      <td className='px-4 py-3 max-sm:hidden'>${product.price}</td>
      <td className='px-4 py-3'>
        <button
          className='cursor-pointer'
          onClick={handleDelete}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <img
              className='w-6 h-6'
              src={assets.deleteIcon}
              alt='Delete'
            />
          )}
        </button>
      </td>
    </tr>
  );
};

export default TableProductRow;
