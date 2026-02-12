import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, ArrowLeft, Plane, Users, CalendarSync, Check } from "lucide-react";

const benefits = [
  {
    icon: Plane,
    title: 'Programma fedeltà "Pack and Go"',
    description: "Sconti esclusivi con i nostri partner: Ryanair, Trenitalia e molti altri.",
  },
  {
    icon: Users,
    title: "Community online",
    description: "Accedi alla community esclusiva per condividere outfit e consigli di viaggio.",
  },
  {
    icon: CalendarSync,
    title: "Sincronizzazione col calendario",
    description: "Sincronizza i tuoi viaggi col calendario per preparare la valigia in anticipo.",
  },
];

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4">
        <button onClick={() => navigate(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-input text-muted-foreground hover:bg-secondary">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold text-foreground">Premium</h1>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pb-10">
        {/* Crown hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500"
        >
          <Crown size={44} className="text-white" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">ClothesFriends Premium</h2>
          <p className="mt-2 text-muted-foreground text-sm">Sblocca tutte le funzionalità esclusive</p>
        </motion.div>

        {/* Price card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 w-full max-w-sm rounded-2xl border-2 border-red-500 bg-red-500/5 p-6 text-center">
          <p className="text-3xl font-bold text-foreground">€5,99<span className="text-base font-normal text-muted-foreground">/anno</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Solo <span className="font-semibold text-red-500">€0,50/mese</span></p>
        </motion.div>

        {/* Benefits */}
        <div className="w-full max-w-sm space-y-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div key={b.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex gap-4 rounded-xl border border-input p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                  <Icon size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{b.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 w-full max-w-sm rounded-xl bg-red-500 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Abbonati ora — €5,99/anno
        </motion.button>
      </main>
    </div>
  );
};

export default Premium;
