import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  UserRound,
  HelpCircle,
  Sparkles,
  Dumbbell,
  Shirt,
  Briefcase,
  Skull,
  Clock,
  Flower2,
  Guitar,
  Heart,
  Footprints,
  Flame,
  GraduationCap,
  Cpu,
  Crown,
  Star,
  Minus,
} from "lucide-react";

const genderOptions = [
  { id: "donna", label: "Donna", icon: UserRound },
  { id: "uomo", label: "Uomo", icon: User },
  { id: "altro", label: "Preferisco non specificarlo", icon: HelpCircle },
];

const styleOptions = [
  { id: "elegante", label: "Elegante", icon: Sparkles },
  { id: "sportivo", label: "Sportivo", icon: Dumbbell },
  { id: "casual", label: "Casual", icon: Shirt },
  { id: "formale", label: "Formale", icon: Briefcase },
  { id: "gotico", label: "Gotico", icon: Skull },
  { id: "vintage", label: "Vintage", icon: Clock },
  { id: "hippie", label: "Hippie", icon: Flower2 },
  { id: "rock", label: "Rock", icon: Guitar },
  { id: "emo", label: "Emo", icon: Heart },
  { id: "street", label: "Street", icon: Footprints },
  { id: "punk", label: "Punk", icon: Flame },
  { id: "dandy", label: "Dandy", icon: GraduationCap },
  { id: "techwear", label: "Techwear", icon: Cpu },
  { id: "oldmoney", label: "Old money", icon: Crown },
  { id: "y2k", label: "Y2K", icon: Star },
  { id: "minimal", label: "Minimal", icon: Minus },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = (location.state as { username?: string })?.username || "Utente";

  const [step, setStep] = useState<"gender" | "style">("gender");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenderSelect = (id: string) => {
    setSelectedGender(id);
    setTimeout(() => setStep("style"), 400);
  };

  const handleComplete = () => {
    navigate("/home", { state: { username } });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Parlaci di te.
          </h1>
        </div>

        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          <div className="h-1.5 w-8 rounded-full bg-primary" />
          <div className={`h-1.5 w-8 rounded-full ${step === "style" ? "bg-primary" : "bg-border"}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === "gender" && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-center text-sm text-muted-foreground">Sono:</p>
              <div className="flex flex-col gap-3">
                {genderOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedGender === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleGenderSelect(opt.id)}
                      className={`flex items-center gap-4 rounded-xl border px-4 py-4 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-input bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon size={20} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === "style" && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-center text-sm text-muted-foreground">Il mio stile è:</p>
              <div className="grid grid-cols-4 gap-3">
                {styleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedStyles.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleStyle(opt.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-input bg-background text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon size={20} className={isSelected ? "text-primary" : ""} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleComplete}
                disabled={selectedStyles.length === 0}
                className="mt-8 w-full rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                Continua
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
