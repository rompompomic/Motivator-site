import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function MotivationTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [motivationLevel, setMotivationLevel] = useState(50);

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('motivationGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    
    const savedLevel = localStorage.getItem('motivationLevel');
    if (savedLevel) {
      setMotivationLevel(parseInt(savedLevel));
    }
  }, []);

  useEffect(() => {
    // Save goals to localStorage
    localStorage.setItem('motivationGoals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    // Save motivation level to localStorage
    localStorage.setItem('motivationLevel', motivationLevel.toString());
  }, [motivationLevel]);

  const addGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        text: newGoal,
        completed: false,
        createdAt: new Date()
      };
      setGoals(prev => [goal, ...prev]);
      setNewGoal("");
      // Boost motivation when adding a goal
      setMotivationLevel(prev => Math.min(100, prev + 5));
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const wasCompleted = goal.completed;
        const newCompleted = !goal.completed;
        
        // Update motivation based on completion
        if (!wasCompleted && newCompleted) {
          setMotivationLevel(prev => Math.min(100, prev + 10));
        } else if (wasCompleted && !newCompleted) {
          setMotivationLevel(prev => Math.max(0, prev - 5));
        }
        
        return { ...goal, completed: newCompleted };
      }
      return goal;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 glitch-text neon-glow"
          data-text="ТРЕКЕР МОТИВАЦИИ"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ТРЕКЕР МОТИВАЦИИ
        </motion.h2>
        
        <motion.div 
          className="chat-container bg-dark-secondary bg-opacity-90 rounded-lg p-8 space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Motivation Level Display */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-rajdhani font-bold text-acid">Уровень мотивации</h3>
            <div className="relative w-full h-4 bg-dark-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-matrix via-acid to-emerald-deep"
                initial={{ width: 0 }}
                animate={{ width: `${motivationLevel}%` }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-white drop-shadow">
                  {motivationLevel}%
                </span>
              </div>
            </div>
            <p className="text-sm opacity-70">
              {motivationLevel >= 80 ? "🔥 Ты на огне!" : 
               motivationLevel >= 60 ? "💪 Хорошая форма!" :
               motivationLevel >= 40 ? "⚡ Набираешь ход!" :
               motivationLevel >= 20 ? "🌱 Начинаешь путь!" : "💤 Время проснуться!"}
            </p>
          </div>

          {/* Goal Progress */}
          {totalGoals > 0 && (
            <div className="text-center">
              <p className="text-lg font-rajdhani">
                <span className="text-acid font-bold">{completedGoals}</span>
                <span className="opacity-60"> из </span>
                <span className="text-matrix font-bold">{totalGoals}</span>
                <span className="opacity-60"> целей выполнено</span>
              </p>
            </div>
          )}

          {/* Add New Goal */}
          <div className="space-y-4">
            <h3 className="text-xl font-rajdhani font-bold text-center">Добавить цель</h3>
            <div className="flex space-x-3">
              <Input 
                type="text" 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                placeholder="Что ты хочешь сделать сегодня?"
                className="flex-1 bg-dark-bg border-matrix text-white placeholder:text-gray-500 focus:border-acid"
              />
              <button 
                onClick={addGoal}
                className="btn-3d text-dark-bg px-6 py-3 font-rajdhani font-bold"
                disabled={!newGoal.trim()}
              >
                Добавить
              </button>
            </div>
          </div>

          {/* Goals List */}
          {goals.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-rajdhani font-bold text-center">Твои цели</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {goals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      className={`message-bubble p-4 rounded flex items-center justify-between ${
                        goal.completed ? 'opacity-60 line-through' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => toggleGoal(goal.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            goal.completed 
                              ? 'bg-matrix border-matrix text-dark-bg' 
                              : 'border-matrix hover:bg-matrix hover:text-dark-bg'
                          }`}
                        >
                          {goal.completed && '✓'}
                        </button>
                        <span className={`flex-1 text-stroke ${goal.completed ? 'text-gray-400' : 'text-white'}`}>
                          {goal.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-400 hover:text-red-300 ml-3 text-sm"
                      >
                        🗑️
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {goals.length === 0 && (
            <div className="text-center py-8 opacity-60">
              <p className="text-lg">Начни с постановки первой цели!</p>
              <p className="text-sm mt-2">Даже маленький шаг — это уже прогресс</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}