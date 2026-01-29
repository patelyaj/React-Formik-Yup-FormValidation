import { useFormik } from 'formik';
import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { addProduct, updateProduct } from '../../src/features/products/productSlice';
import { nanoid } from '@reduxjs/toolkit';

function Form() {
    const {id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // all products fetched so that we can fill previous value while editing mode
    const allProducts = useSelector((state) => state.product.products);

    const productToEdit = id ? allProducts.find(p => p.id == id) : null;


    const emptyforadd = {
            title: '',
            brand: '',
            category: '',
            description: '',
            price: 0,
            discountPercentage: 0,
            stock: 0,
            minimumOrderQuantity: 1,
            availabilityStatus: 'In Stock',
            sku: '',
            weight: 0,
            
            dimensions: {
                width: 0,
                height: 0,
                depth: 0
            },
            warrantyInformation: '',
            shippingInformation: '',
            returnPolicy: '',
            thumbnail: ''
        }

    const formik = useFormik({
        // match the names in your input fields
        initialValues: productToEdit || emptyforadd,

        enableReinitialize: true,

        // Validate inputs 
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            brand: Yup.string().required(),
            category: Yup.string().required(),
            price: Yup.number().min(0, 'Price must be positive').required(),
            discountPercentage: Yup.number().min(0).max(100),
            stock: Yup.number().min(0).required(),
            minimumOrderQuantity: Yup.number().min(1),
            sku: Yup.string().required('SKU is required'),
            weight: Yup.number().positive(),
            dimensions: Yup.object({
                width: Yup.number().positive(),
                height: Yup.number().positive(),
                depth: Yup.number().positive(),
            }),
            thumbnail: Yup.string().url('Must be a valid URL').required()
        }),
        
        onSubmit: (values) => {

            if (id) {
                // edit
                console.log("Updating Product:", values);
               
                dispatch(updateProduct({ id: id, ...values })); 
            } else {
                // add
                console.log("Adding New Product:", values);

                const newprod = {id:nanoid(),...values};
                
                dispatch(addProduct(newprod)); 
            }
            
            navigate('/products');

        }
    });


    // // imp notes 
    // name = ''
    // onChange={formik.handleChange}   // Updates the value when you type
    // onBlur={formik.handleBlur}       // Tracks when you leave the field (for validation)
    // value={formik.values.title}      // Sets the current value from state

    // one line solution 
    // {...formik.getFieldProps('title')} 

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h3>Basic Details</h3>
                <div>
                    <label>Title: </label>
                    <input type="text" {...formik.getFieldProps('title')} />
                    {formik.submitCount > 0 && formik.errors.title ? (
                        <div style={{ color: 'red' }}>{formik.errors.title}</div>
                    ) : null}

                    {/* just one exmaple if i want  */}
                    {/* Example error message for Title */}
                    {/* {formik.touched.title && formik.errors.title ? (
                        <div style={{ color: 'red' }}>{formik.errors.title}</div>
                    ) : null} */}
                </div>
                <div>
                    <label>Brand: </label>
                    <input type="text" {...formik.getFieldProps('brand')} />
                    {formik.submitCount > 0 && formik.errors.brand ? (
                        <div style={{ color: 'red' }}>{formik.errors.brand}</div>
                    ) : null}
                </div>

                <div>
                    <label>Category: </label>
                    <input type="text" {...formik.getFieldProps('category')} />
                    {formik.submitCount > 0 && formik.errors.category ? (
                        <div style={{ color: 'red' }}>{formik.errors.category}</div>
                    ) : null}
                </div>
                <div>
                    <label>Description: </label>
                    <textarea rows="4" cols="50" {...formik.getFieldProps('description')} />
                    {formik.submitCount > 0 && formik.errors.description ? (
                        <div style={{ color: 'red' }}>{formik.errors.description}</div>
                    ) : null}
                </div>

                {/* --- PRICING & STOCK --- */}
                <h3>Inventory & Pricing</h3>

                <div>
                    <label>Price ($): </label>
                    <input type="number" {...formik.getFieldProps('price')} />
                    {formik.submitCount > 0 && formik.errors.price ? (
                        <div style={{ color: 'red' }}>{formik.errors.price}</div>
                    ) : null}
                </div>

                <div>
                    <label>Discount (%): </label>
                    <input type="number" {...formik.getFieldProps('discountPercentage')} />
                    {formik.submitCount > 0 && formik.errors.discountPercentage ? (
                        <div style={{ color: 'red' }}>{formik.errors.discountPercentage}</div>
                    ) : null}
                </div>

                <div>
                    <label>Stock Quantity: </label>
                    <input type="number" {...formik.getFieldProps('stock')} />
                    {formik.submitCount > 0 && formik.errors.stock ? (
                        <div style={{ color: 'red' }}>{formik.errors.stock}</div>
                    ) : null}
                </div>

                <div>
                    <label>Min Order Qty: </label>
                    <input type="number" {...formik.getFieldProps('minimumOrderQuantity')} />
                    {formik.submitCount > 0 && formik.errors.minimumOrderQuantity ? (
                        <div style={{ color: 'red' }}>{formik.errors.minimumOrderQuantity}</div>
                    ) : null}
                </div>

                <div>
                    <label>Availability Status: </label>
                    <select {...formik.getFieldProps('availabilityStatus')}>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                {/* --- LOGISTICS --- */}
                <h3>Logistics</h3>
                <div>
                    <label>SKU: </label>
                    <input type="text" {...formik.getFieldProps('sku')} />
                    {formik.submitCount > 0 && formik.errors.sku ? (
                        <div style={{ color: 'red' }}>{formik.errors.sku}</div>
                    ) : null}
                </div>
                <div>
                    <label>Weight (units): </label>
                    <input type="number" {...formik.getFieldProps('weight')} />
                    {formik.submitCount > 0 && formik.errors.weight ? (
                        <div style={{ color: 'red' }}>{formik.errors.weight}</div>
                    ) : null}
                </div>

                <h4>Dimensions</h4>
                <div>
                    <label>Width: </label>
                    <input type="number" {...formik.getFieldProps('dimensions.width')} />
                    {formik.submitCount > 0 && formik.errors.dimensions?.width ? (
                        <div style={{ color: 'red' }}>{formik.errors.dimensions.width}</div>
                    ) : null}
                </div>
                <div>
                    <label>Height: </label>
                    <input type="number" {...formik.getFieldProps('dimensions.height')} />
                    {formik.submitCount > 0 && formik.errors.dimensions?.height ? (
                        <div style={{ color: 'red' }}>{formik.errors.dimensions.height}</div>
                    ) : null}
                </div>
                <div>
                    <label>Depth: </label>
                    <input type="number" {...formik.getFieldProps('dimensions.depth')} />
                    {formik.submitCount > 0 && formik.errors.dimensions?.depth ? (
                        <div style={{ color: 'red' }}>{formik.errors.dimensions.depth}</div>
                    ) : null}
                </div>

                {/* --- POLICIES --- */}
                <h3>Policies</h3>
                <div>
                    <label>Warranty Info: </label>
                    <input type="text" {...formik.getFieldProps('warrantyInformation')} />
                </div>
                <div>
                    <label>Shipping Info: </label>
                    <input type="text" {...formik.getFieldProps('shippingInformation')} />
                </div>
                <div>
                    <label>Return Policy: </label>
                    <input type="text" {...formik.getFieldProps('returnPolicy')} />
                </div>

                {/* --- IMAGES --- */}
                <h3>Media</h3>
                <div>
                    <label>Thumbnail URL: </label>
                    <input type="text" style={{ width: '300px' }} {...formik.getFieldProps('thumbnail')} />
                    {formik.submitCount > 0 && formik.errors.thumbnail ? (
                        <div style={{ color: 'red' }}>{formik.errors.thumbnail}</div>
                    ) : null}
                </div>
                
                {/* Image Preview */}
                {formik.values.thumbnail && (
                    <div style={{ marginTop: '10px' }}>
                        <img 
                            src={formik.values.thumbnail} 
                            alt="Preview" 
                            height="100" 
                            onError={(e) => e.target.style.display = 'none'} 
                        />
                    </div>
                )}

                <br /><br />
                
                <button type="submit">
                    {
                        id ? 'Save Product' : 'Add Product'
                    }
                    
                    </button>
                
                <button type="button" onClick={() => navigate('/products')} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default Form;