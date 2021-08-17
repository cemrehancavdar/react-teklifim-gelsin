import { useReasons } from "../../../hooks/useReasons";

function LoanFilter({ onFilterChange }) {
  const { data: reasons, isLoading } = useReasons();

  return (
    <>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option key="null" value="">
          {" "}
          Kredi Türü Seçiniz
        </option>

        {isLoading
          ? null
          : reasons.data.map((reason) => {
              return (
                <option key={reason.id} value={reason.name}>
                  {reason.name}
                </option>
              );
            })}
      </select>
    </>
  );
}

export default LoanFilter;
