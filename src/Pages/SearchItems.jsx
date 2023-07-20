// import React from 'react';
// import NavbarCom from '../components/navbar';
// import { useParams } from 'react-router-dom';
// import { addToCart } from '../Store/AddCartSlice';
// import { useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { addvalue } from '../Store/CartSlice';

// const SearchItems = () => {
//   const { paramid } = useParams();
//   const dispatch = useDispatch();
//   const [productData, setProductsData] = useState([]);

//   const addCartItem = (id) => {
//     dispatch(addToCart(id));
//   };

//   const opencart = () => {
//     dispatch(addvalue(true));
//   };

//   console.log('product data is:', productData);

//   const GetProducts = async () => {
//     try {
//     //  const response = await fetch(`${process.env.REACT_APP_API_URL}/search?q=${paramid}`);
//     const response=await fetch(`https://dummyjson.com/products/search?q=${paramid}`)
//       const data = await response.json();
//       console.log("datayyyyyyyyyyyyyyyyyyyyyyyyyyy is ",data);

//       setProductsData(data.products);

//       if (data.products.length === 0) {
//         alert('No products found.');
//       }
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     GetProducts();
//   },[]);

//   return (
//     <div>
//       <NavbarCom />

//       <div style={{marginTop:"220px"}}>
//         {/* Render the product data here */}
//         {productData.map((product) => (
//           <div key={product.id}>
//             {/* Display product details here */}
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             {/* Add a button to add the product to the cart */}
//             <button onClick={() => addCartItem(product.id)}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchItems;
