import Button from "../../../../../../shared/components/ui/atoms/Button/Button";
import { INCIDENT_STATUS } from "../../../../../../shared/constants/incidentStatus";

const ACTION_BY_STATUS = {
  [INCIDENT_STATUS.ASSIGNED]: {
    label: "Comenzar",
    loadingLabel: "Comenzando...",
    handlerKey: "onStart",
  },
  [INCIDENT_STATUS.IN_PROGRESS]: {
    label: "Pausar",
    loadingLabel: "Pausando...",
    handlerKey: "onPause",
  },
  [INCIDENT_STATUS.PAUSED]: {
    label: "Reanudar",
    loadingLabel: "Reanudando...",
    handlerKey: "onResume",
  },
};

export default function IncidentPrimaryAction({
  status,
  loading = false,
  onStart,
  onPause,
  onResume,
}) {
  const config = ACTION_BY_STATUS[status];
  if (!config) return null;

  const handleClick = { onStart, onPause, onResume }[config.handlerKey];

  return (
    <Button variant="primary" disabled={loading} onClick={handleClick}>
      {loading ? config.loadingLabel : config.label}
    </Button>
  );
}
