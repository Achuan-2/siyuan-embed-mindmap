# Fix: Markdown Inline Styles Not Rendering in Paste Button

## Issue
When pasting Markdown using the paste button in the toolbar, bold (**bold**) and italic (*italic*) styles were not being rendered, even though pasting on selected nodes worked correctly.

## Root Cause Analysis

The issue had two parts:

1. **Unused Import**: `Toolbar.vue` was importing the now-removed `applyInlineMarkdownToTree` function, which could cause import errors.

2. **OutlineEdit.vue Using Wrong Function**: The outline edit paste function was using the synchronous `transformMarkdownTo()` instead of `transformMarkdownToWithImages()`, which meant:
   - Inline styles (emphasis, strong) were being processed correctly in the AST
   - BUT Siyuan images were not being converted to base64
   - The function was not async, so it couldn't handle image processing

## Files Fixed

### 1. **Toolbar.vue** (Line 134)
**Before:**
```javascript
import { applyInlineMarkdownToTree } from '@/utils'
import handleClipboardText from '@/utils/handleClipboardText'
```

**After:**
```javascript
import handleClipboardText from '@/utils/handleClipboardText'
```

**Reason**: Removed unused import of deleted function. The `handleClipboardText` already handles inline styles automatically through the refactored `markdownTo.js`.

### 2. **OutlineEdit.vue** (Line 300)
**Before:**
```javascript
const data = markdown.transformMarkdownTo(md)
```

**After:**
```javascript
const data = await markdown.transformMarkdownToWithImages(md)
```

**Reason**: 
- `transformMarkdownToWithImages` is the async version that processes Siyuan images
- Both functions now handle inline styles correctly (after our refactoring)
- The async version ensures all image processing completes before rendering

## How It Works Now

### Paste Flow (Toolbar Button)
1. User clicks "粘贴Markdown" button
2. `onPasteMarkdown()` → `handleClipboardText(md)`
3. `handleClipboardText` → `markdown.transformMarkdownToWithImages(text)`
4. `transformMarkdownToWithImages` → `transformMarkdownTo` + `processSiyuanImages`
5. During `transformMarkdownTo`:
   - `getNodeText` processes the mdast AST
   - Detects `emphasis` nodes → wraps in `<em>`
   - Detects `strong` nodes → wraps in `<strong>`
   - Returns `{ text: htmlString, hasRichText: true/false }`
   - If `hasRichText`, wraps in `<p><span>` for rich text rendering
6. After parsing, `processSiyuanImages` converts image URLs to base64
7. Result is rendered with proper bold/italic styles

### Paste Flow (Outline Edit)
Same flow as above, now using `transformMarkdownToWithImages` instead of the synchronous version.

## Testing

Test with these markdown examples:

```markdown
## **Bold Heading**
- *Italic item*
- ***Bold and italic***
- Mixed **bold** and *italic* text
- Nested **bold with *italic* inside**
```

All should now render correctly in both:
- Toolbar paste button (粘贴Markdown)
- Outline edit paste button (全屏编辑中的粘贴)
- Node-level paste (when pasting on selected nodes)

## Related Changes

This fix completes the refactoring started in the previous commit where we:
1. Moved inline style processing from post-processing to AST parsing
2. Removed `applyInlineMarkdownToTree` from `utils/index.js`
3. Enhanced `getNodeText` to process mdast node types directly
