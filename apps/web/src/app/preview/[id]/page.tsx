'use client';

import { useResumeStore } from '@/store/resume';
import { PAGE_SIZE_MAP, POST_MESSAGES } from 'shared';
import { useCallback, useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useToast,
} from 'ui';
import {
  FilePdf,
  HourglassMedium,
  HouseSimple,
  List,
} from '@phosphor-icons/react';
import { usePrintResume } from '@/apis/resume/print';
import Link from 'next/link';

const Page = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const resume = useResumeStore((state) => state.resume);
  const { loading, printResume } = usePrintResume();
  const { toast } = useToast();

  const onPDfExport = async () => {
    toast({
      title: 'Generating PDF file, please wait...',
    });
    const { url } = await printResume(resume);
    const win = window.open(url, '_blank');
    win && win.focus();
  };

  const updateResumeInIFrame = useCallback(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;
    const message = {
      type: POST_MESSAGES.setResume,
      payload: resume.data,
    };
    frameRef.current.contentWindow.postMessage(message, '*');
  }, [frameRef, resume.data]);

  useEffect(() => {
    if (!frameRef.current || !frameRef.current.contentWindow) return;
    frameRef.current.addEventListener('load', updateResumeInIFrame);
    return () =>
      frameRef?.current?.removeEventListener('load', updateResumeInIFrame);
  }, [frameRef, resume.data, updateResumeInIFrame]);

  // set iframe width and height by receiving message from board application
  useEffect(() => {
    if (!frameRef.current?.contentWindow) return;
    const handleMessage = (event: MessageEvent) => {
      if (!frameRef.current?.contentWindow) return;
      if (event.origin !== window.location.origin) return;

      if (event.data.type === POST_MESSAGES.pageLoaded) {
        frameRef.current.width = event.data.payload.width;
        frameRef.current.height = event.data.payload.height;
        frameRef.current.contentWindow.removeEventListener(
          'message',
          handleMessage,
        );
      }
    };

    frameRef.current.contentWindow.addEventListener('message', handleMessage);

    return () => {
      frameRef.current?.contentWindow?.removeEventListener(
        'message',
        handleMessage,
      );
    };
  }, []);

  return (
    <div>
      <div
        style={{ width: `${PAGE_SIZE_MAP.a4.width}mm` }}
        className="mx-auto mb-16 mt-16 overflow-hidden rounded shadow-xl print:m-0 print:shadow-none"
      >
        <iframe
          ref={frameRef}
          title={resume.id}
          src="/resume-generator-board/preview"
          style={{ width: `${PAGE_SIZE_MAP.a4.width}mm`, overflow: 'hidden' }}
        />
      </div>

      <div className="fixed bottom-8 right-8 print:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <List />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/dashboard/resumes" className="flex">
                <HouseSimple className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={loading} onClick={onPDfExport}>
              <FilePdf className="mr-2 h-4 w-4" />
              {loading ? (
                <HourglassMedium className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                'Download'
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Page;
