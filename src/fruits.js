const fruits = [
  "apple",
  "avocado",
  "banana",
  "kiwi",
  "lemon",
  "orange",
  "pear",
  "strawberry",
  "watermelon",
];

const generateImages = () => {
  return `${fruits[Math.floor(Math.random() * fruits.length)]}.png`;
};

export { generateImages };
