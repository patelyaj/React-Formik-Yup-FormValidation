import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';

import Form from './Form';
import { fetchProducts, removeProduct } from '../../src/features/products/productSlice';
import { useNavigate } from 'react-router-dom';
function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    console.log("p =",products)
    useEffect(()=>{ 

        if(products.length == 0 ){
            const res = dispatch(fetchProducts());
            console.log(" - res from dispatch fetchProducts",res);
        }

    },[dispatch,products.length])

    const handleEdit = (id)=>{
        navigate(`/updateProduct/${id}`);
    }
    const handleAdd =()=>{
        navigate(`/addProduct`)
    }

    return (
        <div>
            <h1>Products Page</h1>
            <button onClick={handleAdd}>Add</button>
                <ul>
                    {products.map((item) => (
                        <li key={item.id}>
                            <img src={item.thumbnail} alt={item.title} height="50" />
                            <p><strong>{item.title}</strong> - ${item.price}</p>
                            
                            <button onClick={()=>handleEdit(item.id)}>Update</button>
                            
                            <button onClick={() => dispatch(removeProduct({ id : item.id }))}>
                                Delete
                            </button>
                            <hr />
                        </li>
                    ))}
                </ul>
            
        </div>
    );
}

export default Products;