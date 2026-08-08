import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = '/Users/minzhenfa/Downloads/万域第8版修改建议_Numbers兼容版.xlsx';
const outputDir = '/Users/minzhenfa/sourceCode/wan-workspace/.codex-tmp/review-v8/rendered';
await fs.mkdir(outputDir, { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
const sheets = await workbook.inspect({ kind: 'sheet', include: 'id,name', maxChars: 12000 });
console.log('SHEETS');
console.log(sheets.ndjson);
const summary = await workbook.inspect({ kind: 'workbook,sheet,table,drawing', maxChars: 30000, tableMaxRows: 100, tableMaxCols: 20, tableMaxCellChars: 500 });
console.log('SUMMARY');
console.log(summary.ndjson);
const sheetLines = sheets.ndjson.split('\n').filter(Boolean).map((line) => JSON.parse(line));
for (const item of sheetLines) {
  const name = item.name ?? item.sheet?.name;
  if (!name) continue;
  const region = await workbook.inspect({ kind: 'region', sheetId: name, range: 'A1:Z200', maxChars: 50000, tableMaxRows: 200, tableMaxCols: 26, tableMaxCellChars: 1000 });
  console.log(`REGION ${name}`);
  console.log(region.ndjson);
  const image = await workbook.render({ sheetName: name, autoCrop: 'all', scale: 1, format: 'png' });
  await fs.writeFile(`${outputDir}/${name.replaceAll('/', '_')}.png`, new Uint8Array(await image.arrayBuffer()));
}
