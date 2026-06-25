import { Link } from 'react-router';
import {
  CheckCircle2, Circle, Calendar, DollarSign, Clock, ChevronRight,
  Sparkles, TrendingUp, Bot, Send, Heart, Users, Camera, Car,
  Flower2, Gift, Gem, Bell, MapPin
} from 'lucide-react';
import { useState } from 'react';
import Navigation from './Navigation';
import IslamicPattern from './IslamicPattern';

export default function PlannerDashboard() {
  const [chatInput, setChatInput] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Book wedding hall', category: 'Venue', completed: true, dueDate: '2026-05-01', priority: 'high' },
    { id: 2, title: 'Finalize catering menu', category: 'Catering', completed: true, dueDate: '2026-05-10', priority: 'high' },
    { id: 3, title: 'Book photography package', category: 'Photography', completed: false, dueDate: '2026-05-25', priority: 'high' },
    { id: 4, title: 'Arrange gift tray items', category: 'Gifts', completed: false, dueDate: '2026-06-01', priority: 'medium' },
    { id: 5, title: 'Book Mehndi artist', category: 'Mehndi', completed: false, dueDate: '2026-06-15', priority: 'high' },
    { id: 6, title: 'Reserve luxury car', category: 'Transport', completed: false, dueDate: '2026-06-20', priority: 'medium' },
    { id: 7, title: 'Order wedding cards', category: 'Invitations', completed: false, dueDate: '2026-06-10', priority: 'medium' },
    { id: 8, title: 'Book Imam for Nikah', category: 'Religious', completed: false, dueDate: '2026-06-30', priority: 'high' },
    { id: 9, title: 'Confirm stage decoration', category: 'Decor', completed: false, dueDate: '2026-07-01', priority: 'medium' },
    { id: 10, title: 'Buy jewelry set', category: 'Jewelry', completed: false, dueDate: '2026-07-05', priority: 'medium' },
  ]);

  const weddingEvents = [
    { id: 1, name: 'Proposal', date: '2026-05-15', status: 'completed', progress: 100, icon: '💍' },
    { id: 2, name: 'Gift Exchange (Seer)', date: '2026-06-20', status: 'in-progress', progress: 65, icon: '🎁' },
    { id: 3, name: 'Mehndi Night', date: '2026-07-10', status: 'pending', progress: 20, icon: '🌿' },
    { id: 4, name: 'Groom Arrival', date: '2026-07-15', status: 'pending', progress: 10, icon: '👑' },
    { id: 5, name: 'Nikah Ceremony', date: '2026-07-15', status: 'pending', progress: 15, icon: '☪️' },
    { id: 6, name: 'Wedding Reception', date: '2026-07-16', status: 'pending', progress: 10, icon: '🎊' },
    { id: 7, name: 'Walima', date: '2026-07-17', status: 'pending', progress: 5, icon: '🍽️' },
  ];

  const budget = { total: 2500000, spent: 1450000, remaining: 1050000 };
  const budgetCategories = [
    { name: 'Venue', allocated: 400000, spent: 350000, icon: <Calendar className="w-4 h-4" /> },
    { name: 'Catering', allocated: 600000, spent: 480000, icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Photography', allocated: 100000, spent: 0, icon: <Camera className="w-4 h-4" /> },
    { name: 'Decor', allocated: 300000, spent: 200000, icon: <Heart className="w-4 h-4" /> },
    { name: 'Bridal', allocated: 250000, spent: 200000, icon: <Users className="w-4 h-4" /> },
    { name: 'Transport', allocated: 150000, spent: 0, icon: <Car className="w-4 h-4" /> },
  ];

  const bookings = [
    { id: 1, service: 'Royal Gardens Banquet Hall', category: 'Venue', date: '2026-07-16', status: 'confirmed', amount: 350000, icon: <Calendar className="w-5 h-5" /> },
    { id: 2, service: 'Gourmet Catering Services', category: 'Catering', date: '2026-07-16', status: 'confirmed', amount: 480000, icon: <Sparkles className="w-5 h-5" /> },
    { id: 3, service: 'Elegant Moments Photography', category: 'Photography', date: '2026-07-16', status: 'pending', amount: 85000, icon: <Camera className="w-5 h-5" /> },
    { id: 4, service: 'Zara Mehndi Designs', category: 'Mehndi', date: '2026-07-10', status: 'pending', amount: 25000, icon: <Flower2 className="w-5 h-5" /> },
    { id: 5, service: 'Regal Gift Decorators', category: 'Gifts', date: '2026-06-20', status: 'confirmed', amount: 65000, icon: <Gift className="w-5 h-5" /> },
  ];

  const aiMessages = [
    { from: 'ai', text: 'Assalamu Alaikum! 🌙 Your Nikah is in 65 days. You\'re making great progress!', time: '09:00' },
    { from: 'ai', text: 'Reminder: Book your Mehndi photographer soon — dates are filling up fast in July.', time: '09:01' },
    { from: 'user', text: 'Can you suggest Mehndi artists in Colombo under LKR 30,000?', time: '09:05' },
    { from: 'ai', text: 'Sure! Here are 3 top-rated artists: 1) Zara Designs (LKR 25K), 2) Henna Art Studio (LKR 28K), 3) Artistic Mehndi (LKR 30K). All verified! ✨', time: '09:06' },
  ];

  const overallProgress = Math.round(
    weddingEvents.reduce((sum, event) => sum + event.progress, 0) / weddingEvents.length
  );

  const completedTasks = tasks.filter((t) => t.completed).length;

  // Days remaining
  const weddingDate = new Date('2026-07-15');
  const today = new Date('2026-05-11');
  const daysRemaining = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl mb-1 text-green-deep">My Wedding Planner</h1>
              <p className="text-muted-foreground">Track, manage and celebrate every moment</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
                <Bell className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-700 font-medium">{daysRemaining} days to Nikah</span>
              </div>
              <Link to="/services/all" className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-green-deep px-5 py-2.5 rounded-xl transition-all shadow-sm">
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">Book Services</span>
              </Link>
            </div>
          </div>

          {/* Overall Progress Card */}
          <div className="bg-gradient-to-br from-green-deep to-green-soft text-ivory rounded-2xl p-8 mb-8 relative overflow-hidden">
            <IslamicPattern className="absolute inset-0 opacity-10 text-white" />
            <div className="relative z-10">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-gold" />
                    <h2 className="text-xl">Wedding Planning Progress</h2>
                  </div>
                  <div className="flex items-end gap-3 mb-4">
                    <div className="text-6xl font-light text-gold">{overallProgress}%</div>
                    <div className="text-ivory/70 mb-2">Complete</div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div
                      className="bg-gold rounded-full h-3 transition-all duration-700"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <p className="text-ivory/70 text-sm">You're making great progress! Keep going. ✨</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-3xl font-light text-gold">{completedTasks}/{tasks.length}</div>
                    <div className="text-xs text-ivory/70 mt-1">Tasks Done</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-3xl font-light text-gold">{bookings.filter(b => b.status === 'confirmed').length}</div>
                    <div className="text-xs text-ivory/70 mt-1">Bookings Confirmed</div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-light text-gold">LKR {(budget.spent / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-ivory/70 mt-1">Spent</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-light text-green-200">LKR {(budget.remaining / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-ivory/70 mt-1">Remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Timeline */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl mb-6 text-green-deep flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-gold" />
                  Wedding Timeline
                </h2>
                <div className="space-y-3">
                  {weddingEvents.map((event, index) => (
                    <div key={event.id} className="relative flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${
                          event.status === 'completed' ? 'bg-gold/10 border-gold' :
                          event.status === 'in-progress' ? 'bg-green-soft/10 border-green-soft' :
                          'bg-beige border-border'
                        }`}>
                          {event.icon}
                        </div>
                        {index < weddingEvents.length - 1 && (
                          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-green-deep">{event.name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              event.status === 'completed' ? 'bg-gold/15 text-gold' :
                              event.status === 'in-progress' ? 'bg-green-soft/15 text-green-soft' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {event.status === 'completed' ? 'Completed' : event.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-muted rounded-full h-1.5">
                            <div
                              className="bg-gold rounded-full h-1.5 transition-all"
                              style={{ width: `${event.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{event.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Status */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-green-deep">Booking Status</h2>
                  <Link to="/services/all" className="text-gold hover:text-green-deep transition-colors flex items-center gap-1.5 text-sm border border-gold/30 px-4 py-2 rounded-xl hover:bg-gold/5">
                    Browse Services <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 bg-beige rounded-xl hover:bg-gold/5 transition-colors">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        booking.status === 'confirmed' ? 'bg-gold/15 text-gold' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {booking.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground truncate">{booking.service}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span>{booking.category}</span>
                          <span>•</span>
                          <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-medium text-green-deep">LKR {booking.amount.toLocaleString()}</div>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-gold/15 text-gold' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Checklist */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-green-deep flex items-center gap-3">
                    <Clock className="w-6 h-6 text-gold" />
                    Task Checklist
                  </h2>
                  <span className="text-sm text-muted-foreground bg-beige px-3 py-1.5 rounded-xl">{completedTasks}/{tasks.length} done</span>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-gold/5 border-gold/20'
                          : 'bg-white hover:bg-beige border-border'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className={task.completed ? 'line-through text-muted-foreground text-sm' : 'text-foreground text-sm'}>
                          {task.title}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground bg-beige px-2 py-0.5 rounded-md">{task.category}</span>
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          {task.priority === 'high' && !task.completed && (
                            <span className="text-xs text-red-500">Urgent</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-gold hover:text-gold transition-colors text-sm">
                  + Add New Task
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">

              {/* Budget Tracker */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl mb-5 text-green-deep flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gold" />
                  Budget Tracker
                </h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Budget</span>
                    <span className="font-medium text-green-deep">LKR {budget.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Spent</span>
                    <span className="font-medium text-gold">LKR {budget.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="font-medium text-green-soft">LKR {budget.remaining.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 mb-5">
                  <div
                    className="bg-gradient-to-r from-gold to-amber-500 rounded-full h-3 transition-all"
                    style={{ width: `${(budget.spent / budget.total) * 100}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {budgetCategories.map((cat, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-gold">{cat.icon}</span>
                          {cat.name}
                        </div>
                        <span className="text-xs text-foreground">LKR {cat.spent.toLocaleString()} / {cat.allocated.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-gold rounded-full h-1.5"
                          style={{ width: `${(cat.spent / cat.allocated) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-beige rounded-xl p-4 flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-green-soft flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">You're spending within budget. Excellent planning!</p>
                </div>
              </div>

              {/* AI Wedding Assistant */}
              <div className="bg-gradient-to-br from-green-deep to-green-soft rounded-2xl p-6 text-ivory relative overflow-hidden">
                <IslamicPattern className="absolute inset-0 opacity-8 text-white" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg">AI Wedding Assistant</h2>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-ivory/70">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {aiMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`rounded-xl p-3 ${
                          msg.from === 'ai'
                            ? 'bg-white/10 backdrop-blur-sm rounded-tl-none'
                            : 'bg-gold/30 backdrop-blur-sm rounded-tr-none ml-6'
                        }`}
                      >
                        <p className="text-xs text-ivory/90 leading-relaxed">{msg.text}</p>
                        <span className="text-xs text-ivory/40 mt-1 block">{msg.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about your wedding..."
                      className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 text-xs text-ivory placeholder-ivory/40 border-0 outline-none"
                    />
                    <button className="bg-gold hover:bg-gold/90 px-3 py-2.5 rounded-xl transition-all">
                      <Send className="w-4 h-4 text-green-deep" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl mb-4 text-green-deep">Quick Access</h2>
                <div className="space-y-2">
                  {[
                    { icon: <Gift className="w-4 h-4" />, name: 'Gift Exchange Planner', path: '/gift-exchange', color: 'text-amber-600' },
                    { icon: <Flower2 className="w-4 h-4" />, name: 'Mehndi Night Planner', path: '/mehndi', color: 'text-green-600' },
                    { icon: <Camera className="w-4 h-4" />, name: 'Browse Photography', path: '/services/photography', color: 'text-purple-600' },
                    { icon: <Car className="w-4 h-4" />, name: 'Book Luxury Cars', path: '/services/cars', color: 'text-blue-600' },
                    { icon: <Gem className="w-4 h-4" />, name: 'Jewelry Planning', path: '/services/jewelry', color: 'text-gold' },
                    { icon: <MapPin className="w-4 h-4" />, name: 'Find Nikah Imam', path: '/services/religious', color: 'text-green-deep' },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center gap-3 p-3 bg-beige hover:bg-gold/10 rounded-xl transition-colors"
                    >
                      <span className={link.color}>{link.icon}</span>
                      <span className="text-sm text-foreground">{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
