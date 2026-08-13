/**
 * Registro de iconos disponibles para el .env.
 * En las variables REACT_APP_FEATURE_x_ICON / REACT_APP_BENEFIT_x_ICON
 * se escribe la clave (ej: "whatsapp") y aquí se resuelve el componente.
 */
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const REGISTRY = {
  calendar: CalendarMonthRoundedIcon,
  whatsapp: WhatsAppIcon,
  money: PaymentsRoundedIcon,
  chart: InsightsRoundedIcon,
  users: GroupsRoundedIcon,
  star: StarRoundedIcon,
  bolt: BoltRoundedIcon,
  shield: ShieldRoundedIcon,
  clock: AccessTimeRoundedIcon,
  phone: PhoneIphoneRoundedIcon,
  gift: CardGiftcardRoundedIcon,
  palette: PaletteRoundedIcon,
  scissors: ContentCutRoundedIcon,
  bot: SmartToyRoundedIcon,
  link: LinkRoundedIcon,
  bell: NotificationsActiveRoundedIcon,
  sparkle: AutoAwesomeRoundedIcon,
  check: CheckCircleRoundedIcon,
};

export default function Icon({ name, ...props }) {
  const Component = REGISTRY[String(name || '').toLowerCase()] || AutoAwesomeRoundedIcon;
  return <Component {...props} />;
}
