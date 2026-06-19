import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.GalleryPhoto.filter({ is_active: true }, "sort_order", 24)
      .then(setPhotos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || photos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 8) * 0.05 }}
          className="relative aspect-square rounded-[24px_8px_24px_8px] overflow-hidden border-2 border-border shadow-sm group"
        >
          <img
            src={photo.image_url}
            alt={photo.caption || "The Strawberry Shop dessert"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-body text-xs font-semibold">{photo.caption}</p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}