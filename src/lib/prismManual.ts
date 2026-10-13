/**
 * Turns off Prism's auto-highlighting. Import this before react-syntax-highlighter.
 *
 * refractor sets `Prism = { manual: true }` and then requires prismjs's core,
 * but the bundler hoists that require above the assignment, so the core starts
 * unaware of it and schedules `Prism.highlightAll()` for the next frame. When
 * React has rendered the code blocks by then, highlightAll re-highlights them
 * with refractor's Prism, whose tokens are objects rather than HTML, and every
 * block on the page reads "[object Object],[object Object],…". Modules run in
 * import order, so setting the flag here, first, is seen by the core.
 */
const g = globalThis as { Prism?: { manual?: boolean; disableWorkerMessageHandler?: boolean } };
if (g.Prism) g.Prism.manual = true;
else g.Prism = { manual: true, disableWorkerMessageHandler: true };
