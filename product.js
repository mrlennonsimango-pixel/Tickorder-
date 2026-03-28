const products = [
  { 
    id: 1,
    name: "Handbag",
    category: "Handbags",
    colors: [
      { name: "Brown", image: "assets/Images/brownhandbag.jpg", price: 120, link: "https://example.com/brown" },
      { name: "Red", image: "assets/Images/redhandbag.jpg", price: 150, link: "https://example.com/red" },
      { name: "Pestal Green", image: "assets/Images/greenhandbag.jpg", price: 130, link: "https://example.com/green" },
      { name: "Black", image: "assets/Images/blackhandbag.jpg", price: 140, link: "https://example.com/black" },
      { name: "White", image: "assets/Images/whitehandbag.jpg", price: 135, link: "https://example.com/white" }
    ],
    weight: 1,
    description: "Stylish and durable handbag."
  },

  {  // <- comma added above to separate objects
    id: 2,
    name: "Gamazine 20L",
    category: "Paints",
    image: "assets/Images/gamazine-20l.jpg",
    price: 399,
    link: "https://example.com/gamazine-20l",
    description: "Perfect for feature walls, ceilings, facades, and residential or commercial projects."
  }
];
