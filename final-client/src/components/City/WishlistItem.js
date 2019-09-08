import React from 'react';
import "../../styles/City.css";

export default function WishlistItem(props) {
  return (
    <div className="wishlistItem">
      <h3>{props.name}</h3>
      <h3>{props.address}</h3>
    </div>
  )
}

