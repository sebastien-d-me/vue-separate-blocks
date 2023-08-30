import * as fs from "fs";
import * as path from "path";


export function separateBlocks(newLineNumbers: number) {
    const folderPath = path.join(process.cwd(), "src");

    fs.readdirSync(folderPath).filter(componentFile => componentFile.endsWith(".vue")).forEach(componentFile => {
        const filePath = path.join(folderPath, componentFile);
        let content = fs.readFileSync(filePath, "utf-8");
        const newLine = "\n".repeat(newLineNumbers + 1)

        content = content.replace(/<\/script>\s*<template|<\/template>\s*<style/g, (match) => match.replace(/>\s*</g, `>${newLine}<`));

        if (content !== fs.readFileSync(filePath, "utf-8")) {
            fs.writeFileSync(filePath, content, "utf-8");
        }
    });
}