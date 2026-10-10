// Imported first by prerender.ts. React chooses its production or development
// build when it is first loaded, and the server render must use production:
// no development-only warnings or checks in the build log.
process.env.NODE_ENV = "production";
