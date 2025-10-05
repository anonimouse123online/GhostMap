// ✅ src/hooks/usePins.js — NO JSX allowed!
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function usePins() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      // Only select known columns (optional but safe)
      const { data, error } = await supabase
        .from('pins')
        .select('id, title, description, government_unit, lat, lng');
      if (error) {
        console.error('Error fetching pins:', error);
      } else {
        setPins(data);
      }
    };
    fetchPins();
  }, []);

  const addPin = async (newPin) => {
    // ✅ Only include allowed fields — ignore 'sources' if present
    const { title, description, government_unit, lat, lng } = newPin;

    const pinToInsert = {
      title,
      description,
      government_unit,
      lat,
      lng
      // ⚠️ Do NOT include 'sources' here — it's not in the pins table
    };

    const { data, error } = await supabase
      .from('pins')
      .insert([pinToInsert])
      .select()
      .single();

    if (error) throw error;

    setPins(prev => [...prev, data]);
    return data;
  };

  return { pins, addPin };
}