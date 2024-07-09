'use client';

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
import Toolbar from '@/components/RichEditor/Toolbar';
import { cn } from 'ui';

const RichEditor = forwardRef<Editor, RichInputProps>(
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
          types: ['heading', 'paragraph'],
        }),
      ],
      editorProps: {
        attributes: {
          class: cn(
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
          className={cn(
            'grid min-h-[160px] w-full rounded-sm border bg-transparent px-3 py-2 text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);

export default RichEditor;
