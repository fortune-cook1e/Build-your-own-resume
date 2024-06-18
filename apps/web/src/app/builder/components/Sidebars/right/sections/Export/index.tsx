import { usePrintResume } from '@/apis/resume/print';
import SectionBase from '@/app/builder/components/Sidebars/right/common/SectionBase';
import { useResumeStore } from '@/store/resume';
import { Button } from 'ui';
import { FilePdf } from '@phosphor-icons/react';

const Export = () => {
  const resume = useResumeStore((state) => state.resume);
  const { loading, printResume } = usePrintResume();
  const onPDfExport = async () => {
    const { url } = await printResume(resume);
    const win = window.open(url, '_blank');
    win && win.focus();
  };

  return (
    <SectionBase id="export">
      <div className="flex gap-x-4">
        <Button
          onClick={onPDfExport}
          leftIcon={<FilePdf size={22} />}
          aria-label="pdf"
          loading={loading}
          disabled={loading}
        >
          Download
        </Button>
      </div>
    </SectionBase>
  );
};

export default Export;
