const products = [
{
id: 1,
name: "Brown Handbag",
price: 120,
image: "https://media.githubusercontent.com/media/mrlennonsimango-pixel/Product-images/refs/heads/main/485375881_606578475727682_5818465179071814883_n.jpg?token=B6YFZEV75377CN6LBRFBBRLJWP45A"
},
{
id: 2,
name: "Red Handbag",
price: 120,
image: "https://media.githubusercontent.com/media/mrlennonsimango-pixel/Product-images/refs/heads/main/485399579_606578285727701_5983297732878550211_n.jpg?token=B6YFZEXZWWWLYR2IKP65LKLJWP52C"
},
{
id: 3,
name: "Pestal Green Handbag",
price: 120,
image: "https://media.githubusercontent.com/media/mrlennonsimango-pixel/Product-images/refs/heads/main/485694090_606577309061132_14134608154474508_n.jpg?token=B6YFZEREWTTR3CXR27XTVPLJWP55Y"
},
{
id: 4,
name: "Black Handbag",
price: 120,
image: "https://media.githubusercontent.com/media/mrlennonsimango-pixel/Product-images/refs/heads/main/485877987_606576839061179_4148921275021310770_n.jpg?token=B6YFZEUP2MA33ORWOJJ5YSDJWP6DY"
},
{
id: 5,
name: "White Handbag",
price: 120,
image: "https://media.githubusercontent.com/media/mrlennonsimango-pixel/Product-images/refs/heads/main/485981364_606574485728081_623662241798890125_n.jpg?token=B6YFZEWX5MRIWLZH3A6T3KTJWP6I4"
}
];

const container = document.getElementById("products");

products.forEach(product => {
const productBox = document.createElement("div");
productBox.classList.add("product");

productBox.innerHTML =   <img src="${product.image}" alt="${product.name}" />   <h3>${product.name}</h3>   <p>R${product.price}</p>   <button>Add to Cart</button>  ;

container.appendChild(productBox);
});
