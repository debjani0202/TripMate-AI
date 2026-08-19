import baliImage from "@/assets/images/destinations/bali.avif";
import goaImage from "@/assets/images/destinations/goa.avif";
import japanImage from "@/assets/images/destinations/japan.avif";
import parisImage from "@/assets/images/destinations/paris.avif";
import rajasthanImage from "@/assets/images/destinations/rajasthan.avif";
import singaporeImage from "@/assets/images/destinations/singapore.avif";

export interface Destination {
  location: string;
  country: string;
  image: string;
  alt: string;
}

export const DESTINATIONS: Destination[] = [
  {
    location: "Udaipur",
    country: "Rajasthan, India",
    image: rajasthanImage,
    alt: "Udaipur, Rajasthan, India",
  },
  {
    location: "Kyoto",
    country: "Japan",
    image: japanImage,
    alt: "Kyoto, Japan",
  },
  {
    location: "Baga Beach",
    country: "Goa, India",
    image: goaImage,
    alt: "Baga Beach, Goa, India",
  },
  {
    location: "Bali",
    country: "Indonesia",
    image: baliImage,
    alt: "Bali, Indonesia",
  },
  {
    location: "Paris",
    country: "France",
    image: parisImage,
    alt: "Paris, France",
  },
  {
    location: "Singapore",
    country: "Singapore",
    image: singaporeImage,
    alt: "Singapore",
  },
];

export const HERO_DESTINATIONS = DESTINATIONS;