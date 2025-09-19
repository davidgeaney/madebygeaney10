import localFont from 'next/font/local';

// Configure the local font with all the weights we need
export const ppNeueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/ppneuemontreal-thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ppneuemontreal-book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ppneuemontreal-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ppneuemontreal-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pp-neue-montreal',
  display: 'swap',
});
