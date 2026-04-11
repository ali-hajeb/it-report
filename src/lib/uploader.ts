'use server';

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
        throw new Error('No file uploaded');
    }

    // Validate file size (e.g., 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Max 10MB allowed.');
    }

    // Create unique filename to prevent overwrites
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Create directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return {
        success: true,
        fileName,
        fileUrl,
    };
}
