const sharp = require('sharp');
const PDFDocument = require('pdfkit');

// Vercel serverless function handler
module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  try {
    const { image, filename } = req.body || {};
    if (!image) {
      res.statusCode = 400;
      res.end('Missing image payload');
      return;
    }

    // image expected to be a data URL: data:image/png;base64,...
    const matches = /^data:\w+\/\w+;base64,(.+)$/.exec(image);
    if (!matches) {
      res.statusCode = 400;
      res.end('Invalid image data');
      return;
    }

    const imgBuffer = Buffer.from(matches[1], 'base64');

    // Convert to CMYK JPEG using sharp
    const cmykBuffer = await sharp(imgBuffer)
      .jpeg({ quality: 95 })
      .toColorspace('cmyk')
      .toBuffer();

    // Create PDF and embed the CMYK JPEG at full size
    const doc = new PDFDocument({ autoFirstPage: false });

    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      const outName = (filename || 'qr') .replace(/\.png$/i, '.pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${outName}"`);
      res.statusCode = 200;
      res.end(pdfBuffer);
    });

    // Add a page sized to the image pixels
    const imgMeta = await sharp(cmykBuffer).metadata();
    const width = imgMeta.width || 1000;
    const height = imgMeta.height || 1000;

    doc.addPage({ size: [width, height] });
    doc.image(cmykBuffer, 0, 0, { width, height });
    doc.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Conversion failed');
  }
};
