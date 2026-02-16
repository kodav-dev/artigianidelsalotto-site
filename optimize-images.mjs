import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = './src/assets/blog';
const maxWidth = 1200;
const quality = 80;

const files = fs.readdirSync(directory);

for (const file of files) {
    const filePath = path.join(directory, file);
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.png' || ext === '.webp' || ext === '.jpg' || ext === '.jpeg') {
        const name = path.basename(file, ext);
        const outputPath = path.join(directory, `${name}.webp`);
        const tempPath = path.join(directory, `${name}_optimized.webp`);

        console.log(`Optimizing ${file}...`);
        
        try {
            await sharp(filePath)
                .resize({ width: maxWidth, withoutEnlargement: true })
                .webp({ quality })
                .toFile(tempPath);
            
            // Remove original
            fs.unlinkSync(filePath);
            // Rename optimized
            fs.renameSync(tempPath, outputPath);
            
            console.log(`Successfully optimized ${file} -> ${name}.webp`);
        } catch (err) {
            console.error(`Error optimizing ${file}:`, err);
        }
    }
}
