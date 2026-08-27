import { Link } from 'react-router-dom';
import StatusBadge from '../../../../shared/components/StatusBadge/StatusBadge';
import { formatDate } from '../../../../shared/utils/formatDate';
import './IssueListItem.scss';

export default function IssueListItem({
                                          to,
                                          code,
                                          title,
                                          status,
                                          openedAt,
                                          className = '',
                                      }) {
    const classes = ['issue-list-item', className].filter(Boolean).join(' ');

    return (
        <li className="issue-list-item__wrapper">
            <Link to={to} className={classes}>
        <span className="issue-list-item__header">
          <span className="issue-list-item__code">{code}</span>
          <StatusBadge status={status} />
        </span>

                <span className="issue-list-item__title">{title}</span>

                <time className="issue-list-item__date" dateTime={openedAt}>
                    {formatDate(openedAt)}
                </time>
            </Link>
        </li>
    );
}