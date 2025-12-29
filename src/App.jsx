import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Import jurus rahasia geser-geser

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [cerita, setCerita] = useState('');

  // Link suara POP
  const soundUrl = "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3";

  const mainkanSuara = () => {
    const audio = new Audio(soundUrl);
    audio.play().catch(e => console.log("Gagal memutar suara:", e));
  };

  const handleSihir = () => {
    if (!cerita) return alert("Tulis ceritanya dulu dong!");
    
    mainkanSuara();
    setLoading(true);

    setTimeout(() => {
      const newImages = Array(4).fill(0).map((_, i) => ({
        id: i,
        url: `https://picsum.photos/400/300?random=${Date.now() + i}`,
        text: "Halo!"
      }));
      setImages(newImages);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-yellow-100 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* JUDUL */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 drop-shadow-md animate-bounce">
          ✨ Komik Ajaib ✨
        </h1>
        <p className="text-gray-600 text-lg">Tulis ceritamu, biar sihir yang menggambar!</p>

        {/* INPUT AREA */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-blue-200">
          <textarea
            className="w-full p-4 text-xl border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition"
            rows="3"
            placeholder="Contoh: Kucing terbang naik sapu lidi di malam hari..."
            value={cerita}
            onChange={(e) => setCerita(e.target.value)}
          />
          <button
            onClick={handleSihir}
            disabled={loading}
            className={`mt-4 w-full py-4 rounded-xl text-2xl font-bold text-white transition transform active:scale-95 ${
              loading ? 'bg-gray-400 cursor-wait' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 shadow-lg'
            }`}
          >
            {loading ? 'Sedang Memanggil Peri... 🧚‍♀️' : '🪄 Sihir Jadi Gambar!'}
          </button>
        </div>

        {/* HASIL GAMBAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative group bg-white p-2 rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
              {/* Gambar */}
              <img 
                src={img.url} 
                alt="Hasil Ajaib" 
                className="w-full h-64 object-cover rounded-xl pointer-events-none" // pointer-events-none biar gambar gak ke-drag
              />
              
              {/* Balon Kata (Sekarang Pakai Motion) */}
              <motion.div 
                drag // <--- INI KUNCINYA!
                dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200 }} // Batas geser (opsional)
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileTap={{ scale: 0.9, cursor: 'grabbing' }}
                className="absolute top-4 left-4 bg-white px-3 py-2 rounded-tl-none rounded-2xl border-2 border-black shadow-md"
              >
                <p className="text-sm font-bold text-black select-none">💬 {img.text}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Pesan Kosong */}
        {images.length === 0 && !loading && (
          <div className="mt-12 opacity-50">
            <p className="text-6xl">🎨</p>
            <p>Belum ada gambar. Yuk tulis sesuatu!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;