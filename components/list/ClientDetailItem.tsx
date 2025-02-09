import { Circle } from '@mui/icons-material';

type ClientDetailItemProps = {
    label: string
    data: string
}
export default function ClientDetailItem({ label, data } : ClientDetailItemProps) {
  return (
    <p className="py-2 sm:py-3 2xl:py-4 text-gray-700 text-sm sm:text-base">
      <span style={{ whiteSpace: 'pre' }}>{'\t'}<Circle sx={{ fontSize: '0.5rem', verticalAlign: 'middle', marginRight: '0.5rem' }} /></span>
        {label}:
      <span className="font-semibold text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>{'\t\t'} {data}</span>
    </p>
  );
}
