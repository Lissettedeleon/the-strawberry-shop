// Site content, stored with the code (no database).
// Edit the JSON files next to this one to change the menu, reviews or the
// announcement bar. Photos live in public/photos.
import menuItemsJson from "./menu-items.json";
import reviewsJson from "./reviews.json";
import announcementsJson from "./announcements.json";

const photoUrl = (photo) => (photo ? `/${photo}` : null);

export const menuItems = menuItemsJson
  .map((item) => ({ ...item, id: item.name, image_url: photoUrl(item.photo) }))
  .sort((a, b) => a.sort_order - b.sort_order);

export const reviews = [...reviewsJson].sort((a, b) => a.sort_order - b.sort_order);

export const activeAnnouncement = announcementsJson.find((a) => a.is_active) || null;
