import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

export const Popular = () => {

  const [popularInWomen, setPopularInWomen] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then(res => res.json())
      .then(data => setPopularInWomen(data));
  }, []);


  return (
    <div className='popular'>
      <h1>Popular In Women</h1>
      <hr />
      <div className="popular-item">
        {popularInWomen.map((item,i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  )
}
