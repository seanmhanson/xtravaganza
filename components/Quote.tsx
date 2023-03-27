import { ReactNode } from "react";
import styles from '@/styles/Quote.module.css';

interface QuoteProps {
  children: ReactNode;
  citation: string;
  title?: string;
  open?: boolean;
  slug?: string;
}

const Quote = ({ children, citation, title, open, slug }: QuoteProps) => {
  const summaryId = toKebabCase(slug || title || citation);
  return (
    <details className={styles.details}>
      <summary id={summaryId} className={styles.summary}>
        <strong>{citation}</strong>
        {title && <span> - On {title}</span>}
      </summary>
      <blockquote className={styles.quote}>{children}</blockquote>
    </details>
  );
};

export default Quote;
export type { QuoteProps };

const toKebabCase = (str: string) => {
  return str.replaceAll(/[^\w\- ]/g, '')
    .replaceAll(/[_ ]/g, '-')
    .toLowerCase();
}