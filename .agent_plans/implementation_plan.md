# Goal Description

Enhance the SSCA Cognitive Engine frontend by overhauling the login experience, improving overall performance, and introducing a new Profile page with rich agent personalization settings.

## Proposed Changes

### Component 1: Login Interface Refinements
- **[MODIFY] [login/page.tsx](file:///d:/SSCA/frontend/app/login/page.tsx)**
  - Remove the camera icon from the bottom left typography section.
  - Introduce a new 3D element (e.g., a floating 3D glass sphere or an animated AI node using Spline/Three.js or an optimized CSS 3D composition) that fits the dark, aurora-infused vibe.
  - Remove delayed mount animations for the login/signup forms so that elements are instantly ready upon page load. (Adjusting the conditional rendering and CSS transitions).
- **[MODIFY] [SignupForm.tsx](file:///d:/SSCA/frontend/components/auth/SignupForm.tsx)**
  - Add a "Full Name" input field.
  - Update the form submission handler to pass the name to the backend during signup.

### Component 2: New Profile Page
- **[NEW] [profile/page.tsx](file:///d:/SSCA/frontend/app/profile/page.tsx)**
  - Create a new page matching the "liquid glass morphism" aesthetic.
  - Display User Information: Linked email, Name, Purpose of Use.
  - Add "Agent Personality" Settings: Options for Friendly, Official, Storyteller (explains memory in a story), and Humorous (cracks jokes).
  - Add a helpline email at the bottom for feedback and issue resolution.
- **[NEW] [ProfileComponents](file:///d:/SSCA/frontend/components/profile/)** (if needed) to break down the UI.

### Component 3: Performance and Smoothness Enhancements
- **[MODIFY] Global CSS / Layouts**
  - Implement `will-change: transform, filter` for heavy animations like the aurora background to hardware-accelerate them.
  - Reduce CSS `blur()` recalculations during transitions.
  - Optimize the `PageTransition.tsx` to prevent jank when navigating between pages.

## Open Questions

> [!IMPORTANT]
> 1. **3D Element**: I plan to use an optimized CSS-based 3D floating orb or a sleek pre-rendered 3D WebM video to avoid the heavy load of Three.js. Are you okay with this approach instead of full WebGL?
> 2. **Agent Settings Backend**: Should the new agent personality settings (Friendly, Official, etc.) be saved to the database, or just kept in local state for now?
> 3. **Name Field Backend**: Currently `SignupForm` only sends email/password. Does the backend API already support receiving a `name` field?

## Verification Plan

### Automated Tests
- Run Next.js build (`npm run build`) to ensure there are no TypeScript or compilation errors.

### Manual Verification
- Test the signup flow to verify the name is captured correctly.
- Verify the login page loads instantly without "popping in" delay.
- Check the new `/profile` page for liquid glass styling and correct layout.
- Monitor browser devtools for layout shifts and FPS drops during animations.
