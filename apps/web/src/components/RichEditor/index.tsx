'use client';

import { mergeTailwindCss } from '@fe-cookie/resume-generator-shared';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
  useEditor,
  EditorContent,
  EditorContentProps,
  Editor,
} from '@tiptap/react';
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

interface RichInputProps
  extends Omit<
    EditorContentProps,
    'ref' | 'editor' | 'content' | 'value' | 'onChange' | 'className'
  > {
  content?: string;
  onChange?: (value: string) => void;
  hideToolbar?: boolean;
  className?: string;
  editorClassName?: string;
  footer?: (editor: Editor) => React.ReactNode;
}

import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useCallback } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';

const Toolbar = ({ editor }: { editor: Editor }) => {
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
        {/* <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <TextB />
        </Toggle> */}
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => {
            editor.isActive('bold');
            editor.chain().focus().toggleBold().run();
          }}
          aria-label="bold"
          icon={<TextB />}
        />
      </Tooltip>

      <Tooltip content="Italic">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('italic')}
          aria-label="bold"
          icon={<TextItalic />}
        />
      </Tooltip>

      <Tooltip content="Strikethrough">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Underline">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('underline')}
          aria-label="bold"
          icon={<TextAUnderline />}
        />
      </Tooltip>

      <Tooltip content="Highlight">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('highlight')}
          aria-label="bold"
          icon={<HighlighterCircle />}
        />
      </Tooltip>

      <Tooltip content="Hyperlink">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={setLink}
          aria-label="bold"
          icon={<LinkSimple />}
        />
      </Tooltip>

      <Tooltip content="Inline Code">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('code')}
          aria-label="bold"
          icon={<Code />}
        />
      </Tooltip>

      <Tooltip content="Code Block">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('codeBlock')}
          aria-label="bold"
          icon={<CodeBlock />}
        />
      </Tooltip>

      <Tooltip content="Heading 1">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('heading', { level: 1 })}
          aria-label="bold"
          icon={<TextHOne />}
        />
      </Tooltip>

      <Tooltip content="Heading 2">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('heading', { level: 2 })}
          aria-label="bold"
          icon={<TextHTwo />}
        />
      </Tooltip>

      <Tooltip content="Heading 3">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('heading', { level: 3 })}
          aria-label="bold"
          icon={<TextHThree />}
        />
      </Tooltip>

      <Tooltip content="Paragraph">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive('paragraph')}
          aria-label="bold"
          icon={<Paragraph />}
        />
      </Tooltip>

      <Tooltip content="Align Left">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => editor.isActive({ textAlign: 'left' })}
          aria-label="bold"
          icon={<TextAlignLeft />}
        />
      </Tooltip>
      {/* 
      <Tooltip content="Align Center">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'center' })}
          disabled={!editor.can().chain().focus().setTextAlign('center').run()}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('center').run()
          }
        >
          <TextAlignCenter />
        </Toggle>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Align Right">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'right' })}
          disabled={!editor.can().chain().focus().setTextAlign('right').run()}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('right').run()
          }
        >
          <TextAlignRight />
        </Toggle>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Tooltip content="Align Justify">
        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: 'justify' })}
          disabled={!editor.can().chain().focus().setTextAlign('justify').run()}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign('justify').run()
          }
        >
          <TextAlignJustify />
        </Toggle>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Bullet List">
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <ListBullets />
        </Toggle>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Numbered List">
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListNumbers />
        </Toggle>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip>

      <Tooltip content="Outdent">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          disabled={
            !editor.can().chain().focus().liftListItem('listItem').run()
          }
        >
          <TextOutdent />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Tooltip content="Indent">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          disabled={
            !editor.can().chain().focus().sinkListItem('listItem').run()
          }
        >
          <TextIndent />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Popover>
        <Tooltip content="Insert Image">
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost" className="px-2">
              <ImageIcon />
            </Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent className="w-80">
          <InsertImageForm
            onInsert={(props) => editor.chain().focus().setImage(props).run()}
          />
        </PopoverContent>
      </Popover> */}

      {/* <Tooltip content="Insert Break Line">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          disabled={!editor.can().chain().focus().setHardBreak().run()}
        >
          <KeyReturn />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Tooltip content="Insert Horizontal Rule">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!editor.can().chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Tooltip content="Undo">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <ArrowCounterClockwise />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}

      {/* <Tooltip content="Redo">
        <Button
          size="sm"
          variant="ghost"
          className="px-2"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <ArrowClockwise />
        </Button>
        <IconButton
          onClick={() => editor.isActive('strike')}
          aria-label="bold"
          icon={<TextStrikethrough />}
        />
      </Tooltip> */}
    </div>
  );
};

const RickEditor = forwardRef<Editor, RichInputProps>(
  ({ editorClassName, className, content, footer, onChange, ...rest }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Image,
        Underline,
        Highlight,
        Link.extend({
          inclusive: false,
          addKeyboardShortcuts: () => ({
            'Mod-k': () => setLink(),
          }),
        }).configure({ openOnClick: false }),
        TextAlign.configure({
          types: ['heading'],
        }),
      ],
      editorProps: {
        attributes: {
          class: mergeTailwindCss(
            'prose prose-sm prose-zinc max-h-[200px] max-w-none overflow-y-scroll dark:prose-invert focus:outline-none [&_*]:my-2',
            editorClassName,
          ),
        },
      },
      content,
      parseOptions: { preserveWhitespace: 'full' },
      onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const setLink = useCallback(() => {
      if (!editor) return false;

      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      // cancelled
      if (url === null) return false;

      // empty
      if (url === '') {
        return editor.chain().focus().extendMarkRange('link').unsetLink().run();
      }

      // update link
      return editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }, [editor]);

    if (!editor) return null;

    return (
      <div>
        <Toolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={mergeTailwindCss(
            'grid min-h-[160px] w-full rounded-sm border bg-transparent px-3 py-2 text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);

export default RickEditor;
