import {
  IconButton,
  Popover,
  Tooltip,
  PopoverTrigger,
  PopoverContent,
  Portal,
  Box,
} from '@chakra-ui/react';
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
import { FC, forwardRef, useCallback, useEffect, useRef } from 'react';
import ImageForm from '@/components/RichEditor/ImageForm';

const Toolbar = forwardRef<any, { editor: Editor }>(({ editor }, ref) => {
  const popoverContentRef = useRef<HTMLElement>(null);
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
      <Tooltip label="Bold">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="bold"
          icon={<TextB />}
        />
      </Tooltip>

      <Tooltip label="Italic">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          icon={<TextItalic />}
        />
      </Tooltip>

      <Tooltip label="Strikethrough">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strike"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip label="Underline">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
          icon={<TextAUnderline />}
        />
      </Tooltip>

      <Tooltip label="Highlight">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          aria-label="Highlight"
          icon={<HighlighterCircle />}
        />
      </Tooltip>

      <Tooltip label="Hyperlink">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={setLink}
          aria-label="Hyperlink"
          icon={<LinkSimple />}
        />
      </Tooltip>

      <Tooltip label="Inline Code">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
          aria-label="Code"
          icon={<Code />}
        />
      </Tooltip>

      <Tooltip label="Code Block">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Codeblock"
          icon={<CodeBlock />}
        />
      </Tooltip>

      <Tooltip label="Heading 1">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Heading 1"
          icon={<TextHOne />}
        />
      </Tooltip>

      <Tooltip label="Heading 2">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
          icon={<TextHTwo />}
        />
      </Tooltip>

      <Tooltip label="Heading 3">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
          icon={<TextHThree />}
        />
      </Tooltip>

      <Tooltip label="Paragraph">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
          icon={<Paragraph />}
        />
      </Tooltip>

      <Tooltip label="Align Left">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          aria-label="Aligh Left"
          icon={<TextAlignLeft />}
        />
      </Tooltip>

      <Tooltip label="Align Center">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() =>
            editor.can().chain().focus().setTextAlign('center').run()
          }
          aria-label="bold"
          icon={<TextAlignCenter />}
        />
      </Tooltip>

      <Tooltip label="Align Right">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          aria-label="Aligh Left"
          icon={<TextAlignLeft />}
        />
      </Tooltip>

      <Tooltip label="Align Justify">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          aria-label="Aligh Left"
          icon={<TextAlignJustify />}
        />
      </Tooltip>

      <Tooltip label="Bullet List">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="ListBullets"
          icon={<ListBullets />}
        />
      </Tooltip>

      <Tooltip label="Numbered List">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered List"
          icon={<ListNumbers />}
        />
      </Tooltip>

      <Tooltip label="Outdent">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          aria-label="Outdent"
          icon={<TextOutdent />}
        />
      </Tooltip>

      <Tooltip label="Indent">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          aria-label="TextIndent"
          icon={<TextIndent />}
        />
      </Tooltip>

      <Popover
        onOpen={() => {
          // FixBug: ImageForm covered by previous modal
          if (popoverContentRef.current?.parentElement) {
            popoverContentRef.current?.parentElement.classList.add('!z-[1999]');
          }
        }}
      >
        <Tooltip label="Insert Image">
          <Box>
            <PopoverTrigger>
              <IconButton
                size="sm"
                aria-label="Image Icon"
                variant="ghost"
                icon={<ImageIcon />}
              ></IconButton>
            </PopoverTrigger>
          </Box>
        </Tooltip>

        <Portal appendToParentPortal={false}>
          <PopoverContent className="p-6" ref={popoverContentRef}>
            <ImageForm
              onInsert={(props) => editor.chain().focus().setImage(props).run()}
            />
          </PopoverContent>
        </Portal>
      </Popover>

      <Tooltip label="Insert Break Line">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          aria-label="nsert Break Line"
          icon={<KeyReturn />}
        />
      </Tooltip>

      <Tooltip label="Insert Horizontal Rule">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Insert Horizontal Rule"
          icon={<Minus />}
        />
      </Tooltip>

      <Tooltip label="Undo">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
          icon={<ArrowCounterClockwise />}
        />
      </Tooltip>

      <Tooltip label="Redo">
        <IconButton
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
