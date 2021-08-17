import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoanMutation } from "../../hooks/useLoanMutation";
import { useReasons } from "../../hooks/useReasons";
import styles from "./CreateLoan.module.css";

function CreateLoan() {
  const { data: reasons, isLoading } = useReasons();
  const loanMutations = useLoanMutation();
  const history = useHistory();

  const [amount, setAmount] = useState(null);
  const [reason, setReason] = useState(1);
  const [expiry, setExpiry] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (amount > 0 && expiry > 0) {
      loanMutations.mutate({ amount, reason, expiry });
    }
    history.push("/");
  }
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Miktar</p>
          <input
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </label>
        <label>
          <p>Kredi Türü</p>
          <select onChange={(e) => setReason(parseInt(e.target.value))}>
            {isLoading
              ? null
              : reasons.data.map((reason) => {
                  return (
                    <option key={reason.id} value={reason.id}>
                      {reason.name}
                    </option>
                  );
                })}
          </select>
        </label>
        <label>
          <p>Sona Erme Günü</p>
          <input
            type="number"
            onChange={(e) => setExpiry(parseInt(e.target.value))}
          />
        </label>
        <div>
          <br />
          <button type="submit">oluştur</button>
        </div>
      </form>
    </div>
  );
}

export default CreateLoan;
