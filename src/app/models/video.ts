export interface Video {
  titulo: string;
  categoria: string;
  colorBadge: string;       // Ej: 'text-tertiary', 'text-secondary'
  imagenPortada: string;    // Ruta al asset de la miniatura
  linkVideo: string;        // URL de YouTube, TikTok, Drive, etc.
  claseBento: string;   
  linkExterno: string;   // 👈 ¡Acá va el link real de Instagram/TikTok!    // El tamaño del bloque en la grilla de Tailwind
}