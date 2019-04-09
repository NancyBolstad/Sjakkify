import React from 'react';

const EachOption=({item})=>(
    <option value={item.rating}>{item.name}</option>
)

export default EachOption;