import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import ContentLayout from '../components/ui/organisms/ContentLayout/ContentLayout.jsx';
import PageHeader from '../components/ui/molecules/PageHeader/PageHeader.jsx';
import DetailRow from '../components/ui/molecules/DetailRow/DetailRow.jsx';
import StatusBadge from '../../../shared/components/ui/atoms/StatusBadge/StatusBadge.jsx';
import NoticeBox from '../../../shared/components/ui/molecules/NoticeBox/NoticeBox.jsx';
import PrimaryButton from '../components/ui/atoms/PrimaryButton/PrimaryButton.jsx';
import { formatDate } from '../../../shared/utils/formatDate.js';
import { fetchGuestIncidentDetail } from '../services/guestApi.js';
import './IncidentDetailGuestPage.scss';

export default function IncidentDetailGuestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | error | notfound | success
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchGuestIncidentDetail(id)
      .then((data) => {
        if (!active) return;
        setIncident(data);
        setStatus('success');
      })
      .catch((err) => {
        if (!active) return;
        if (err.response?.status === 404) {
          setStatus('notfound');
        } else {
          setError(
            err.response?.data?.message ??
            'No se pudo cargar la incidencia. Inténtalo de nuevo.'
          );
          setStatus('error');
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleBack = () => navigate(-1);

  if (status === 'notfound') {
    return (
      <ContentLayout
        header={
          <PageHeader
            backLabel="Mi alojamiento"
            onBack={handleBack}
            title="Incidencia no encontrada"
          />
        }
      >
        <div className="incident-detail-guest__error">
          <AlertCircle size={24} aria-hidden="true" />
          <p>No hemos encontrado esta incidencia en tu alojamiento.</p>
          <PrimaryButton onClick={() => navigate('/alojamiento')}>
            Volver a mi alojamiento
          </PrimaryButton>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      header={
        <PageHeader
          backLabel="Mi alojamiento"
          onBack={handleBack}
          eyebrow={incident?.code}
          title={incident ? incident.description : 'Detalle de la incidencia'}
        />
      }
    >
      <div className="incident-detail-guest">
        <NoticeBox>
          Para incidencias urgentes como una fuga de agua o un corte de luz,
          llama directamente al teléfono de emergencias del alojamiento.
        </NoticeBox>

        {status === 'loading' && (
          <p className="incident-detail-guest__status">Cargando…</p>
        )}

        {status === 'error' && (
          <div className="incident-detail-guest__error">
            <AlertCircle size={24} aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {status === 'success' && incident && (
          <dl className="incident-detail-guest__detail">
            <DetailRow label="Código">{incident.code}</DetailRow>
            <DetailRow label="Estado">
              <StatusBadge status={incident.status} />
            </DetailRow>
            <DetailRow label="Fecha de apertura">
              <time dateTime={incident.openedAt}>
                {formatDate(incident.openedAt)}
              </time>
            </DetailRow>
            {incident.closedAt && (
              <DetailRow
                label="Fecha de cierre"
                className="incident-detail-guest__closed"
              >
                <time dateTime={incident.closedAt}>
                  {formatDate(incident.closedAt)}
                </time>
              </DetailRow>
            )}
          </dl>
        )}
      </div>
    </ContentLayout>
  );
}