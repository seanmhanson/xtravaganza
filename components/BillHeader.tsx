import BillMetadata from "@/data/models/BillMetadata";
import styles from '@/styles/BillHeader.module.css';

interface BillHeaderProps {
  metadata: BillMetadata;
}

const BillHeader = ({ metadata }: BillHeaderProps) => {
  const { state, billNumber, name, longName, status, sponsor, billHref, textHref, pdfHref} = metadata;
  return (
    <header>
      <h1 className={styles.header}>{state} {billNumber}</h1>

      <h2 className={styles.title}>{name}</h2>
      
      {longName &&
        <blockquote className={styles.subtitle}>
          {longName}
        </blockquote>
      }

      <div className={styles.grid}>
        <div>Status</div>
        <div>{status}</div>
        <div>Sponsor</div>
        <div>{sponsor}</div>
        <div>References</div>
        <div>
          <div>
            <a href={billHref} target="_blank" rel="noreferrer">
              Official State Bill Page
            </a>
          </div>

          {textHref && (
            <div>
              <a href={textHref} target="_blank" rel="noreferrer">
                Initial Bill Text (text)
              </a>
            </div>
          )}

          {pdfHref && (
            <div>
              <a href={pdfHref} target="_blank" rel="noreferrer">
                Initial Bill Text (pdf)
              </a>
            </div>
          )}
        </div>
      </div>

        
      <hr />
    </header>
  );
};

export default BillHeader;
