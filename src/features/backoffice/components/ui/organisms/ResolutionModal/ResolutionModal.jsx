import { useState, useId } from "react";
import Modal from "../../../../../../shared/components/ui/molecules/Modal/Modal.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import TextArea from "../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import "./ResolutionModal.scss";

export default function ResolutionModal({
  isOpen,
  onClose,
  incidentCode,
  lodgingName,
  onResolve,
}) {
  const [minutes, setMinutes] = useState("");
  const [note, setNote] = useState("");
  const formId = useId();
  const minutesId = useId();
  const noteId = useId();

  const canSubmit = Number(minutes) > 0 && note.trim().length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onResolve?.({ minutes: Number(minutes), note: note.trim() });
    setMinutes("");
    setNote("");
  }

  const subtitle = [incidentCode, lodgingName].filter(Boolean).join(" · ");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resolver incidencia"
      subtitle={subtitle}
      footer={
        <div className="resolution-modal__actions">
          <Button
            type="submit"
            form={formId}
            variant="primary"
            disabled={!canSubmit}
          >
            Marcar como resuelta
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      }
    >
      <form
        id={formId}
        className="resolution-modal__form"
        onSubmit={handleSubmit}
      >
        <FormField id={minutesId} label="Minutos invertidos">
          <Input
            type="number"
            min="1"
            inputMode="numeric"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Ej. 45"
          />
        </FormField>

        <FormField id={noteId} label="Nota de resolución">
          <TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Qué se ha hecho y con qué material"
          />
        </FormField>
      </form>
    </Modal>
  );
}
