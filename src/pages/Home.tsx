import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Image, Video, Send } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = (location.state as { username?: string })?.username || "Utente";
  const [message, setMessage] = useState("");

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
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Clicca per parlare
              </span>
              <span className="text-xs text-muted-foreground/60">
                con me
              </span>
            </div>
          </button>

          {/* Decorative rings */}
          <div className="pointer-events-none absolute inset-0 -m-4 rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute inset-0 -m-10 rounded-full border border-primary/5" />
        </motion.div>
      </main>

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
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30 hover:opacity-90 active:scale-95"
            aria-label="Invia"
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
