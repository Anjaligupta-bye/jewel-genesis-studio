# Jewel Genesis Studio

# PROJECT: SAAVY CO. — IMMERSIVE 3D LUXURY JEWELLERY WEBSITE

Act as a world-class creative director, luxury website designer, senior React developer, 3D web artist and motion designer.

Build a complete, production-quality, visually extraordinary website for **SAAVY CO.**, a jewellery design, CAD and manufacturing company that transforms jewellery concepts into finished products for jewellery brands, designers and manufacturers worldwide.

This must NOT look like a generic jewellery ecommerce template. Create an immersive, cinematic, interactive digital experience inspired by luxury jewellery campaigns, high-end product CGI, editorial art direction and modern interactive 3D websites.

The website should feel elegant, innovative, artistic, premium and technically advanced.

## 1. BRAND IDENTITY

Brand name: SAAVY CO.

Brand category: Global Jewellery Design • CAD • Manufacturing

Main tagline: From Your Idea to Finished Jewellery.

Supporting tagline: Designed in India. Built for the World.

Brand positioning:
SAAVY CO. is a jewellery product development partner that takes ideas from initial concepts through jewellery CAD, realistic rendering, prototyping and manufacturing to final quality control.

Target audience:
- Jewellery brands
- Jewellery designers
- Jewellery manufacturers
- Businesses looking for CAD design and jewellery production

Brand personality:
Luxury, precision, creativity, craftsmanship, innovation and international quality.

## 2. DESIGN DIRECTION

Create a premium dark luxury visual identity.

Colour palette:
- Deep Obsidian: #080808
- Charcoal: #141311
- Champagne Gold: #D6B477
- Warm Ivory: #F5F0E7
- Muted Bronze: #806541

Use champagne gold as an accent, not everywhere. Maintain contrast, sophistication and generous negative space.

Typography:
- Use an elegant editorial serif for large headings.
- Use a clean modern sans-serif for body text and navigation.
- Make headings oversized, carefully spaced and editorial.
- Keep body text readable and concise.

Use refined borders, subtle metallic gradients, soft glows, glass-like surfaces only where appropriate, cinematic shadows and high-quality imagery.

Avoid generic purple gradients, excessive glowing buttons, cartoonish graphics, random stock images, excessive rounded cards and cluttered layouts.

## 3. WEBSITE STRUCTURE — EXACTLY FOUR PAGES

Create exactly these four main pages:

1. Home
2. Services
3. Our Projects
4. Contact

Use a consistent responsive navigation system with smooth page transitions. Do not add extra main pages.

### PAGE 1: HOME — THE CINEMATIC EXPERIENCE

The homepage is the most important part of the website.

#### A. Full-screen cinematic hero video

Use the actual flower-to-ring video that I upload as the homepage background video.

The video shows a glowing translucent golden flower, golden particles, a floating diamond and a transformation into a finished gold solitaire ring.

Implementation requirements:
- Use my uploaded video as the actual video asset, not an AI-generated replacement.
- Display it as a full-viewport hero background with object-fit: cover.
- Keep the jewellery visible and avoid cropping the main subject.
- Add a subtle dark overlay so the text remains readable.
- Use autoplay, muted, playsInline and loop.
- If autoplay fails, display an elegant poster frame.
- Provide a graceful fallback if the video file is unavailable.
- Optimise video delivery and loading for desktop and mobile.
- Do not put large text directly over the most important part of the ring.
- Keep the video cinematic, clean and uninterrupted.

Hero layout:

Small eyebrow:
GLOBAL JEWELLERY DESIGN • CAD • MANUFACTURING

Main headline:
FROM IMAGINATION
TO CREATION.

Supporting text:
We transform jewellery concepts into precision-designed, beautifully crafted finished products.

Primary CTA:
START YOUR PROJECT

Secondary CTA:
EXPLORE OUR SERVICES

Add a subtle animated scroll indicator at the bottom.

The hero should feel like the opening scene of a premium international jewellery campaign.

#### B. Interactive 3D jewellery section

After the hero, create an immersive 3D jewellery experience.

Use React Three Fiber and Three.js for real-time 3D rendering.

Requirements:
- A central floating jewellery ring model with realistic metallic gold material.
- Slow, elegant rotation with subtle lighting changes.
- A dark studio environment and champagne-gold rim lighting.
- Smooth camera movement controlled by scroll progress.
- Subtle parallax and depth.
- Interactive mouse movement on desktop, with reduced interaction on mobile.
- Optional drag-to-rotate interaction where it works reliably.
- Soft shadows and realistic reflections where performance permits.

Support an actual GLB/GLTF jewellery model if provided. Use a graceful designed fallback if no model is available.

Do not pretend that a flat image is a real interactive 3D model. The actual 3D scene must be rendered through Three.js.

#### C. Scroll-driven storytelling

Build a cinematic scroll sequence with three visual stages:

STAGE 1 — THE IDEA
Headline: Every Masterpiece Begins With an Idea.
Visual: Elegant abstract golden curves and a delicate jewellery concept emerging from darkness.

STAGE 2 — THE DESIGN
Headline: Precision in Every Detail.
Visual: A transition to a jewellery CAD wireframe, technical geometry and precise design details.

STAGE 3 — THE CREATION
Headline: Crafted to Become Reality.
Visual: The wireframe transitions into a polished, realistic gold jewellery model.

Use scroll progress to control the visual transitions. The scene should feel connected, as if the visitor is travelling through the jewellery creation process.

Use a pinned or sticky 3D canvas only for this storytelling section, not for the entire website. Ensure normal scrolling resumes naturally.

#### D. About SAAVY CO.

Section heading:
MORE THAN MANUFACTURING. A CREATIVE PARTNER.

Describe SAAVY CO. as a partner for jewellery businesses, combining design thinking, CAD precision, craftsmanship and manufacturing expertise.

Use a sophisticated split layout, refined imagery and subtle reveal animations.

#### E. Jewellery creation process

Display a visually connected process timeline:

01 — BRIEF
Understanding the idea and project requirements.

02 — CAD DESIGN
Transforming the concept into a precise 3D model.

03 — RENDER
Presenting realistic jewellery visuals.

04 — PROTOTYPE
Preparing the design for physical production.

05 — MANUFACTURING
Producing jewellery in the agreed material and specifications.

06 — QC & DISPATCH
Quality checks and final delivery preparation.

Animate the timeline and reveal each stage as the user scrolls.

#### F. Homepage final CTA

Headline:
HAVE AN IDEA WORTH CREATING?

Text:
Let’s transform your jewellery concept into something exceptional.

Button:
START YOUR PROJECT

Use a beautiful dark-to-gold transition, a subtle background particle effect and elegant typography.

### PAGE 2: SERVICES

Create a premium editorial Services page with large typography, carefully selected jewellery imagery and interactive hover details.

Include these services:

1. JEWELLERY CAD DESIGN
Precise 3D jewellery modelling for production-ready designs.

2. 3D RENDERING & VISUALISATION
High-quality jewellery renders for design approval and presentations.

3. PROTOTYPING
Turning approved digital designs into physical prototypes.

4. JEWELLERY MANUFACTURING
Manufacturing support for agreed designs, materials and specifications.

5. QUALITY CONTROL & DISPATCH
Inspection and preparation for final delivery.

Mention relevant materials where appropriate:
925 Silver • CZ • Lab-grown Diamonds • Gold

Mention design tools only as capabilities to confirm or edit:
Rhino • Matrix • JewelCAD • DesignGold • ZBrush

Do not invent certifications, manufacturing capacities, client names or performance claims.

Design interactions:
- Image reveal on hover.
- Elegant gold line animations.
- Slight image parallax.
- Smooth section entrances.
- Clear service descriptions and enquiry CTAs.

Keep all interactions accessible to touch users.

### PAGE 3: OUR PROJECTS

Create a sophisticated jewellery portfolio showcasing project work.

Use a premium editorial gallery with a combination of large featured projects and smaller supporting images.

Suggested categories:
- Rings
- Earrings
- Jewellery CAD
- 3D Renders
- Finished Jewellery

Requirements:
- Use visually consistent, high-quality jewellery imagery.
- Use different relevant images for different projects.
- Never repeat the same image across the entire portfolio.
- Add category filtering and tasteful hover interactions.
- Use smooth image reveals and subtle transitions.
- Open project details in an elegant modal or overlay when clicked, without adding another main navigation page.

Use placeholder project names only when real project information has not been provided. Clearly label demonstration content as sample work until actual projects are supplied.

Do not fabricate client names, testimonials or confidential project claims.

Include a CTA:
HAVE A PROJECT IN MIND?
LET’S CREATE IT TOGETHER.

### PAGE 4: CONTACT

Build a premium contact page with a clean, functional project enquiry form.

Heading:
LET’S START SOMETHING EXCEPTIONAL.

Supporting text:
Tell us about your jewellery idea, design requirements or manufacturing project.

Form fields:
- Full Name
- Company Name
- Email Address
- Phone Number (optional)
- Service Required
- Project Description
- Material Preference (optional)

Service options:
CAD Design, 3D Rendering, Prototyping, Manufacturing, Other.

Include:
- Required-field validation.
- Email validation.
- Clear success and error states.
- Accessible form labels.
- A submit button with a subtle loading animation.

Do not display a fake success message when the form has not actually been submitted.

Prepare the form for a real backend or form service, but do not claim submissions are stored or delivered unless that integration is implemented.

For contact details, use clearly editable placeholders until real company details are supplied.

## 4. ANIMATION SYSTEM

Animations are a major part of the experience. Make them smooth, deliberate and premium.

Use:
- Framer Motion for entrances, hover states, page transitions and shared UI motion.
- GSAP with ScrollTrigger for complex scroll-linked sequences and pinned sections.
- React Three Fiber and Three.js for actual interactive 3D scenes.
- CSS transforms and opacity for lightweight effects.
- A restrained cursor-follow effect on desktop only, if it does not interfere with usability.

Required animations:
1. Cinematic hero video entrance.
2. Headline reveal with staggered words or lines.
3. Smooth scrolling between sections.
4. Scroll-triggered image reveals.
5. Pinned 3D storytelling sequence.
6. Subtle 3D object rotation and parallax.
7. Gold line drawing and timeline progression.
8. Elegant project gallery hover animations.
9. Smooth page transitions between the four routes.
10. Refined CTA and navigation hover states.

Animation principles:
- Use smooth easing and purposeful timing.
- Avoid excessive bounce and unnecessary movement.
- Avoid animations that block scrolling.
- Respect prefers-reduced-motion.
- Make mobile animations lighter.
- Ensure the page remains usable when animation libraries or WebGL fail.

## 5. NAVIGATION AND USER EXPERIENCE

Create a refined navigation bar with the SAAVY CO. wordmark.

Navigation:
HOME
SERVICES
OUR PROJECTS
CONTACT

The navbar should be transparent over the hero and transition to a darker solid background as the user scrolls.

Include a clear START YOUR PROJECT CTA.

Use working React Router links. All four pages must be reachable directly by URL and refresh correctly.

Add a refined footer with the brand name, page links and editable contact placeholders.

## 6. TECHNICAL STACK

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- GSAP and ScrollTrigger
- Three.js
- React Three Fiber
- @react-three/drei
- Lucide React for icons

Organise the project into reusable components and maintainable files.

Suggested components:
- Navbar
- HeroVideo
- ScrollIndicator
- JewelleryScene
- ScrollStory
- AboutSection
- ProcessTimeline
- ServicesSection
- ProjectGallery
- ContactForm
- Footer

Use reusable components for buttons, headings, image reveals and section layouts.

Do not place the entire application in one giant component.

## 7. VIDEO AND ASSET HANDLING

My uploaded flower-to-ring video is the primary visual asset.

If the video is uploaded to Lovable, place the actual file in the public assets directory, for example:

public/videos/saavy-flower-to-ring.mp4

Then reference it as:

/videos/saavy-flower-to-ring.mp4

Use the actual path of the uploaded asset if the environment assigns a different path.

Do not use a fake URL or a nonexistent video path.

If the uploaded video cannot be accessed directly, create the hero component with a clearly marked video asset path and tell me exactly where to upload the file. Do not silently replace my video with an unrelated stock video.

For other images, use carefully curated jewellery imagery relevant to the section. Keep imagery visually coherent with the brand.

If a real ring GLB model is not supplied, create a visually polished fallback rather than showing a broken canvas or a missing model.

## 8. RESPONSIVENESS AND PERFORMANCE

The website must work on:
- Desktop
- Laptop
- Tablet
- Mobile

Optimise the 3D experience for different devices.

Requirements:
- Lazy-load below-the-fold 3D scenes.
- Use compressed image assets.
- Optimise video delivery and loading.
- Avoid loading multiple heavy 3D scenes simultaneously.
- Use poster frames and fallbacks.
- Prevent horizontal overflow.
- Avoid layout shifts.
- Make buttons and navigation touch-friendly.
- Ensure readable text contrast.

The website should remain attractive even on devices where WebGL performance is limited.

## 9. QUALITY REQUIREMENTS

Before considering the work complete:
- Build all four pages.
- Make all navigation links functional.
- Connect all CTA buttons to meaningful destinations.
- Verify the uploaded video is used on the homepage.
- Verify that the 3D scene renders and responds to interaction.
- Verify scroll animations and normal scrolling work together.
- Test the contact form validation.
- Check mobile layouts.
- Remove broken image references and console errors.
- Ensure the project starts and builds successfully.

Do not stop after creating a static mockup or a single hero section. Build the complete website.

First implement the full visual experience, core navigation and working interactions. Then refine animation timing, responsiveness and performance.

The final result should feel like a bespoke, world-class digital showroom for SAAVY CO. — cinematic, immersive, technically impressive and focused on the journey from jewellery idea to finished creation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/84d19f34-5d57-4e55-b49f-f4a9aa113def).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
