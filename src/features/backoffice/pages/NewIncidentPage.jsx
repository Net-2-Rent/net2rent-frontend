import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PhoneIncidentForm from "../components/ui/organisms/PhoneIncidentForm/PhoneIncidentForm.jsx";
import Button from "../../../shared/components/ui/atoms/Button/Button.jsx";
import {
    listActiveLodgings,
    listOperators,
    createPhoneIncident,
} from "../services/incidentApi.js";
import { useAuthStore } from "../../auth/store/authStore.js";
import { ROLES } from "../../../shared/constants/nav.js";

export default function NewIncidentPage() {
    const role = useAuthStore((s) => s.user?.role);

    const [lodgings, setLodgings] = useState([]);
    const [operators, setOperators] = useState([]);
    const [loadError, setLoadError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [createdCode, setCreatedCode] = useState(null);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        if (role === ROLES.OPERATOR) return;

        let alive = true;
        Promise.all([listActiveLodgings(), listOperators()])
            .then(([lodgingsData, operatorsData]) => {
                if (!alive) return;
                setLodgings(lodgingsData);
                setOperators(operatorsData);
            })
            .catch(() => {
                if (alive) setLoadError("No se pudieron cargar alojamientos u operarios.");
            });
        return () => {
            alive = false;
        };
    }, [role]);

    if (role === ROLES.OPERATOR) {
        return <Navigate to="/backoffice/incidencias" replace />;
    }

    async function handleSubmit(values) {
        setSubmitError(null);
        try {
            const incident = await createPhoneIncident(values);
            setCreatedCode(incident.code);
        } catch (err) {
            const message =
                err.response?.data?.message ??
                "No se pudo registrar la incidencia. Inténtalo de nuevo.";
            setSubmitError(message);
        }
    }

    function registerAnother() {
        setCreatedCode(null);
        setSubmitError(null);
        setFormKey((k) => k + 1);
    }

    return (
        <section className="new-incident-page">
            <h1>Nueva incidencia</h1>
            <p>Registro telefónico de una incidencia sobre un alojamiento de tu cuenta.</p>

            {loadError && <div role="alert">{loadError}</div>}

            {createdCode ? (
                <div className="new-incident-page__success" role="status">
                    <p>
                        Incidencia registrada con el código <strong>{createdCode}</strong>.
                    </p>
                    <Button variant="primary" onClick={registerAnother}>
                        Registrar otra
                    </Button>
                </div>
            ) : (
                <PhoneIncidentForm
                    key={formKey}
                    lodgings={lodgings}
                    operators={operators}
                    onSubmit={handleSubmit}
                    submitError={submitError}
                />
            )}
        </section>
    );
}