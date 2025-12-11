import { toast } from 'react-toastify';

const DEFAULT_CONFIG = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'colored',
};

const cfg = (opts = {}) => ({ ...DEFAULT_CONFIG, ...opts });

export const toastUtils = {
  sucesso: (msg, opts) => toast.success(msg, cfg(opts)),
  erro: (msg, opts) => toast.error(msg, cfg(opts)),
  aviso: (msg, opts) => toast.warn(msg, cfg(opts)),
  info: (msg, opts) => toast.info(msg, cfg(opts)),
  customizado: (msg, opts) => toast(msg, cfg(opts)),
};
