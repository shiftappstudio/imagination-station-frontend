export const prompts = [
  {
    prompt:
      "Generate a serene landscape with a flowing river and a picturesque sunset.",
  },
  {
    prompt:
      "Create an abstract representation of human emotions using vibrant colors and dynamic shapes.",
  },
  {
    prompt:
      "Design a futuristic cityscape with towering skyscrapers and flying cars.",
  },
  {
    prompt:
      "Generate a mystical forest with bioluminescent plants and mythical creatures.",
  },
  {
    prompt:
      "Illustrate a cozy, book-filled library with warm lighting and comfy reading nooks.",
  },
  {
    prompt:
      "Create a whimsical underwater world with colorful fish and intricate coral reefs.",
  },
  {
    prompt:
      "Design a cyberpunk street scene with neon signs and holographic billboards.",
  },
  {
    prompt:
      "Generate an otherworldly alien landscape with strange rock formations and multiple moons.",
  },
  {
    prompt:
      "Illustrate a bustling market in a historical setting, with merchants and customers.",
  },
  {
    prompt:
      "Create a surreal dreamscape with floating islands and surreal creatures.",
  },
  {
    prompt:
      "Design a post-apocalyptic wasteland with decaying buildings and overgrown vegetation.",
  },
  {
    prompt:
      "Generate a calming beach scene with gentle waves and a tranquil sunset.",
  },
  {
    prompt:
      "Illustrate a high-tech laboratory filled with cutting-edge equipment and futuristic gadgets.",
  },
  {
    prompt:
      "Create a fantasy castle on a mountaintop, surrounded by clouds and magical creatures.",
  },
  {
    prompt:
      "Design a retro 80s-inspired arcade with colorful arcades and nostalgic characters.",
  },
  {
    prompt:
      "Generate a space station orbiting a distant planet with advanced technology and astronauts.",
  },
  {
    prompt:
      "Illustrate a wild west town with dusty streets and rugged cowboys.",
  },
  {
    prompt:
      "Create a lush, overgrown jungle with exotic animals and hidden ruins.",
  },
  {
    prompt:
      "Design a cozy winter cabin in the woods with a crackling fireplace and snowfall.",
  },
  {
    prompt:
      "Generate a futuristic sports arena with flying vehicles and holographic displays.",
  },
];
export function getRandomPrompt() {
  var randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex].prompt;
}
