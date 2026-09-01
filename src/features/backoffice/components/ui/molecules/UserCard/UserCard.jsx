import Avatar from "../../../../../../shared/components/ui/atoms/Avatar/Avatar.jsx";
import { ROLE_LABEL } from "../../../../../../shared/constants/nav.js";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import "./UserCard.scss";

export default function UserCard({
  name,
  email,
  role,
  roleLabel,
  onEdit,
  onDeactivate,
  className = "",
}) {
  const classes = ["user-card", className].filter(Boolean).join(" ");
  const label = roleLabel ?? (role ? ROLE_LABEL[role] : "");

  return (
    <div className={classes}>
      <div className="user-card__top">
        <Avatar name={name} size="lg" />
        <div className="user-card__info">
          <div className="user-card__name">{name}</div>
          <div className="user-card__email">{email}</div>
        </div>
        {label && <span className="user-card__role">{label}</span>}
      </div>

      <div className="user-card__actions">
        <Button variant="secondary" className="user-card__edit" onClick={onEdit}>
          Editar
        </Button>
        <Button
          variant="secondary"
          className="user-card__deactivate"
          onClick={onDeactivate}
        >
          Desactivar
        </Button>
      </div>
    </div>
  );
}