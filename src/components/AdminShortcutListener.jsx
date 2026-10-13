// src/components/AdminShortcutListener.jsx
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../redux/slices/uiSlice';

/**
 * Global Keyboard Shortcut Listener
 * Hidden Key: "Esc + `" (or Esc followed by backtick within 1.5s)
 * Opens the Admin Login / Admin Console
 */
const AdminShortcutListener = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const escDownRef = useRef(false);
  const lastEscTimeRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Track Escape key
      if (e.key === 'Escape' || e.code === 'Escape') {
        escDownRef.current = true;
        lastEscTimeRef.current = Date.now();
      }

      // Check for backtick ` or ~
      const isBacktick = e.key === '`' || e.key === '~' || e.code === 'Backquote';

      if (isBacktick) {
        const timeDiff = Date.now() - lastEscTimeRef.current;
        const isSequence = timeDiff > 0 && timeDiff < 1500;
        const isCombination = escDownRef.current || isSequence;

        if (isCombination) {
          e.preventDefault();

          if (user?.role === 'admin') {
            dispatch(
              showToast({
                type: 'success',
                title: 'Executive Console',
                message: 'Opening Admin Dashboard...'
              })
            );
            navigate('/admin');
          } else {
            dispatch(
              showToast({
                type: 'info',
                title: 'Executive Console',
                message: 'Opening Administrator Authorization...'
              })
            );
            navigate('/admin/login');
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        escDownRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
    };
  }, [navigate, location, user, dispatch]);

  return null;
};

export default AdminShortcutListener;
