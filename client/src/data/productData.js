const products = [
    {
        id: 1,
        title: "Chese Classic Burger",
        price: "$6.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/1_4aed6ba2-d3cd-492f-94e1-1bd7e81f9ae1_grande.jpg?v=1592971407"

    },
    {
        id: 2,
        title: "Chese Classic Burger Boosted Sale",
        price: "$6.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/2_grande.jpg?v=1592981075"

    },
    {
        id: 3,
        title: "Double Classic Burger",
        price: "$10.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/5_ce86bc89-6fc4-4053-89e2-687c50d693fa_grande.jpg?v=1592973729"

    },
    {
        id: 4,
        title: "French Fries",
        price: "$15.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/7_grande.jpg"

    },
    {
        id: 5,
        title: "French Fries",
        price: "$15.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/6_6bfb9c34-19e0-447e-9205-24ee20def0ec_grande.jpg?v=1592973853"

    },
    {
        id: 6,
        title: "French Fries Video",
        price: "$12.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/22_grande.jpg"

    },
    {
        id: 7,
        title: "Fried Chicken",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/23_grande.jpg"

    },
    {
        id: 8,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/17_6a5686ee-1e32-407f-88af-98a1f53b5e1c_grande.jpg"

    },
    {
        id: 9,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/19_grande.jpg"

    },
    {
        id: 10,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/15_grande.jpg"

    },
    {
        id: 11,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/20_grande.jpg"

    },
    {
        id: 12,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/17_grande.jpg?v=1592974597"

    },
    {
        id: 13,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/16_dce5a441-c35a-457a-8f4d-d07a359a2bcf_grande.jpg"

    },
    {
        id: 14,
        title: "The Deli Taco Crunchy",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/11_grande.jpg"

    },
    {
        id: 15,
        title: "The Deli Taco Soft",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/12_f81db2d0-9dca-4b73-8be2-8769e27d98b5_grande.jpg"

    },
    {
        id: 16,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/22_grande.jpg"

    },
    {
        id: 17,
        title: "French Fries",
        price: "$15.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/7_grande.jpg"

    },
    {
        id: 18,
        title: "French Fries",
        price: "$15.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/6_6bfb9c34-19e0-447e-9205-24ee20def0ec_grande.jpg?v=1592973853"

    },
    {
        id: 19,
        title: "French Fries Video",
        price: "$12.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/22_grande.jpg"

    },
    {
        id: 20,
        title: "Fried Chicken",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/23_grande.jpg"

    },
    {
        id: 21,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/17_6a5686ee-1e32-407f-88af-98a1f53b5e1c_grande.jpg"

    },
    {
        id: 22,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/19_grande.jpg"

    },
    {
        id: 23,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/15_grande.jpg"

    },
    {
        id: 24,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/20_grande.jpg"

    },
    {
        id: 25,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/17_grande.jpg?v=1592974597"

    },
    {
        id: 26,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/16_dce5a441-c35a-457a-8f4d-d07a359a2bcf_grande.jpg"

    },
    {
        id: 27,
        title: "The Deli Taco Crunchy",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/11_grande.jpg"

    },
    {
        id: 28,
        title: "The Deli Taco Soft",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/12_f81db2d0-9dca-4b73-8be2-8769e27d98b5_grande.jpg"

    },
    {
        id: 29,
        title: "Pizza",
        price: "$19.00",
        src: "https://cdn.shopify.com/s/files/1/0414/0069/6999/products/22_grande.jpg"

    },
    
]

export {products}