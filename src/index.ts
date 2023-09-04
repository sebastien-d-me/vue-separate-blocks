import * as fs from "fs";
import * as path from "path";


export async function separateBlocks(newLineNumbers: number, folderPath: string = "src") {
    const fullPath: string = path.join(process.cwd(), folderPath);

    try {
        const files = await fs.promises.readdir(fullPath);

        await Promise.all(files.map(async (file) => {
            const filePath: string = path.join(fullPath, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                await separateBlocks(newLineNumbers, path.join(folderPath, file));
            } else if (file.endsWith(".vue")) {
                let content: string = await fs.promises.readFile(filePath, "utf-8");
                content = content.replace(/<\/script>\s*<template|<\/template>\s*<style/g, (match) => match.replace(/>\s*</g, `>${"\n".repeat(newLineNumbers + 1)}<`));
                await fs.promises.writeFile(filePath, content, "utf-8");
            }
        }));
    } catch (error) {
        console.error(`An error has occurred : ${error}`);
    }
}
