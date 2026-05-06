/**
 * 作品管理脚本
 * 用法: node scripts/manage-artworks.js <command> [options]
 *
 * 命令:
 *   list                         列出所有作品
 *   add <title>                  新增作品（交互式填参）
 *   remove <id>                  删除指定作品
 *   show <id>                    查看作品详情
 *   stats                        数据统计
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_FILE = path.resolve(__dirname, '../data/artworks.json');

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✓ 数据已保存到', DATA_FILE);
}

function getNextId(artworks) {
  const maxId = artworks.reduce((m, a) => Math.max(m, parseInt(a.id) || 0), 0);
  return String(maxId + 1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function cmdList() {
  const { artworks } = readData();
  console.log(`\n共 ${artworks.length} 件作品:\n`);
  artworks.forEach((a) => {
    console.log(`  [${a.id}] ${a.title}`);
    console.log(`       模型: ${a.parameters.model} | 风格: ${a.style.join(', ')}`);
    console.log(`       图片: ${a.imageUrl}`);
    console.log();
  });
}

async function cmdShow(id) {
  const { artworks } = readData();
  const artwork = artworks.find((a) => a.id === id);
  if (!artwork) {
    console.log(`✗ 未找到 ID 为 "${id}" 的作品`);
    return;
  }
  console.log(JSON.stringify(artwork, null, 2));
}

async function cmdRemove(id) {
  const data = readData();
  const idx = data.artworks.findIndex((a) => a.id === id);
  if (idx === -1) {
    console.log(`✗ 未找到 ID 为 "${id}" 的作品`);
    return;
  }
  const removed = data.artworks[idx];
  data.artworks.splice(idx, 1);
  writeData(data);
  console.log(`✓ 已删除作品 [${removed.id}] ${removed.title}`);
}

async function cmdAdd(title) {
  console.log(`\n新增作品: ${title}\n`);

  const slug = title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const description = await ask('描述: ');
  const model = await ask('模型 (默认 SDXL 1.0): ') || 'SDXL 1.0';
  const sampler = await ask('采样器 (默认 DPM++ 2M Karras): ') || 'DPM++ 2M Karras';
  const steps = parseInt(await ask('步数 (默认 30): ') || '30', 10);
  const cfgScale = parseFloat(await ask('CFG Scale (默认 7): ') || '7');
  const seed = parseInt(await ask('种子 (随机): ') || String(Math.floor(Math.random() * 1000000000)), 10);
  const width = parseInt(await ask('宽度 (默认 1024): ') || '1024', 10);
  const height = parseInt(await ask('高度 (默认 1024): ') || '1024', 10);
  const positivePrompt = await ask('正向提示词: ');
  const negativePrompt = await ask('反向提示词 (可选): ');
  const styles = (await ask('风格 (逗号分隔, 如 科幻,赛博朋克): ')).split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  const subjects = (await ask('题材 (逗号分隔, 如 风景,建筑): ')).split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  const tags = (await ask('标签 (逗号分隔): ')).split(/[,，]/).map((s) => s.trim()).filter(Boolean);

  const data = readData();
  const newArtwork = {
    id: getNextId(data.artworks),
    title,
    description: description || undefined,
    imageUrl: `/images/artworks/${slug}.jpg`,
    parameters: {
      model,
      sampler,
      steps,
      cfgScale,
      seed,
      width,
      height,
      positivePrompt,
      ...(negativePrompt ? { negativePrompt } : {}),
    },
    style: styles.length ? styles : ['未分类'],
    subject: subjects.length ? subjects : ['未分类'],
    tags: tags.length ? tags : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.artworks.push(newArtwork);
  writeData(data);

  console.log(`\n✓ 已添加作品 [${newArtwork.id}] ${newArtwork.title}`);
  console.log(`  图片路径: ${newArtwork.imageUrl}`);
  console.log(`  提示: 请将对应的图片文件放入 public/images/artworks/ 目录`);
}

async function cmdStats() {
  const { artworks } = readData();

  const modelCount = {};
  const styleCount = {};
  artworks.forEach((a) => {
    modelCount[a.parameters.model] = (modelCount[a.parameters.model] || 0) + 1;
    a.style.forEach((s) => {
      styleCount[s] = (styleCount[s] || 0) + 1;
    });
  });

  console.log(`\n📊 数据统计`);
  console.log(`  作品总数: ${artworks.length}`);
  console.log(`\n  模型分布:`);
  Object.entries(modelCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([model, count]) => {
      console.log(`    ${model}: ${count} 件`);
    });
  console.log(`\n  风格分布:`);
  Object.entries(styleCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([style, count]) => {
      console.log(`    ${style}: ${count} 件`);
    });
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'list':
      await cmdList();
      break;
    case 'add':
      await cmdAdd(args.slice(1).join(' ') || (await ask('作品标题: ')));
      break;
    case 'remove':
      await cmdRemove(args[1]);
      break;
    case 'show':
      await cmdShow(args[1]);
      break;
    case 'stats':
      await cmdStats();
      break;
    default:
      console.log(`
用法: node scripts/manage-artworks.js <command> [options]

命令:
  list               列出所有作品
  add <标题>         新增作品（交互式填写参数）
  remove <id>        删除指定 ID 的作品
  show <id>          查看作品详情
  stats              查看数据统计
`);
  }

  rl.close();
}

main();
