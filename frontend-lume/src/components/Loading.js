import styles from '../styles/Loading.module.css';
import { VscLoading } from 'react-icons/vsc';

const Loading = ({ 
  mensagem = "Carregando...",
  subtexto = null,
  variante = "overlay", // "overlay", "blur", "inline"
  carregando = true
}) => {
  if (!carregando) return null;

  if (variante === "inline") {
    return (
      <div className={styles.loadingInline} role="status" aria-live="polite" aria-busy="true">
        <VscLoading className={styles.spinnerInline} />
        <span className={styles.textoInline}>{mensagem}</span>
      </div>
    );
  }

  const classeOverlay = variante === "blur" ? styles.loadingOverlayBlur : styles.loadingOverlay;

  return (
    <div className={`${classeOverlay} ${styles.fadeIn}`} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.loadingContainer}>
        <div className={styles.spinnerContainer}>
          <VscLoading className={styles.spinner} />
        </div>
        <div className={styles.loadingTexto}>{mensagem}</div>
        {subtexto && <div className={styles.loadingSubtexto}>{subtexto}</div>}
      </div>
    </div>
  );
};

export default Loading;
