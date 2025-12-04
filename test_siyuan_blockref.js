// 测试思源块引用解析功能

// 提取正则表达式和转换函数
const siyuanBlockRefRegex = /^\(\(([a-zA-Z0-9-]+)\s+['"](.+?)['"]\)\)$/;

const convertSiyuanBlockRef = (text) => {
  const match = text.match(siyuanBlockRefRegex)
  if (match) {
    return {
      url: `siyuan://blocks/${match[1]}`,
      title: match[2]
    }
  }
  return null
}

// 测试用例
const testCases = [
  // 双括号格式
  "((20231105162707-m34wn1r '文献阅读模板'))",
  '((20231105162707-m34wn1r "文献阅读模板"))',
  
  // 不匹配的格式
  "20231105162707-m34wn1r '文献阅读模板'",
  "(invalid format)",
  "((20231105162707-m34wn1r)",
  "20231105162707-m34wn1r '文献阅读模板'))"
];

console.log('=== 思源块引用解析测试 ===\n');

testCases.forEach((testCase, index) => {
  console.log(`测试 ${index + 1}: ${testCase}`);
  const result = convertSiyuanBlockRef(testCase);
  if (result) {
    console.log(`✅ 匹配成功:`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Title: ${result.title}`);
  } else {
    console.log(`❌ 匹配失败`);
  }
  console.log();
});