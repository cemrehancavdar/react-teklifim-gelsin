import { Link, useHistory } from "react-router-dom";
import { useLoans } from "../../hooks/useLoans";
import LoanFilter from "./LoanFilter";
import Loans from "./Loans";

import styles from "./Homepage.module.css";
import { useState } from "react";
import { authenticationService } from "../../services/authentication.service";

function Homepage() {
  const { data: loans, isLoading } = useLoans();
  const [reasonFilter, setReasonFilter] = useState("");
  const history = useHistory();
  const { logout } = authenticationService;

  let filteredLoans = [];

  if (!isLoading) {
    if (reasonFilter !== "") {
      filteredLoans = loans.data.filter((loan) => loan.reason === reasonFilter);
    } else {
      filteredLoans = loans.data;
    }
  }

  function handleClick() {
    history.push("/createloan");
  }

  return isLoading ? (
    "Loading"
  ) : (
    <div>
      <div className={styles.auth}>
        <Link onClick={() => logout()} to="/login">
          Çıkış Yap
        </Link>
      </div>
      <div className={styles.bar}>
        <LoanFilter onFilterChange={setReasonFilter} />
        <button onClick={handleClick}>Yeni Kredi İlanı Oluştur</button>
      </div>
      <Loans loans={filteredLoans} />
    </div>
  );
}

export default Homepage;
