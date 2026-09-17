import Skeleton from "../../../../../../shared/components/ui/atoms/Skeleton/Skeleton.jsx";
import "./GuestIncidentItemSkeleton.scss";

export default function GuestIncidentItemSkeleton() {
  return (
    <li className="guest-incident-item-skeleton" aria-hidden="true">
      <div className="guest-incident-item-skeleton__header">
        <Skeleton width={80} height={12} radius={4} />
        <Skeleton width={90} height={24} radius={999} />
      </div>

      <Skeleton width="90%" height={16} radius={4} />

      <div className="guest-incident-item-skeleton__footer">
        <Skeleton width={70} height={12} radius={4} />
      </div>
    </li>
  );
}