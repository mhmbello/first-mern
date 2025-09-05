import React from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

export const ListProduct = () => {

  const [allproducts, setAllProducts] = React.useState([]);

    const fetchProducts = async () => {
      await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
    }

    React.useEffect(() => {
      fetchProducts();
    }, []);

    const handleRemoveProduct = async (id) => {
      await fetch('http://localhost:4000/removeproduct', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:id })
      });
      await fetchProducts();
    };

  return (
    <div className='list-product'>
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index) => {
          return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className='listproduct-product-icon'/>
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => handleRemoveProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt={product.name} />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}
