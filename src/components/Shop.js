import React, { useEffect, useState } from 'react'

function Shop() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get');

        const items = await data.json();
        console.log(items);
        setItems(items);
    };

    return(
        <div>
            {items.map(item => (
                <h1>{item.name}</h1>
            ))}
        </div>
    );
}

export default Shop