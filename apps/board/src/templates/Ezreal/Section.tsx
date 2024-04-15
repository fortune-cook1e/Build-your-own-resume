import Link from '@/templates/Ezreal/Link';
import { SectionWithItem, URL, isEmptyString, mergeTailwindCss } from 'shared';
import { get } from 'lodash-es';

interface Props<T> {
  data: SectionWithItem<T>;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
}

const Section = <T,>({
  data,
  className,
  children,
  urlKey,
  // levelKey,
  summaryKey,
  keywordsKey,
}: Props<T>) => {
  return (
    <section id={data.id} className="grid">
      <h4 className="font-bold text-primary">{data.name}</h4>

      <div
        className="grid gap-x-6 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${1}, 1fr)` }}
      >
        {data.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            // const level = (levelKey && get(item, levelKey, 0)) as
            //   | number
            //   | undefined;
            const summary = (summaryKey && get(item, summaryKey, '')) as
              | string
              | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as
              | string[]
              | undefined;

            return (
              <div
                key={item.id}
                className={mergeTailwindCss('space-y-2', className)}
              >
                <div>
                  {children?.(item as T)}
                  {url !== undefined && <Link url={url} />}
                </div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    className="wysiwyg"
                    dangerouslySetInnerHTML={{ __html: summary }}
                  />
                )}

                {/* {level !== undefined && level > 0 && <Rating level={level} />} */}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(', ')}</p>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Section;
