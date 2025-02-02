import { useState } from 'react';
import './index.css';
import batman from './assets/batman.jpg';
import { Toaster, toast } from 'react-hot-toast';
import { Heart, Stars, PartyPopper, Calendar, Coffee } from 'lucide-react';
import NoButton from './Nobutton';
import {axiosInstance} from './lib/axios';

export default function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    flower: '',
    date: '',
  });


  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { flower, date } = form;
  
    if (!flower || !date) {
      toast.error("Please fill in both fields! 😅");
      return;
    }
  
    setLoading(true);
    
    axiosInstance
      .post('/submit', { flower, date })
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 to-red-300 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl bg-white/30 rounded-xl p-8 shadow-xl backdrop-blur-sm text-center">
          <div className="flex justify-center mb-6">
            <PartyPopper className="w-16 h-16 text-pink-600 animate-bounce" />
          </div>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDlpYzBwY2t0M2t1ZWsyOWNvOWF1NnBxbXgydWx5YnBxZm9mOHdvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif"
            alt="Excited"
            className="w-64 h-64 object-cover rounded-full mx-auto mb-6 border-4 border-pink-400"
          />
          <h2 className="text-4xl font-dancing text-pink-700 mb-4">
            It's a Date! 🎉
          </h2>
          <div className="space-y-4 text-lg text-pink-800">
            <p className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              See you on {new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}!
            </p>
            <p className="flex items-center justify-center gap-2">
              <Coffee className="w-5 h-5" />
              I'll bring the {form.flower}s and you'll bring yourself and your cute smile! 
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <Stars className="w-6 h-6 text-yellow-500 animate-bounce" />
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
          </div>  
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-red-300 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl bg-white/30 rounded-xl p-8 shadow-xl backdrop-blur-sm">
        {!response ? (
          <>
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmJyYXZreHRuZ2l2bDZhNnd6Zmlhc2d0MDRyYWxmOXVyMzVqZHZ4NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IU5ApmC4e6wEw/giphy.gif"
              alt="Cute puppies"
              className="w-1/2 rounded-lg mb-6 mx-auto"
            />
            <p className="text-2xl md:text-3xl font-comic text-center text-pink-700 mb-6">
              Hey there, ehsas! 😍<br />
              I've got a very important question to ask...
            </p>
            <div className="space-y-6">
              <p className="text-4xl md:text-5xl font-dancing text-red-500 animate-pulse">
                Will you be my Valentine? 🌹
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setResponse(true)}
                  className="bg-green-500 hover:bg-green-600 text-white text-3xl px-8 py-4 rounded-full transition-all transform hover:scale-110"
                >
                  YES! 🥰
                </button>
                <NoButton />
              </div>
            </div>
          </>
        ) : (
          <div className="animate-wiggle">
            <img src={batman} alt="Celebration" className="mx-auto mb-6 rounded-lg w-1/2" />
            <p className="text-5xl md:text-3xl font-dancing text-purple-600 text-center">
              YAY!!! 🎉<br />
              For my dementia, we'll have to create a long term memory of you.✨<br />
            </p>
            <form className="mt-6 bg-white/30 p-6 rounded-xl shadow-md backdrop-blur-md w-full max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-lg font-comic text-pink-700 mb-2">Favourite flower? 🌸</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80 placeholder:text-pink-400"
                  placeholder="e.g. Roses"
                  name="flower"
                  value={form.flower}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
    <label className="block text-lg font-comic text-pink-700 mb-2">When are you free? 📅</label>
    <input
      type="date"
      className="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80 text-pink-700"
      name="date"
      value={form.date}
      onChange={handleChange}
      min={minDate} // Add this line
    />
  </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 rounded-lg transition-all transform hover:scale-105 relative overflow-hidden"
              >
                {loading ? (
                  <img
                    src="https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"
                    alt="Loading..."
                    className="absolute left-0 top-0 w-12 animate-slide"
                  />
                ) : (
                  "Submit 💌"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="mt-8 text-xl font-comic text-pink-800 text-center">
        <p>P.S. I promise good food and great company! 🍝🥂</p>
      </div>
      <Toaster />
    </div>
  );
}