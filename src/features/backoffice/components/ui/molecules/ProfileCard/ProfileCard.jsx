import Avatar from "../../../../../../shared/components/ui/atoms/Avatar/Avatar.jsx";
import { ROLE_LABEL } from "../../../../../../shared/constants/nav.js";
import "./ProfileCard.scss";

export default function ProfileCard({ name, email, role, roleLabel, className = "" }) {
  const classes = ["profile-card", className].filter(Boolean).join(" ");
  const label = roleLabel ?? (role ? ROLE_LABEL[role] : "");
  return (
    <div className={classes}>
      <Avatar name={name} size="xl" />
      <div className="profile-card__info">
        <div className="profile-card__name">{name}</div>
        <div className="profile-card__meta">
          {email}
          {label && <span className="profile-card__role"> · {label}</span>}
        </div>
      </div>
    </div>
  );
}