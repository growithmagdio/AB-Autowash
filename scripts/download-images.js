import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  {
    name: 'hero-car.webp',
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'studio-interior.webp',
    url: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'hex-ceiling.webp',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'svc-foam-wash.webp',
    url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-detailing.webp',
    url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-ceramic.webp',
    url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-ppf.webp',
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-polish.webp',
    url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-interior.webp',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-headlight.webp',
    url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'svc-wheels.webp',
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&h=900&q=85&fm=webp'
  },
  {
    name: 'before.webp',
    url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'after.webp',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'process-bg.webp',
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&h=1080&q=85&fm=webp'
  },
  {
    name: 'og-image.webp',
    url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&h=630&q=85&fm=webp'
  }
];

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${images.length} images...`);
  for (const img of images) {
    const dest = path.join(targetDir, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await downloadFile(img.url, dest);
      console.log(`✓ Saved ${img.name}`);
    } catch (err) {
      console.error(`✗ Error downloading ${img.name}:`, err.message);
    }
  }
  console.log('All image downloads completed!');
}

run();
