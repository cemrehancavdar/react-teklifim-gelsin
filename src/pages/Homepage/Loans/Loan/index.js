import styles from './Loan.module.css';
import Offer from './Offer';
function Loan({ loan }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loan}>
        <span className={styles.reason}>{loan.reason}</span>
        <span className={styles.amount}> {loan.amount} TL </span>
        <span className={styles.expiry}>{loan.expiry}</span>
      </div>
      <ul className={styles.offers}>
        {loan.offers.map((offer) => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </ul>
    </div>
  );
}

export default Loan;
