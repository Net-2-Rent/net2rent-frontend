import { useForm } from "react-hook-form";
import TextField from "../../../../../../shared/components/ui/atoms/TextField/TextField.jsx";
import TextArea from "../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import {
  INCIDENT_PRIORITY,
  INCIDENT_PRIORITY_LABEL,
} from "../../../../../../shared/constants/incidentPriority.js";
import {
  INCIDENT_CATEGORY,
  INCIDENT_CATEGORY_LABEL,
} from "../../../../../../shared/constants/incidentCategory.js";
import NoticeBox from "../../../../../../shared/components/ui/molecules/NoticeBox/NoticeBox.jsx";
import "./PhoneIncidentForm.scss";

const TITLE_MAX = 150;

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function PhoneIncidentForm({
  lodgings = [],
  operators = [],
  onSubmit,
  submitError,
}) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      lodgingId: "",
      operatorId: "",
      openedDate: today(),
      openedTime: new Date().toTimeString().slice(0, 5),
      firstName: "",
      lastName: "",
      contact: "",
      category: "",
      priority: INCIDENT_PRIORITY.NORMAL,
      title: "",
      description: "",
    },
  });

  const titleLength = watch("title").length;

  function describedBy(name, hasHint) {
    if (errors[name]) return `${name}-error`;
    if (hasHint) return `${name}-hint`;
    return undefined;
  }

  return (
    <form
      className="phone-incident-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="phone-incident-form__alert" role="alert">
          {submitError}
        </div>
      )}

      <div className="phone-incident-form__row">
        <FormField
          id="lodgingId"
          label="Alojamiento (activos)"
          error={errors.lodgingId?.message}
        >
          <select
            id="lodgingId"
            className="text-field"
            aria-invalid={!!errors.lodgingId || undefined}
            aria-describedby={describedBy("lodgingId", false)}
            {...register("lodgingId", {
              required: "Selecciona un alojamiento",
            })}
          >
            <option value="">Selecciona un alojamiento</option>
            {lodgings.map((lodging) => (
              <option key={lodging.id} value={lodging.id}>
                {lodging.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="operatorId" label="Operario asignado (opcional)">
          <select
            id="operatorId"
            className="text-field"
            {...register("operatorId")}
          >
            <option value="">Sin asignar · va al pool</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="phone-incident-form__row">
        <FormField
          id="openedDate"
          label="Fecha de apertura"
          error={errors.openedDate?.message}
        >
          <TextField
            id="openedDate"
            type="date"
            max={today()}
            invalid={!!errors.openedDate}
            aria-describedby={describedBy("openedDate", false)}
            {...register("openedDate", {
              required: "La fecha de apertura es obligatoria",
              validate: (date) => {
                const time = getValues("openedTime") || "00:00";
                return (
                  new Date(`${date}T${time}`) <= new Date() ||
                  "No se admiten fechas ni horas futuras."
                );
              },
            })}
          />
        </FormField>

        <FormField
          id="openedTime"
          label="Hora de apertura"
          hint="Se admiten aperturas pasadas; no futuras."
          error={errors.openedTime?.message}
        >
          <TextField
            id="openedTime"
            type="time"
            invalid={!!errors.openedTime}
            aria-describedby={describedBy("openedTime", true)}
            {...register("openedTime", {
              required: "La hora de apertura es obligatoria",
            })}
          />
        </FormField>
      </div>

      <div className="phone-incident-form__row">
        <FormField
          id="firstName"
          label="Nombre"
          error={errors.firstName?.message}
        >
          <TextField
            id="firstName"
            placeholder="Nombre del reportante"
            invalid={!!errors.firstName}
            autoComplete="given-name"
            aria-describedby={describedBy("firstName", false)}
            {...register("firstName", { required: "El nombre es obligatorio" })}
          />
        </FormField>

        <FormField
          id="lastName"
          label="Apellido"
          error={errors.lastName?.message}
        >
          <TextField
            id="lastName"
            placeholder="Apellido"
            invalid={!!errors.lastName}
            autoComplete="family-name"
            aria-describedby={describedBy("lastName", false)}
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
          />
        </FormField>
      </div>

      <div className="phone-incident-form__row">
        <FormField id="contact" label="Contacto (opcional)">
          <TextField
            id="contact"
            placeholder="Email o teléfono"
            {...register("contact")}
          />
        </FormField>

        <FormField id="category" label="Categoría (opcional)">
          <select
            id="category"
            className="text-field"
            {...register("category")}
          >
            <option value="">Sin categorizar</option>
            {Object.values(INCIDENT_CATEGORY).map((value) => (
              <option key={value} value={value}>
                {INCIDENT_CATEGORY_LABEL[value]}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="priority" label="Prioridad">
        <select id="priority" className="text-field" {...register("priority")}>
          {Object.values(INCIDENT_PRIORITY).map((value) => (
            <option key={value} value={value}>
              {INCIDENT_PRIORITY_LABEL[value]}
              {value === INCIDENT_PRIORITY.NORMAL ? " (por defecto)" : ""}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="title"
        label="Título de la incidencia"
        error={errors.title?.message}
        counter={`${titleLength}/${TITLE_MAX}`}
      >
        <TextField
          id="title"
          invalid={!!errors.title}
          placeholder="Resumen en una línea (3–150 caracteres)"
          aria-describedby={describedBy("title", false)}
          {...register("title", {
            required: "El título es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: {
              value: TITLE_MAX,
              message: `Máximo ${TITLE_MAX} caracteres`,
            },
          })}
        />
      </FormField>

      <FormField
        id="description"
        label="Descripción"
        error={errors.description?.message}
      >
        <TextArea
          id="description"
          invalid={!!errors.description}
          placeholder="Qué ocurre, desde cuándo, qué ha intentado el cliente"
          aria-describedby={describedBy("description", false)}
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
      </FormField>

      <div>
        <NoticeBox>
          {watch("operatorId")
            ? "Se creará en estado ASSIGNED con la fecha de apertura indicada."
            : "Sin operario seleccionado: la incidencia se creará con estado NEW y estará disponible en el pool."}
        </NoticeBox>
      </div>

      <div className="phone-incident-form__actions">
        <button type="submit" disabled={isSubmitting}>
          Registrar incidencia
        </button>
        <button type="button">Cancelar</button>
      </div>
    </form>
  );
}
