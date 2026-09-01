import { useState } from "react";
import Modal from "../../../../../../shared/components/ui/molecules/Modal/Modal.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import DropdownField from "../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import InlineError from "../../../../../../shared/components/ui/atoms/InlineError/InlineError.jsx";
import { ROLES, ROLE_LABEL } from "../../../../../../shared/constants/nav.js";
import "./EditUserModal.scss";

const ROLE_OPTIONS = [
  { value: ROLES.ADMIN, label: ROLE_LABEL[ROLES.ADMIN] },
  { value: ROLES.COORDINATOR, label: ROLE_LABEL[ROLES.COORDINATOR] },
  { value: ROLES.OPERATOR, label: ROLE_LABEL[ROLES.OPERATOR] },
];

export default function EditUserModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.role ?? ROLES.OPERATOR);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSave() {
    if (!name.trim() || !email.trim()) {
      setError("Completa nombre y correo electrónico.");
      return;
    }
    if (password && password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    onSave?.({ name: name.trim(), email: email.trim(), role, password });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar usuario"
      subtitle={user?.email}
    >
      <div className="edit-user-modal">
        <FormField label="Nombre y apellido">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre y apellido"
          />
        </FormField>

        <FormField label="Correo electrónico">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@email.com"
          />
        </FormField>

        <FormField label="Rol">
          <DropdownField
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={ROLE_OPTIONS}
          />
        </FormField>

        <FormField label="Nueva contraseña">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar vacío para no cambiarla"
          />
        </FormField>

        <FormField label="Repetir contraseña">
          <Input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repite la nueva contraseña"
          />
        </FormField>

        {error && <InlineError>{error}</InlineError>}

        <div className="edit-user-modal__actions">
          <Button
            variant="primary"
            className="edit-user-modal__save"
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
          <Button
            variant="secondary"
            className="edit-user-modal__cancel"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}