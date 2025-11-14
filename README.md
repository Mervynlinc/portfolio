# 3D Portfolio

A modern, interactive 3D portfolio website built with React, Three.js, and Vite. Features immersive 3D graphics, smooth animations, and a responsive design to showcase projects and skills.

## ✨ Features

- 🎨 **3D Graphics** - Interactive 3D models using Three.js via React Three Fiber
- 🌟 **Stunning Animations** - Smooth transitions with Framer Motion
- 📱 **Responsive Design** - Optimized for all devices with Tailwind CSS
- 📧 **Contact Form** - Integrated email functionality using EmailJS
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and production builds
- 🎯 **Modern UI** - Clean, professional design with animated timelines and parallax effects

## 🛠️ Technologies

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **3D Library**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Email Service**: EmailJS
- **UI Components**: React Vertical Timeline, React Parallax Tilt

## 📋 Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mervynlinc/3dPortfolio.git
   cd 3dPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or the next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
3dPortfolio/
├── public/              # Static assets (3D models, textures)
│   ├── desktop_pc/     # Desktop computer 3D model
│   └── planet/         # Planet/Earth 3D model
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── canvas/    # 3D canvas components (Earth, Computers, Stars, Ball)
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Tech.jsx
│   │   └── Works.jsx
│   ├── constants/      # Constants and configuration data
│   ├── hoc/           # Higher-order components
│   ├── utils/         # Utility functions (animations, motion)
│   ├── App.jsx        # Main app component with routing
│   ├── Home.jsx       # Home page layout
│   └── main.jsx       # App entry point
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration
```

## 🎮 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Customization

### Changing 3D Models
Place your GLTF models in the `public/` folder and update the paths in the canvas components (`src/components/canvas/`).

### Updating Content
Edit the constants file at `src/constants/index.js` to update:
- Technologies
- Projects
- Experience timeline
- Contact information

### Styling
Modify `tailwind.config.js` and `src/index.css` to customize colors, fonts, and other design elements.

## 📧 EmailJS Setup

To enable the contact form:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the credentials in `src/components/Contact.jsx`

## 🐛 Troubleshooting

**Port already in use**: Vite will automatically try the next available port (5174, 5175, etc.)

**3D models not loading**: Ensure GLTF files and textures are in the `public/` folder with correct paths

**Favicon not updating**: Clear browser cache or hard refresh with `Ctrl + F5`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Mervyn**

- GitHub: [@Mervynlinc](https://github.com/Mervynlinc)

---

⭐ Star this repo if you find it helpful!