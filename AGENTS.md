<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Only one WebGL scene exists (home ScrollStory → JewelleryScene), lazy-loaded client-side with an image fallback — keeps mobile/limited GPUs usable.
- Media (hero video/poster) is served via Lovable Assets pointers in src/assets/*.asset.json — keeps binaries out of the repo.
- Contact form posts only when VITE_ENQUIRY_ENDPOINT is set; otherwise it shows an honest "not sent" message — never fake success.
- Placeholder contact details live in src/lib/contact-details.ts — single place to replace.
