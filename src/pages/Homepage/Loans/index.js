import Loan from "./Loan";
import styles from "./Loans.module.css";

function Loans({ loans }) {
  return (
    <div>
      {loans.length > 0 ? (
        loans.map((loan) => {
          return <Loan key={loan.id} loan={loan} />;
        })
      ) : (
        <div className={styles.noData}>
          <h3>Kayıtlı Kredi İlanı Yok</h3>
        </div>
      )}
    </div>
  );
}

export default Loans;
