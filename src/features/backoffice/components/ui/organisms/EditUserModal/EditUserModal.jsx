import { useState } from "react";
import { Save, CircleX } from "lucide-react";
import Modal from "../../../../../../shared/components/ui/molecules/Modal/Modal.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import Input from "../../../../../../shared/components/ui/atoms/Input/Input.jsx";
import DropdownField from "../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import NoticeBanner from "../../../../../../shared/components/ui/molecules/NoticeBanner/NoticeBanner.jsx";
import PasswordInput from "../../../../../../shared/components/ui/molecules/PasswordInput/PasswordInput.jsx";
import { ROLES, ROLE_LABEL } from "../../../../../../shared/constants/nav.js";
import "./EditUserModal.scss";

const ROLE_OPTIONS = [
  { value: ROLES.ADMIN, label: ROLE_LABEL[ROLES.ADMIN] },
  { value: ROLES.COORDINATOR, label: ROLE_LABEL[ROLES.COORDINATOR] },
  { value: ROLES.OPERATOR, label: ROLE_LABEL[ROLES.OPERATOR] },
];

function onlyLetters(value) {
  return value.replace(/[^\p{L} ]/gu, "");
}

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onSave,
  mode = "edit",
  submitError = "",
  fieldErrors = {},
}) {
  const isCreate = mode === "create";
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
    if (isCreate && !password) {
      setError("Elige una contraseña inicial para el usuario.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    onSave?.({ name: name.trim(), email: email.trim(), role, password });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCreate ? "Nuevo usuario" : "Editar usuario"}
      subtitle={isCreate ? "Crea una cuenta para la empresa" : user?.email}
    >
      <div className="edit-user-modal">
        {submitError && <NoticeBanner tone="error">{submitError}</NoticeBanner>}

        <FormField
          id="edit-user-name"
          label="Nombre y apellido"
          error={fieldErrors.name}
        >
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(onlyLetters(e.target.value))}
            placeholder="Nombre y apellido"
          />
        </FormField>

        <FormField
          id="edit-user-email"
          label="Correo electrónico"
          error={fieldErrors.email}
        >
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@email.com"
          />
        </FormField>

        <FormField id="edit-user-role" label="Rol" error={fieldErrors.role}>
          <DropdownField
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={ROLE_OPTIONS}
          />
        </FormField>

        <FormField
          id="edit-user-password"
          label={isCreate ? "Contraseña inicial" : "Nueva contraseña"}
          error={fieldErrors.password}
        >
          <PasswordInput
            name="password"
            value={password}
            invalid={!!fieldErrors.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              isCreate
                ? "Mínimo 8 caracteres, letra y número"
                : "Dejar vacío para no cambiarla"
            }
          />
        </FormField>

        <FormField
          id="edit-user-repeat"
          label="Repetir contraseña"
          error={error}
        >
          <PasswordInput
            name="repeatPassword"
            value={repeatPassword}
            invalid={!!error}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repite la contraseña"
          />
        </FormField>

        <div className="edit-user-modal__actions">
          <Button
            variant="primary"
            className="edit-user-modal__save"
            onClick={handleSave}
          >
            <Save size={16} aria-hidden="true" />
            {isCreate ? "Crear usuario" : "Guardar cambios"}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            <CircleX size={16} aria-hidden="true" />
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}