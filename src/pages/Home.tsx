import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Image, Video, Send, X, Check, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useConversation } from "@elevenlabs/react";
import suitcaseDimensions from "@/assets/suitcase-dimensions.jpg";
import suitcasePacked from "@/assets/suitcase-packed.jpg";
import purpleTshirt from "@/assets/wardrobe/purple-tshirt.jpg";
import greenTshirt from "@/assets/wardrobe/green-tshirt.jpg";
import jeans from "@/assets/wardrobe/jeans.jpg";
import brownSweater from "@/assets/wardrobe/brown-sweater.jpg";
import sunglasses from "@/assets/wardrobe/sunglasses.jpg";

const galleryImages = [
  { id: "dim", src: suitcaseDimensions, caption: "Valigia — dimensioni" },
  { id: "pack", src: suitcasePacked, caption: "Outfit estivo" },
];

const wardrobeImages = [
  { id: "w1", src: purpleTshirt, caption: "Maglietta viola" },
  { id: "w2", src: greenTshirt, caption: "Maglietta verde" },
  { id: "w3", src: jeans, caption: "Jeans" },
  { id: "w4", src: brownSweater, caption: "Maglione marrone" },
  { id: "w5", src: sunglasses, caption: "Occhiali da sole" },
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as { username?: string })?.username || "Utente";
  const [message, setMessage] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [wardrobeOpen, setWardrobeOpen] = useState(false);
  const [creditCardOpen, setCreditCardOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");

  // ElevenLabs conversation
  const conversation = useConversation({
    onConnect: () => console.log("Connected to Closie"),
    onDisconnect: () => console.log("Disconnected from Closie"),
    onError: (error) => console.error("Closie error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "agent_8101kh78nsyhfb4vf1bcr4ekd97y",
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const toggleImage = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const confirmSelection = () => setGalleryOpen(false);

  const handleSend = () => {
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
          {/* Wardrobe icon */}
          <button
            onClick={() => setWardrobeOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background"
            aria-label="Armadio"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="2" width="18" height="20" rx="1" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="9" y1="10" x2="9" y2="14" />
              <line x1="15" y1="10" x2="15" y2="14" />
            </svg>
          </button>
          {/* Credit card icon */}
          <button
            onClick={() => setCreditCardOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background"
            aria-label="Carta di credito"
          >
            <CreditCard size={16} />
          </button>
          {/* Logout */}
          <button
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:bg-secondary"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
          {/* Profile */}
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

        {/* ElevenLabs Agent - Closie */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {conversation.status === "disconnected" ? (
            <button
              onClick={startConversation}
              className="animate-orb-pulse group relative flex h-52 w-52 items-center justify-center rounded-full border-2 border-primary/30 bg-background transition-all duration-300 hover:border-primary hover:shadow-lg active:scale-95"
            >
              <div className="animate-orb-breathe flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Clicca qui per parlare
                </span>
                <span className="text-xs text-muted-foreground/60">con Closie</span>
              </div>
            </button>
          ) : (
            <button
              onClick={stopConversation}
              className="group relative flex h-52 w-52 items-center justify-center rounded-full border-2 border-primary bg-primary/5 transition-all duration-300 hover:bg-primary/10 active:scale-95"
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 ${conversation.isSpeaking ? "animate-orb-breathe" : ""}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-primary">
                  {conversation.isSpeaking ? "Closie sta parlando..." : "In ascolto..."}
                </span>
                <span className="text-xs text-muted-foreground">Tocca per terminare</span>
              </div>
            </button>
          )}
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
          <button type="button" onClick={() => setGalleryOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Aggiungi foto">
            <Image size={20} />
          </button>
          <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Videochiamata">
            <Video size={20} />
          </button>
          <input type="text" placeholder="Scrivi un messaggio..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 rounded-full border border-input bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <button type="button" disabled={!hasContent} onClick={handleSend} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30 hover:opacity-90 active:scale-95" aria-label="Invia">
            <Send size={18} />
          </button>
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed inset-0 z-50 flex flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <button onClick={() => { setGalleryOpen(false); setSelectedImages([]); }} className="text-sm text-muted-foreground hover:text-foreground">Annulla</button>
              <span className="text-sm font-semibold text-foreground">Galleria</span>
              <button onClick={confirmSelection} disabled={selectedImages.length === 0} className="text-sm font-semibold text-primary disabled:opacity-30">Fatto {selectedImages.length > 0 && `(${selectedImages.length})`}</button>
            </div>
            <div className="flex-1 overflow-y-auto p-1">
              <div className="grid grid-cols-3 gap-1">
                {galleryImages.map((img) => {
                  const isSelected = selectedImages.includes(img.id);
                  return (
                    <button key={img.id} onClick={() => toggleImage(img.id)} className="relative aspect-square overflow-hidden">
                      <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition-transform duration-150 active:scale-95" />
                      <div className={`absolute inset-0 transition-colors duration-150 ${isSelected ? "bg-primary/20" : "bg-transparent"}`} />
                      <div className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-150 ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-background/80 bg-foreground/20"}`}>
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

      {/* Wardrobe Gallery */}
      <AnimatePresence>
        {wardrobeOpen && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed inset-0 z-50 flex flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <button onClick={() => setWardrobeOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Chiudi</button>
              <span className="text-sm font-semibold text-foreground">Il mio Armadio</span>
              <div className="w-10" />
            </div>
            <div className="flex-1 overflow-y-auto p-1">
              <div className="grid grid-cols-3 gap-1">
                {wardrobeImages.map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden">
                    <img src={img.src} alt={img.caption} className="h-full w-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-foreground/60 px-2 py-1">
                      <span className="text-xs text-background">{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit Card Sheet */}
      <AnimatePresence>
        {creditCardOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/40" onClick={() => setCreditCardOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-background px-6 pb-8 pt-4"
            >
              <div className="mb-4 flex justify-center">
                <div className="h-1 w-10 rounded-full bg-border" />
              </div>
              <h3 className="mb-6 text-center text-lg font-bold text-foreground">Carta di Credito</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Nome del titolare</label>
                  <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Mario Rossi" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Numero della carta</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Tipologia di carta</label>
                  <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">Seleziona...</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">American Express</option>
                    <option value="postepay">Postepay</option>
                  </select>
                </div>
                <button onClick={() => setCreditCardOpen(false)} className="w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                  Salva
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
