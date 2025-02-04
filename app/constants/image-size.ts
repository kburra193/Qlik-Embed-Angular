export const imagesBaseUrl = 'https://image.tmdb.org/t/p/';
export const imageSize = 'original';
export const imagesSize = {
  w92: 'w92',
  w154: 'w154',
  w185: 'w185',
  w342: 'w342',
  w500: 'w500',
  w780: 'w780',
  original: 'original',
};

export const IMAGES_SIZES = {
  small: `${imagesBaseUrl}${imagesSize.w185}`,
  medium: `${imagesBaseUrl}${imagesSize.w342}`,
  large: `${imagesBaseUrl}${imagesSize.original}`,
};
