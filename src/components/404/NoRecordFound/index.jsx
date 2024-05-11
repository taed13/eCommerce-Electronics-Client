import { Link } from "react-router-dom";
import "./style.css";

export const NoRecordFound = () => {
  return (
    <>
      <div className="empty-state">
        <div className="empty-state__content">
          <div className="empty-state__icon">
            <img src="./images/icons8-empty-64.png" alt="No record found" />
          </div>
          <div className="empty-state__message">
            No records has been added yet.
          </div>
          <div className="empty-state__help">
            Add new records by simply clicking favorites in my store.
            <Link to="/product" className="empty-state__link">
              My store
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
