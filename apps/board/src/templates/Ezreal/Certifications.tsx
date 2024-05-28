import { useBoardStore } from '@/store/board';
import Section from '@/templates/Ezreal/Section';

import { Certifications as CertificationsProps } from 'shared';

const Certifications = () => {
  const data = useBoardStore((state) => state.resume.sections.certifications);

  if (!data || !data.visible) {
    return null;
  }

  return (
    <Section<CertificationsProps>
      data={data}
      urlKey="website"
      summaryKey="summary"
    >
      {(item) => (
        <div className="flex items-start justify-between">
          <div className="text-left">
            <div className="font-bold">{item.name}</div>
            <div>{item.issuer}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Certifications;
