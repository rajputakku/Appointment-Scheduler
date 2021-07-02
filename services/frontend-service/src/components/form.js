import "../App.css";
import Button from "@material-ui/core/Button";

export const FormModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </section>
    </div>
  );
};
