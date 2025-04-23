
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import Logo from '@/components/Logo';

const generateLogoPNG = async (size: number) => {
  // Convertir le logo en SVG
  const logoSVG = ReactDOMServer.renderToStaticMarkup(<Logo />);
  
  // Convertir SVG en PNG de la taille spécifiée
  await sharp(Buffer.from(logoSVG))
    .resize(size, size)
    .png()
    .toFile(path.resolve(`public/icons/icon-${size}.png`));
};

const createIcons = async () => {
  await generateLogoPNG(192);
  await generateLogoPNG(512);
};

createIcons().catch(console.error);
