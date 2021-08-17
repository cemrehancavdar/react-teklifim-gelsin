import { useOfferMutation } from '../../../../../hooks/useOfferMutation';
import styles from './Offer.module.css';

function Offer({ offer }) {
  const offerMutation = useOfferMutation();

  function handleClick() {
    offerMutation.mutate(offer.id);
  }

  return (
    <li
      className={`${styles.offer} ${
        offer.status === true ? styles.accepted : ''
      }`}
    >
      <span className={styles.bank}>{offer.bank}</span>
      <span className={styles.interest_rate}>{offer.interest_rate}</span>
      <span className={styles.total_pay_amount}>
        {offer.total_pay_amount} TL
      </span>
      <button
        className={styles.status}
        disabled={offer.status == null ? false : true}
        onClick={handleClick}
      >
        {' '}
        Seç{' '}
      </button>
    </li>
  );
}

export default Offer;
