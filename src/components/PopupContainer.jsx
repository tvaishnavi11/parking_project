import { motion, AnimatePresence } from "framer-motion";
import ModernContactForm from "./getTuch";

const PopupContainer = ({ type, onClose }) => {
  if (!type) return null;
  const [openModal, setOpenModal] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-white rounded-3xl p-8 w-[90%] max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {type === "getTuch" && <ModernContactForm />}
          {type === "book" && <BookSlotPopup />}
          {type === "profile" && <ProfilePopup />}

          <button onClick={onClose} className="absolute top-4 right-4 text-xl">
            ✕
          </button>
        </motion.div>
      </motion.div>

      {openModal && (
        <ModernContactForm
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default PopupContainer;
