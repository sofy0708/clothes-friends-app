import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    navigate("/profile-setup", { state: { username: username.trim() } });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Clothes
            <span className="text-primary">Friends</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Crea il tuo profilo
          </p>
        </div>

        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          <div className="h-1.5 w-8 rounded-full bg-primary" />
          <div className="h-1.5 w-8 rounded-full bg-border" />
        </div>

        <form onSubmit={handleComplete} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Nome Utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-input bg-background py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="number"
              placeholder="Età"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={13}
              max={99}
              className="w-full rounded-xl border border-input bg-background py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Avanti
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Hai già un account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-semibold text-primary hover:underline"
          >
            Accedi
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
