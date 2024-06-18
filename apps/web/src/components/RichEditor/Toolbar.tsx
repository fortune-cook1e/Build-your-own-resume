import { Button, Tooltip, Popover, PopoverContent, PopoverTrigger } from 'ui';

import { Editor } from '@tiptap/react';
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  Code,
  CodeBlock,
  HighlighterCircle,
  Image as ImageIcon,
  KeyReturn,
  LinkSimple,
  ListBullets,
  ListNumbers,
  Minus,
  Paragraph,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextAUnderline,
  TextB,
  TextHOne,
  TextHThree,
  TextHTwo,
  TextIndent,
  TextItalic,
  TextOutdent,
  TextStrikethrough,
} from '@phosphor-icons/react';
import { forwardRef, useCallback } from 'react';
import ImageForm from '@/components/RichEditor/ImageForm';

const Toolbar = forwardRef<any, { editor: Editor }>(({ editor }, ref) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);
  return (
    <div className="flex flex-wrap gap-0.5 border p-1">
      <Tooltip content="Bold">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="bold"
          icon={<TextB />}
        />
      </Tooltip>

      <Tooltip content="Italic">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          icon={<TextItalic />}
        />
      </Tooltip>

      <Tooltip content="Strikethrough">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strike"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Underline">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
          icon={<TextAUnderline />}
        />
      </Tooltip>

      <Tooltip content="Highlight">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          aria-label="Highlight"
          icon={<HighlighterCircle />}
        />
      </Tooltip>

      <Tooltip content="Hyperlink">
        <Button
          size="sm"
          variant="ghost"
          onClick={setLink}
          aria-label="Hyperlink"
          icon={<LinkSimple />}
        />
      </Tooltip>

      <Tooltip content="Inline Code">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
          aria-label="Code"
          icon={<Code />}
        />
      </Tooltip>

      <Tooltip content="Code Block">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Codeblock"
          icon={<CodeBlock />}
        />
      </Tooltip>

      <Tooltip content="Heading 1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Heading 1"
          icon={<TextHOne />}
        />
      </Tooltip>

      <Tooltip content="Heading 2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
          icon={<TextHTwo />}
        />
      </Tooltip>

      <Tooltip content="Heading 3">
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
          icon={<TextHThree />}
        />
      </Tooltip>

      <Tooltip content="Paragraph">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
          icon={<Paragraph />}
        />
      </Tooltip>

      <Tooltip content="Align Left">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          aria-label="Aligh Left"
          icon={<TextAlignLeft />}
        />
      </Tooltip>

      <Tooltip content="Align Center">
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.can().chain().focus().setTextAlign('center').run()
          }
          aria-label="bold"
          icon={<TextAlignCenter />}
        />
      </Tooltip>

      <Tooltip content="Align Right">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          aria-label="Aligh Right"
          icon={<TextAlignRight />}
        />
      </Tooltip>

      <Tooltip content="Align Justify">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          aria-label="Aligh Left"
          icon={<TextAlignJustify />}
        />
      </Tooltip>

      <Tooltip content="Bullet List">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="ListBullets"
          icon={<ListBullets />}
        />
      </Tooltip>

      <Tooltip content="Numbered List">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered List"
          icon={<ListNumbers />}
        />
      </Tooltip>

      <Tooltip content="Outdent">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          aria-label="Outdent"
          icon={<TextOutdent />}
        />
      </Tooltip>

      <Tooltip content="Indent">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          aria-label="TextIndent"
          icon={<TextIndent />}
        />
      </Tooltip>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            aria-label="Image Icon"
            variant="ghost"
            icon={<ImageIcon />}
          />
        </PopoverTrigger>
        <PopoverContent className="p-6">
          <ImageForm
            onInsert={(props) => editor.chain().focus().setImage(props).run()}
          />
        </PopoverContent>
      </Popover>

      <Tooltip content="Insert Break Line">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          aria-label="nsert Break Line"
          icon={<KeyReturn />}
        />
      </Tooltip>

      <Tooltip content="Insert Horizontal Rule">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Insert Horizontal Rule"
          icon={<Minus />}
        />
      </Tooltip>

      <Tooltip content="Undo">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
          icon={<ArrowCounterClockwise />}
        />
      </Tooltip>

      <Tooltip content="Redo">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
          icon={<ArrowClockwise />}
        />
      </Tooltip>
    </div>
  );
});

export default Toolbar;
