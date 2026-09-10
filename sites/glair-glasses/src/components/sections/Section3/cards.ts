export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "perceive",
    title: "Perceive",
    description:
      "Built-in cameras scan your surroundings in real time — detecting text, faces, objects, and locations.",
    image: "/assets/Card1Slider.png",
  },
  {
    id: "object-recognition",
    title: "Object Recognition",
    description: "Identifies what you see — products, animals, devices — with smart suggestions.",
    image: "/assets/Card2Slider.png",
  },
  {
    id: "ar-navigation",
    title: "AR Navigation",
    description: "Turn-by-turn directions projected into your field of view. Works indoors and outdoors.",
    image: "/assets/Card3Slider.png",
  },
];
