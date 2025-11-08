import { useState } from 'react';
import { assets } from '../assets/assets';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  CATEGORIES,
  MAX_IMAGE_UPLOAD,
  SIZES,
  TYPES,
} from '../constants/index.js';
import cn from 'classnames';
import { useEffect } from 'react';
import productService from '../api/productService.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components /Spinner.jsx';

const initFormFields = {
  name: '',
  description: '',
  price: '',
  category: 'Men',
  subCategory: 'Topwear',
  bestseller: false,
  rating: 0,
};

const Add = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formFields, setFormFields] = useState({
    ...initFormFields,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => productService.addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added');
      setFormFields({ ...initFormFields });
      setFiles([]);
      setSizes([]);
      navigate('/products');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleFormFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormFields((prevFields) => {
      if (type === 'checkbox') {
        return {
          ...prevFields,
          [name]: checked ? true : false,
        };
      }
      return {
        ...prevFields,
        [name]: value,
      };
    });
  };

  const handleAddSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleAddFile = (file) => {
    setFiles((prevFiles) => [...prevFiles, ...file]);
  };

  const isActiveSize = (size) => sizes.includes(size);

  useEffect(() => {
    if (files.length > MAX_IMAGE_UPLOAD) {
      toast.info(`Limit upload to ${MAX_IMAGE_UPLOAD} images.`);
      setFiles(files.slice(0, MAX_IMAGE_UPLOAD));
    }
  }, [files]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }
    files.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('sizes', JSON.stringify(sizes));

    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full items-start gap-3'
    >
      <div>
        <p className='mb-2'>Product images</p>

        <div className='flex gap-2'>
          <label htmlFor='files'>
            <img
              className='w-20'
              src={assets.uploadArea}
              alt=''
            />
            <input
              onChange={(event) => handleAddFile(event.target.files)}
              type='file'
              multiple
              disabled={files.length >= MAX_IMAGE_UPLOAD}
              id='files'
              hidden
            />
          </label>

          {files.length > 0 && (
            <>
              <div className='flex gap-2'>
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`upload-${index}`}
                    className='w-20 h-20 object-cover'
                  />
                ))}
              </div>
              <button
                className='text-red-500 underline'
                onClick={() => setFiles([])}
                type='button'
              >
                Remove All
              </button>
            </>
          )}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          onChange={handleFormFieldChange}
          value={formFields.name}
          name='name'
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          onChange={handleFormFieldChange}
          name='description'
          value={formFields.description}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select
            name='category'
            onChange={handleFormFieldChange}
            className='w-full px-3 py-2'
            value={formFields.category}
          >
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select
            name='subCategory'
            onChange={handleFormFieldChange}
            className='w-full px-3 py-2'
            value={formFields.subCategory}
          >
            {TYPES.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            onChange={handleFormFieldChange}
            value={formFields.price}
            required
            name='price'
            className='w-full px-3 py-2 sm:w-[120px]'
            type='Number'
            placeholder='25'
          />
        </div>
      </div>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        {SIZES.map((size) => (
          <button
            onClick={() => handleAddSize(size)}
            type='button'
            className={cn('px-1 cursor-pointer shadow-md', {
              'bg-black text-white': isActiveSize(size),
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          onChange={handleFormFieldChange}
          value={formFields.bestseller}
          type='checkbox'
          name='bestseller'
          id='bestseller'
        />
        <label
          className='cursor-pointer'
          htmlFor='bestseller'
        >
          Bestseller
        </label>
      </div>

      <button
        type='submit'
        disabled={isPending}
        className='w-28 py-4 mt-4 bg-black text-white'
      >
        {isPending ? <Spinner /> : 'Submit'}
      </button>
    </form>
  );
};

export default Add;
