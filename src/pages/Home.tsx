import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Image, Video, Send, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import suitcaseDimensions from "@/assets/suitcase-dimensions.jpg";
import suitcasePacked from "@/assets/suitcase-packed.jpg";

const galleryImages = [
  { id: "dim", src: suitcaseDimensions, caption: "Valigia — dimensioni" },
  { id: "pack", src: suitcasePacked, caption: "Outfit estivo" },
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as { username?: string })?.username || "Utente";
  const [message, setMessage] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleImage = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirmSelection = () => {
    setGalleryOpen(false);
  };

  const handleSend = () => {
    // "Send" the message / photos — then clear everything
    setMessage("");
    setSelectedImages([]);
  };

  const hasContent = message.trim().length > 0 || selectedImages.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Clothes<span className="text-primary">Friends</span>
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
            <User size={16} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="text-sm text-muted-foreground">Benvenuto</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Ciao, {username}
          </h1>
        </motion.div>

        {/* Interactive Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <button
            className="animate-orb-pulse group relative flex h-52 w-52 items-center justify-center rounded-full border-2 border-primary/30 bg-background transition-all duration-300 hover:border-primary hover:shadow-lg active:scale-95"
            onClick={() => {}}
          >
            <div className="animate-orb-breathe flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Clicca per parlare</span>
              <span className="text-xs text-muted-foreground/60">con me</span>
            </div>
          </button>
          <div className="pointer-events-none absolute inset-0 -m-4 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute inset-0 -m-10 rounded-full border border-primary/5" />
        </motion.div>
      </main>

      {/* Selected images preview above input bar */}
      <AnimatePresence>
        {selectedImages.length > 0 && !galleryOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-secondary/30 px-4 py-2"
          >
            <div className="mx-auto flex max-w-lg gap-2 overflow-x-auto">
              {selectedImages.map((id) => {
                const img = galleryImages.find((g) => g.id === id);
                if (!img) return null;
                return (
                  <div key={id} className="relative shrink-0">
                    <img src={img.src} alt={img.caption} className="h-16 w-16 rounded-lg object-cover" />
                    <button
                      onClick={() => setSelectedImages((p) => p.filter((i) => i !== id))}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Input Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-border bg-background px-4 py-3"
      >
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Aggiungi foto"
          >
            <Image size={20} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Videochiamata"
          >
            <Video size={20} />
          </button>
          <input
            type="text"
            placeholder="Scrivi un messaggio..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-full border border-input bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            disabled={!hasContent}
            onClick={handleSend}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30 hover:opacity-90 active:scale-95"
            aria-label="Invia"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>

      {/* Gallery — phone-style grid */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
          >
            {/* Gallery header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <button
                onClick={() => { setGalleryOpen(false); setSelectedImages([]); }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Annulla
              </button>
              <span className="text-sm font-semibold text-foreground">Galleria</span>
              <button
                onClick={confirmSelection}
                disabled={selectedImages.length === 0}
                className="text-sm font-semibold text-primary disabled:opacity-30"
              >
                Fatto {selectedImages.length > 0 && `(${selectedImages.length})`}
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-1">
              <div className="grid grid-cols-3 gap-1">
                {galleryImages.map((img) => {
                  const isSelected = selectedImages.includes(img.id);
                  return (
                    <button
                      key={img.id}
                      onClick={() => toggleImage(img.id)}
                      className="relative aspect-square overflow-hidden"
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="h-full w-full object-cover transition-transform duration-150 active:scale-95"
                      />
                      {/* Selection overlay */}
                      <div
                        className={`absolute inset-0 transition-colors duration-150 ${
                          isSelected ? "bg-primary/20" : "bg-transparent"
                        }`}
                      />
                      {/* Checkbox circle */}
                      <div
                        className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-150 ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-background/80 bg-foreground/20"
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
