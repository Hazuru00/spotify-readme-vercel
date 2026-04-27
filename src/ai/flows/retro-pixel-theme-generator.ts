'use server';
/**
 * @fileOverview A Genkit flow for generating retro pixel art theme parameters.
 *
 * - generateRetroPixelTheme - A function that generates SVG styling parameters based on a natural language aesthetic description.
 * - RetroPixelThemeGeneratorInput - The input type for the generateRetroPixelTheme function.
 * - RetroPixelThemeGeneratorOutput - The return type for the generateRetroPixelTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RetroPixelThemeGeneratorInputSchema = z.object({
  aestheticDescription: z
    .string()
    .describe(
      "A natural language description of the desired retro pixel art aesthetic, e.g., '1980s neon arcade', 'early 90s monochrome PC', 'Game Boy green screen'"
    ),
});
export type RetroPixelThemeGeneratorInput = z.infer<
  typeof RetroPixelThemeGeneratorInputSchema
>;

const RetroPixelThemeGeneratorOutputSchema = z.object({
  primaryColor:
    z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('The main interactive color in hex format (e.g., "#46F20D") for buttons, highlights, and primary text.')
      .default('#46F20D'),
  backgroundColor:
    z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('The background color in hex format (e.g., "#0C0F0B") for the widget body.')
      .default('#0C0F0B'),
  accentColor:
    z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('A subtle accent color in hex format (e.g., "#C9E085") for secondary elements.')
      .default('#C9E085'),
  scanlinePattern:
    z.enum(['dense', 'subtle', 'none']).describe('The style of scanline pattern to apply to the background.')
      .default('subtle'),
  glitchEffect:
    z.enum(['flicker', 'static', 'wave', 'none']).describe('The type of glitch effect to apply for dynamic visual noise.')
      .default('flicker'),
  fontStyle:
    z.literal('pixel_4x5').describe('The pixel font style.').default('pixel_4x5'), // The existing code uses a 4x5 pixel font.
});
export type RetroPixelThemeGeneratorOutput = z.infer<
  typeof RetroPixelThemeGeneratorOutputSchema
>;

const retroPixelThemeGeneratorPrompt = ai.definePrompt({
  name: 'retroPixelThemeGeneratorPrompt',
  input: {schema: RetroPixelThemeGeneratorInputSchema},
  output: {schema: RetroPixelThemeGeneratorOutputSchema},
  prompt: `You are an expert retro pixel art theme designer.
Your task is to analyze a natural language description of a retro pixel art aesthetic and generate JSON output containing specific styling parameters for an SVG widget.
The widget will display Spotify "Now Playing" information and should reflect the chosen aesthetic.

Based on the user's description, determine the best values for the following:
- primaryColor: A vibrant hex color for interactive elements, primary text, and highlights.
- backgroundColor: A dark, desaturated hex color for the widget's background.
- accentColor: A subtle, contrasting hex color for secondary details and subtle glows.
- scanlinePattern: Choose from 'dense', 'subtle', or 'none'. This affects how noticeable the CRT scanlines are.
- glitchEffect: Choose from 'flicker', 'static', 'wave', or 'none'. This describes the type of visual noise or distortion.
- fontStyle: This must always be 'pixel_4x5' as the widget uses a predefined 4x5 pixel font.

Consider the common color palettes and visual characteristics associated with the described retro aesthetic. For example:
- '1980s neon arcade': Think vibrant #FF00FF, #00FFFF, #0000AA, dark backgrounds like #1A002A, subtle scanlines, and perhaps a flicker glitch.
- 'early 90s monochrome PC': Think dark greens like #006400, black #000000, white/light grey #D3D3D3, dense scanlines, static glitch.
- 'Game Boy green screen': Think dark green #1A4D2E, light green #A2CC3E, black #0A0A0A, subtle scanlines, no glitch or subtle flicker.

User's aesthetic description: {{{aestheticDescription}}}

Generate the output in JSON format according to the output schema.`,
});

const retroPixelThemeGeneratorFlow = ai.defineFlow(
  {
    name: 'retroPixelThemeGeneratorFlow',
    inputSchema: RetroPixelThemeGeneratorInputSchema,
    outputSchema: RetroPixelThemeGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await retroPixelThemeGeneratorPrompt(input);
    if (!output) {
      throw new Error('Failed to generate retro pixel theme.');
    }
    return output;
  }
);

export async function generateRetroPixelTheme(
  input: RetroPixelThemeGeneratorInput
): Promise<RetroPixelThemeGeneratorOutput> {
  return retroPixelThemeGeneratorFlow(input);
}
